import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const CACHE_DIR = path.resolve(
    process.cwd(),
    ".cache",
    "ai"
);

function getCacheKey(
    agent: string,
    input: string
): string {
    return crypto
        .createHash("sha256")
        .update(`${agent}:${input.trim()}`)
        .digest("hex");
}

export function getCachedResponse<T>(
    agent: string,
    input: string
): T | null {
    const key = getCacheKey(agent, input);

    const filePath = path.join(
        CACHE_DIR,
        `${key}.json`
    );

    if (!fs.existsSync(filePath)) {
        return null;
    }

    try {
        return JSON.parse(
            fs.readFileSync(filePath, "utf8")
        ) as T;
    } catch {
        return null;
    }
}

export function setCachedResponse<T>(
    agent: string,
    input: string,
    response: T
): void {
    fs.mkdirSync(CACHE_DIR, {
        recursive: true,
    });

    const key = getCacheKey(agent, input);

    const filePath = path.join(
        CACHE_DIR,
        `${key}.json`
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(response, null, 2),
        "utf8"
    );
}