import fs from "node:fs";
import path from "node:path";

export function createFeatureSnapshot(
    projectPath: string,
    featureId: string,
    version: number
): string {
    const projectRoot =
        path.resolve(
            process.cwd(),
            projectPath
        );

    const specPath =
        path.join(
            projectRoot,
            "website-spec.json"
        );

    if (!fs.existsSync(specPath)) {
        throw new Error(
            "Cannot create snapshot: website-spec.json not found"
        );
    }

    const historyPath =
        path.join(
            projectRoot,
            ".websiteos",
            "history"
        );

    fs.mkdirSync(
        historyPath,
        {
            recursive: true,
        }
    );

    const filename =
        `${featureId}-v${version}.json`;

    const snapshotPath =
        path.join(
            historyPath,
            filename
        );

    fs.copyFileSync(
        specPath,
        snapshotPath
    );

    return snapshotPath;
}