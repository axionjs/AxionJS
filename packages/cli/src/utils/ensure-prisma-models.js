import fs from "fs-extra";
import path from "path";
import { logger } from "./logger.js";

const PRISMA_DIR = path.resolve("prisma");
const PRISMA_SCHEMA_PATH = path.resolve(PRISMA_DIR, "schema.prisma");

//TODO: Move this to a separate file (better to build it in the registry and fetch from there)
// This is a temporary solution until we have a better way to manage component models.

// Mapping of component types to their Prisma models
const COMPONENT_MODELS = {
  "auth": `
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
  
`,
  "simple-auth": `
model User {
  id                    String                 @id @default(cuid()) @unique
  name                  String?
  email                 String?                @unique
  emailVerified         DateTime?              @map("email_verified")
  pendingEmail          String?                @map("pending_email")
  image                 String?
  password              String?
  accounts              Account[]

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
`,
  "contact-form": `
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  status    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`,
  "simple-crud-table": `
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  stock       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
`,
  "subscribe-newsletter": `
model NewsletterSubscriber {
  id             String                        @id @default(cuid())
  email          String                        @unique
  name           String?
  status         String                        @default("ACTIVE")
  token          String?                       @unique
  tokenCreatedAt DateTime?                     @default(now())
  createdAt      DateTime                      @default(now())
  updatedAt      DateTime                      @updatedAt
  campaigns      NewsletterCampaignRecipient[]
}

model NewsletterCampaign {
  id         String                        @id @default(cuid())
  subject    String
  content    String                        @db.Text
  sentAt     DateTime?
  createdAt  DateTime                      @default(now())
  updatedAt  DateTime                      @updatedAt
  recipients NewsletterCampaignRecipient[]
}

model NewsletterCampaignRecipient {
  id           String    @id @default(cuid())
  campaignId   String
  subscriberId String
  status       String    @default("PENDING")
  sentAt       DateTime?
  openedAt     DateTime?
  clickedAt    DateTime?

  campaign   NewsletterCampaign   @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  subscriber NewsletterSubscriber @relation(fields: [subscriberId], references: [id], onDelete: Cascade)

  @@unique([campaignId, subscriberId])
}
`
};

export async function ensureComponentModels(cwd, componentType) {
  const schemaPath = path.resolve(cwd, PRISMA_SCHEMA_PATH);
  const schemaContent = await fs.readFile(schemaPath, "utf8");

  const modelToAppend = COMPONENT_MODELS[componentType];
  if (!modelToAppend) {
    logger.warn(`No model defined for component type: ${componentType}`);
    return;
  }

  // Check if the model already exists in the schema
  const modelName = Object.keys(COMPONENT_MODELS).find((key) =>
    schemaContent.includes(`model ${key}`)
  );

  if (!schemaContent.includes(modelName)) {
    await fs.appendFile(schemaPath, modelToAppend);
    logger.info(`Model for ${componentType} appended to schema.prisma.`);
  } else {
    logger.info(`Model for ${componentType} already exists in schema.prisma.`);
  }
}