import fs from "node:fs";
import path from "node:path";

export interface ProjectMetadata {
    projectId: string;
    createdAt: string;
    updatedAt: string;
}

export interface FeatureRecord {
    id: string;
    name: string;
    description: string;
    status: "pending" | "accepted";
    version: number;
    source: "websiteos" | "developer";
    protected: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FeatureMetadata {
    features: Record<string, FeatureRecord>;
}

export interface FeatureRecord {
    id: string;
    name: string;
    description: string;
    status: "pending" | "accepted";
    version: number;
    source: "websiteos" | "developer";
    protected: boolean;
    createdAt: string;
    updatedAt: string;
}

function getWebsiteOSPath(projectPath: string): string {
    return path.resolve(
        process.cwd(),
        projectPath,
        ".websiteos"
    );
}

function getFeaturesPath(projectPath: string): string {
    return path.join(
        getWebsiteOSPath(projectPath),
        "features.json"
    );
}

export function ensureProjectMetadata(
    projectPath: string,
    projectId: string
): void {
    const websiteOsPath =
        getWebsiteOSPath(projectPath);

    const historyPath = path.join(
        websiteOsPath,
        "history"
    );

    fs.mkdirSync(historyPath, {
        recursive: true,
    });

    const projectMetadataPath = path.join(
        websiteOsPath,
        "project.json"
    );

    const featuresPath =
        getFeaturesPath(projectPath);

    const now = new Date().toISOString();

    if (!fs.existsSync(projectMetadataPath)) {
        const metadata: ProjectMetadata = {
            projectId,
            createdAt: now,
            updatedAt: now,
        };

        fs.writeFileSync(
            projectMetadataPath,
            JSON.stringify(metadata, null, 2),
            "utf8"
        );
    }

    if (!fs.existsSync(featuresPath)) {
        const features: FeatureMetadata = {
            features: {},
        };

        fs.writeFileSync(
            featuresPath,
            JSON.stringify(features, null, 2),
            "utf8"
        );
    }
}

export function loadFeatures(
    projectPath: string
): FeatureMetadata {
    const featuresPath =
        getFeaturesPath(projectPath);

    if (!fs.existsSync(featuresPath)) {
        return {
            features: {},
        };
    }

    return JSON.parse(
        fs.readFileSync(
            featuresPath,
            "utf8"
        )
    ) as FeatureMetadata;
}

export function saveFeatures(
    projectPath: string,
    metadata: FeatureMetadata
): void {
    fs.writeFileSync(
        getFeaturesPath(projectPath),
        JSON.stringify(metadata, null, 2),
        "utf8"
    );
}

export function registerPendingFeature(
    projectPath: string,
    id: string,
    name: string,
    description: string
): FeatureRecord {
    const metadata =
        loadFeatures(projectPath);

    const now =
        new Date().toISOString();

    const existing =
        metadata.features[id];

    const feature: FeatureRecord = {
        id,
        name,
        description,
        status: "pending",
        version: existing
            ? existing.version
            : 1,
        source: "websiteos",
        protected: false,
        createdAt: existing
            ? existing.createdAt
            : now,
        updatedAt: now,
    };

    metadata.features[id] = feature;

    saveFeatures(
        projectPath,
        metadata
    );

    return feature;
}

export function acceptFeature(
    projectPath: string,
    featureId: string
): FeatureRecord {
    const metadata =
        loadFeatures(projectPath);

    const feature =
        metadata.features[featureId];

    if (!feature) {
        throw new Error(
            `Feature not found: ${featureId}`
        );
    }

    feature.status = "accepted";
    feature.protected = true;
    feature.updatedAt =
        new Date().toISOString();

    metadata.features[featureId] =
        feature;

    saveFeatures(
        projectPath,
        metadata
    );

    return feature;
}

export function getProtectedFeatures(
    projectPath: string
): FeatureRecord[] {
    const metadata = loadFeatures(projectPath);

    return Object.values(metadata.features).filter(
        (feature) =>
            feature.status === "accepted" &&
            feature.protected === true
    );
}