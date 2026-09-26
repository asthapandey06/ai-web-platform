import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import { generateWebsiteSpec } from "./orchestrator.js";
import { runUpdateAgent } from "./update-agent.js";
import { applyWebsiteSpecUpdate } from "./spec-updater.js";
import { validateWebsiteSpec } from "./spec-validator.js";
import { specToDomain } from "./spec-to-domain.js";
import { generateFromSpec } from "../generator/generate-from-spec.js";
import { generateReactProject } from "../generator/template-generator.js";

import { ensureProjectMetadata } from "../project/project-metadata.js";
import { registerPendingFeature } from "../project/project-metadata.js";

import { createFeatureSnapshot } from "../project/project-snapshot.js";
import { createFeatureId } from "../project/feature-id.js";
import { acceptProjectFeature } from "../project/accept-feature.js";

const args = process.argv.slice(2);

const command = args[0];

if (
    command !== "create" &&
    command !== "update" &&
    command !== "accept"
) {
    throw new Error(
        'Usage:\n' +
        '  npm run ai:generate -- create "<project-name>" "<business brief>"\n' +
        '  npm run ai:generate -- update "<project-name>" "<change request>"\n' +
        '  npm run ai:generate -- accept "<project-name>" "<feature-id>"'
    );
}

const projectId = args[1]?.trim();
const request = args.slice(2).join(" ").trim();

if (!projectId || !request) {
    throw new Error(
        `Missing project name or request for command "${command}".`
    );
}

const projectPath = path.join(
    "projects",
    projectId
);

const absoluteProjectPath = path.resolve(
    process.cwd(),
    projectPath
);

const projectExists = fs.existsSync(
    absoluteProjectPath
);

// --------------------------------------------------
// ACCEPT
// --------------------------------------------------
//
// Accept is a LOCAL operation.
// No AI.
// No generation.
// No project regeneration.
//

if (command === "accept") {
    if (!projectExists) {
        throw new Error(
            `Cannot accept feature because project "${projectId}" does not exist.`
        );
    }

    acceptProjectFeature(
        projectId,
        request
    );

    process.exit(0);
}

const isCreate = command === "create";
const isUpdate = command === "update";

// --------------------------------------------------
// CREATE / UPDATE validation
// --------------------------------------------------

if (isUpdate && !projectExists) {
    throw new Error(
        `Cannot update project "${projectId}" because it does not exist.`
    );
}

if (isCreate && projectExists) {
    throw new Error(
        `Project "${projectId}" already exists. Use update to modify it.`
    );
}

if (isUpdate) {
    console.log(
        `✓ Existing project found: ${projectId}`
    );

    console.log(
        "→ Updating project"
    );
} else {
    console.log(
        `✓ Creating new project: ${projectId}`
    );
}

ensureProjectMetadata(
    projectPath,
    projectId
);

const specPath = path.join(
    absoluteProjectPath,
    "website-spec.json"
);

let spec;

// ==================================================
// CREATE
// ==================================================

if (isCreate) {
    spec = await generateWebsiteSpec(
        request,
        projectPath
    );

    const domain = specToDomain(spec);

    const config = {
        projectId,
        domainId: String(
            spec.domain.id ?? "generated-domain"
        ),
        outputPath: projectPath,
    };

    generateReactProject(config);

    console.log(
        `✓ React project generated for ${projectId}`
    );

    console.log(
        "✓ WebsiteOS domain model ready"
    );

    console.log(
        `✓ Pages: ${Object.keys(
            (domain.pages.pages ?? {}) as Record<string, unknown>
        ).length}`
    );

    console.log(
        `✓ Services: ${Array.isArray(domain.services.services)
            ? domain.services.services.length
            : 0
        }`
    );

    generateFromSpec(
        projectId,
        `${projectPath}/website-spec.json`
    );

    console.log(
        `✓ React data generated for ${projectId}`
    );
}

// ==================================================
// UPDATE
// ==================================================

if (isUpdate) {
    if (!fs.existsSync(specPath)) {
        throw new Error(
            `Existing project is missing website-spec.json: ${projectId}`
        );
    }

    const existingSpec = JSON.parse(
        fs.readFileSync(
            specPath,
            "utf8"
        )
    );

    console.log(
        "→ Reading existing WebsiteOS specification"
    );

    const update = await runUpdateAgent(
        existingSpec,
        request
    );

    console.log(
        "✓ AI update generated"
    );

    const updatedSpec = applyWebsiteSpecUpdate(
        existingSpec,
        update
    );

    validateWebsiteSpec(
        updatedSpec
    );

    console.log(
        "✓ Updated specification validated"
    );

    const backupPath =
        `${specPath}.backup`;

    fs.copyFileSync(
        specPath,
        backupPath
    );

    try {
        fs.writeFileSync(
            specPath,
            JSON.stringify(
                updatedSpec,
                null,
                2
            ),
            "utf8"
        );

        // IMPORTANT:
        // Do not regenerate the React project.
        // Only regenerate WebsiteOS data.
        generateFromSpec(
            projectId,
            `${projectPath}/website-spec.json`
        );

        spec = updatedSpec;

        // ------------------------------------------
        // Register the requested feature
        // ------------------------------------------

        const featureId =
            createFeatureId(request);

        const feature =
            registerPendingFeature(
                projectPath,
                featureId,
                featureId,
                request
            );

        const snapshot =
            createFeatureSnapshot(
                projectPath,
                feature.id,
                feature.version
            );

        console.log(
            `✓ Feature registered: ${feature.id}`
        );

        console.log(
            "✓ Feature status: pending"
        );

        console.log(
            `✓ Snapshot: ${snapshot}`
        );

        console.log(
            "→ Review the change and accept it when ready"
        );

        fs.rmSync(
            backupPath,
            {
                force: true,
            }
        );

        console.log(
            `✓ Project updated safely: ${projectId}`
        );
    } catch (error) {
        console.error(
            "✗ Update failed. Restoring previous specification."
        );

        fs.copyFileSync(
            backupPath,
            specPath
        );

        fs.rmSync(
            backupPath,
            {
                force: true,
            }
        );

        throw error;
    }
}

// ==================================================
// FINAL OUTPUT
// ==================================================

if (isCreate) {
    // ... existing create logic

    console.log(
        `\n✓ AI specification ready: ${specPath}`
    );

    console.log(
        `✓ Domain: ${String(
            spec?.domain?.name ?? "Unnamed"
        )}`
    );
}

if (isUpdate) {
    // ... existing update logic

    console.log(
        `\n✓ AI specification ready: ${specPath}`
    );

    console.log(
        `✓ Domain: ${String(
            spec?.domain?.name ?? "Unnamed"
        )}`
    );
}