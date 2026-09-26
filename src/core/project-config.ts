export interface ProjectConfig {
  projectId: string;
  domainId: string;
  outputPath: string;
}

export function createProjectConfig(
  projectId: string,
  domainId: string,
  outputPath: string
): ProjectConfig {
  return {
    projectId,
    domainId,
    outputPath,
  };
}