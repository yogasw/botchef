# syntax=docker/dockerfile:1
ARG HOME="/usr/src/app"
ARG NODE_VERSION=16

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base
ARG HOME

# Set working directory for all build stages.
WORKDIR ${HOME}

# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM alpine:latest as final
ARG HOME

RUN apk update
RUN apk add --no-cache nodejs

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER node

WORKDIR /app

# Copy package.json so that package manager commands can be used.
COPY --from=deps ${HOME}/node_modules node_modules

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=build ${HOME}/package.json package.json
COPY --from=build ${HOME}/dist dist
COPY --from=build ${HOME}/client-setting/build client-setting/build

# Run the application.
CMD node dist/index.js