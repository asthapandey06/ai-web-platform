import type { WebsiteSpec } from "./domain-agent.js";

export function validateWebsiteSpec(
    spec: WebsiteSpec
): void {
    if (!isObject(spec)) {
        throw new Error("WebsiteSpec must be an object");
    }

    if (!isObject(spec.domain)) {
        throw new Error(
            "WebsiteSpec.domain must be an object"
        );
    }

    if (!isObject(spec.pages)) {
        throw new Error(
            "WebsiteSpec.pages must be an object"
        );
    }

    if (!isObject(spec.services)) {
        throw new Error(
            "WebsiteSpec.services must be an object"
        );
    }

    if (!isObject(spec.workflows)) {
        throw new Error(
            "WebsiteSpec.workflows must be an object"
        );
    }

    validatePages(spec.pages);
    validateServices(spec.services);
    validateWorkflows(spec.workflows);
}

function validatePages(
    pages: Record<string, unknown>
): void {
    for (const [id, page] of Object.entries(pages)) {
        if (
            id === "navigation" ||
            id === "footer"
        ) {
            continue;
        }

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
}

function validateServices(
  services: Record<string, unknown>
): void {
  for (const [id, service] of Object.entries(services)) {
    if (!isObject(service)) {
      throw new Error(
        `Invalid service: ${id}`
      );
    }

    if (typeof service.name !== "string") {
      throw new Error(
        `Service ${id} must have a name`
      );
    }
  }
}

function validateWorkflows(
  workflows: Record<string, unknown>
): void {
  for (const [id, workflow] of Object.entries(workflows)) {
    if (!isObject(workflow)) {
      throw new Error(
        `Invalid workflow: ${id}`
      );
    }
  }
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