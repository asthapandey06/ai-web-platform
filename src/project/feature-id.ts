export function createFeatureId(
    request: string
): string {
    const slug = request
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60);

    return slug || "feature";
}