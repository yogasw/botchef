import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserPayload {
  app_code: string;
}

function createToken(payload: UserPayload): string {
  return jwt.sign(payload, process.env.IDENTIFIER_KEY!);
}

function verifyToken(token: string): UserPayload {
  return jwt.verify(token, process.env.IDENTIFIER_KEY!) as UserPayload;
}
function decodeToken(token: string): any {
  return jwt.decode(token, { complete: true });
}

export { createToken, verifyToken, decodeToken };
