export type IntentData = {
    intent: string,
    response: string,
    training: string[],
    context: string,
    input_context?: string,
    is_fallback: boolean,
}