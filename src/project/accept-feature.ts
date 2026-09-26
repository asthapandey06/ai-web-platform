import path from "node:path";

import {
    acceptFeature,
} from "./project-metadata.js";

import {
    createFeatureSnapshot,
} from "./project-snapshot.js";

export function acceptProjectFeature(
    projectId: string,
    featureId: string
): void {
    const projectPath =
        path.join(
            "projects",
            projectId
        );

    const feature =
        acceptFeature(
            projectPath,
            featureId
        );

    const snapshot =
        createFeatureSnapshot(
            projectPath,
            feature.id,
            feature.version
        );

    console.log(
        `✓ Feature accepted: ${feature.id}`
    );

    console.log(
        `✓ Version: ${feature.version}`
    );

    console.log(
        `✓ Protected: true`
    );

    console.log(
        `✓ Snapshot: ${snapshot}`
    );
}