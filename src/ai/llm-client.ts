interface LLMMessage {
    role: "system" | "user";
    content: string;
}

interface LLMResponse {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
}

export async function callLLM(
    messages: LLMMessage[]
): Promise<string> {
    const apiKey = process.env.LLM_API_KEY;
    const baseUrl =
        process.env.LLM_BASE_URL ?? "https://api.openai.com/v1";
    const model = process.env.LLM_MODEL;

    if (!apiKey) {
        throw new Error("Missing LLM_API_KEY");
    }

    if (!model) {
        throw new Error("Missing LLM_MODEL");
    }

    const response = await fetch(
        `${baseUrl.replace(/\/$/, "")}/chat/completions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                temperature: 0.2,
                messages,
            }),
        }
    );

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `LLM request failed (${response.status}): ${error}`
        );
    }

    const data =
        (await response.json()) as LLMResponse;

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("LLM returned an empty response");
    }

    return content;
}