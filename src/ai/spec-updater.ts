import type { WebsiteSpec } from "./domain-agent.js";
import type { WebsiteSpecUpdate } from "./update-agent.js";

export function applyWebsiteSpecUpdate(
    existing: WebsiteSpec,
    update: WebsiteSpecUpdate
): WebsiteSpec {
    return {
        domain: merge(
            existing.domain,
            update.domain
        ),

        pages: merge(
            existing.pages,
            update.pages
        ),

        services: merge(
            existing.services,
            update.services
        ),

        workflows: merge(
            existing.workflows,
            update.workflows
        ),
    };
}

function merge(
    existing: Record<string, unknown>,
    update?: Record<string, unknown>
): Record<string, unknown> {
    if (!update) {
        return existing;
    }

    return deepMerge(existing, update);
}

function deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>
): Record<string, unknown> {
    const result: Record<string, unknown> = {
        ...target,
    };

    for (const [key, value] of Object.entries(source)) {
        const existingValue = result[key];

        if (
            isObject(existingValue) &&
            isObject(value)
        ) {
            result[key] = deepMerge(
                existingValue,
                value
            );
        } else {
            result[key] = value;
        }
    }

    return result;
}

function isObject(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}