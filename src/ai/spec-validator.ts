import type { WebsiteSpec } from "./domain-agent.js";

export function validateWebsiteSpec(
    spec: WebsiteSpec
): void {
    if (!isObject(spec)) {
        throw new Error("WebsiteSpec must be an object");
    }

    if (!isObject(spec.domain)) {
        throw new Error("WebsiteSpec.domain must be an object");
    }

    if (!isObject(spec.pages)) {
        throw new Error("WebsiteSpec.pages must be an object");
    }

    if (!isObject(spec.services)) {
        throw new Error("WebsiteSpec.services must be an object");
    }

    if (!isObject(spec.workflows)) {
        throw new Error("WebsiteSpec.workflows must be an object");
    }

    if (!isObject(spec.pages.pages)) {
        throw new Error(
            "WebsiteSpec.pages.pages must be an object"
        );
    }

    if (!Array.isArray(spec.services.services)) {
        throw new Error(
            "WebsiteSpec.services.services must be an array"
        );
    }

    if (!isObject(spec.workflows.workflows)) {
        throw new Error(
            `WebsiteSpec.workflows.workflows must be an object, received: ${JSON.stringify(
                spec.workflows.workflows
            )}`
        );
    }

    for (const [id, page] of Object.entries(
        spec.pages.pages
    )) {
        if (!isObject(page)) {
            throw new Error(`Invalid page: ${id}`);
        }

        if (typeof page.path !== "string") {
            throw new Error(
                `Page ${id} must have a path`
            );
        }

        if (typeof page.purpose !== "string") {
            throw new Error(
                `Page ${id} must have a purpose`
            );
        }

        if (!Array.isArray(page.sections)) {
            throw new Error(
                `Page ${id} sections must be an array`
            );
        }
    }

    for (const service of spec.services.services) {
        if (!isObject(service)) {
            throw new Error("Invalid service");
        }

        if (typeof service.id !== "string") {
            throw new Error(
                "Service must have an id"
            );
        }

        if (typeof service.name !== "string") {
            throw new Error(
                `Service ${service.id} must have a name`
            );
        }
    }
}

function isObject(
    value: unknown
): value is Record<string, any> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}