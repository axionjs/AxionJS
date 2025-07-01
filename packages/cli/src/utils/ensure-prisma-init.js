import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { logger } from "./logger.js";
import { spinner } from "./spinner.js";

const PRISMA_DIR = path.resolve("prisma");
const PRISMA_SCHEMA_PATH = path.resolve(PRISMA_DIR, "schema.prisma");

export async function ensurePrismaInitialized(cwd) {
  const prismaDirExists = await fs.pathExists(PRISMA_DIR);
  const prismaSchemaExists = await fs.pathExists(PRISMA_SCHEMA_PATH);

  if (!prismaDirExists || !prismaSchemaExists) {
    const initSpinner = spinner("Initializing Prisma...").start();
    try {
      await execa("npx", ["prisma", "init"], {
        cwd,
      });
      initSpinner.succeed("Prisma initialized successfully.");
    } catch (error) {
      initSpinner.fail("Failed to initialize Prisma.");
      logger.error(error);
      throw error;
    }
  } else {
    logger.info("Prisma is already initialized.");
  }
}
