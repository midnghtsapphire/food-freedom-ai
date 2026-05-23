import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "README.md",
  "CHANGELOG.md",
  "DEPLOYMENT_GUIDE.md",
  "GO_TO_MARKET.md",
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
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const scripts = packageJson.scripts ?? {};
  return requiredPackageScripts.filter((script) => !scripts[script]);
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
