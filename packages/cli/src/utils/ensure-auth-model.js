import fs from "fs-extra";
import path from "path";
import { logger } from "./logger.js";

const PRISMA_DIR = path.resolve("prisma");
const PRISMA_SCHEMA_PATH = path.resolve(PRISMA_DIR, "schema.prisma");
const AUTH_MODELS = `
enum UserRole {
  USER
  ADMIN
}

model User {
  id                    String                 @id @default(cuid()) @unique
  name                  String?
  email                 String?                @unique
  emailVerified         DateTime?              @map("email_verified")
  pendingEmail          String?                @map("pending_email")
  image                 String?
  password              String?
  role                  UserRole               @default(USER)
  accounts              Account[]
  isTwoFactorEnabled    Boolean                @default(false)
  twoFactorConfirmation TwoFactorConfirmation?

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model VerificationToken {
  id      String   @id @default(cuid())
  email   String
  token   String   @unique
  expires DateTime
  userId  String?  
  @@unique([email, token])
}

model PasswordResetToken {
  id      String   @id @default(cuid())
  email   String
  token   String   @unique
  expires DateTime

  @@unique([email, token])
}

model TwoFactorToken {
  id      String   @id @default(cuid())
  email   String
  token   String   @unique
  expires DateTime

  @@unique([email, token])
}

model TwoFactorConfirmation {
  id     String @id @default(cuid())
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId])
}
`;

export async function ensureAuthModels(cwd) {
  const schemaPath = path.resolve(cwd, PRISMA_SCHEMA_PATH);
  const schemaContent = await fs.readFile(schemaPath, "utf8");

  if (!schemaContent.includes("model User")) {
    await fs.appendFile(schemaPath, AUTH_MODELS);
    logger.info("Auth models appended to schema.prisma.");
  } else {
    logger.info("Auth models already exist in schema.prisma.");
  }
}