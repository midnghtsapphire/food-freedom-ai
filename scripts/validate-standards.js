import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "README.md",
  "CHANGELOG.md",
  "DEPLOYMENT_GUIDE.md",
  "GO_TO_MARKET.md",
  "RESEARCH_ENGINE.md",
  "ASSETS_INVENTORY.md",
  "ARTIFACTS.md",
  "BRAND_GUIDELINES.md",
  "SECURITY.md",
];

const requiredPackageScripts = ["build", "test", "validate:standards"];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function validateFiles() {
  const missing = [];
  for (const file of requiredFiles) {
    if (!(await fileExists(file))) {
      missing.push(file);
    }
  }
  return missing;
}

async function validatePackageScripts() {
  try {
    const packageJsonRaw = await readFile("package.json", "utf8");
    const packageJson = JSON.parse(packageJsonRaw);
    const scripts = packageJson.scripts ?? {};
    return requiredPackageScripts.filter((script) => !scripts[script]);
  } catch (error) {
    console.error("❌ Unable to read or parse package.json for standards validation");
    console.error(`   ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

async function run() {
  const missingFiles = await validateFiles();
  const missingScripts = await validatePackageScripts();

  if (missingFiles.length === 0 && missingScripts.length === 0) {
    console.log("✅ revvel-standards validation passed");
    return;
  }

  if (missingFiles.length > 0) {
    console.error("❌ Missing required files:");
    for (const file of missingFiles) {
      console.error(`   - ${file}`);
    }
  }

  if (missingScripts.length > 0) {
    console.error("❌ Missing required package scripts:");
    for (const script of missingScripts) {
      console.error(`   - ${script}`);
    }
  }

  process.exit(1);
}

run();
