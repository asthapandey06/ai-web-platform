import type { DomainConfig } from "../core/domain-loader.js";
import type { WebsiteSpec } from "./domain-agent.js";

export function specToDomain(
  spec: WebsiteSpec
): DomainConfig {
  return {
    domain: spec.domain,
    pages: spec.pages,
    services: spec.services,
    workflows: spec.workflows,
  };
}