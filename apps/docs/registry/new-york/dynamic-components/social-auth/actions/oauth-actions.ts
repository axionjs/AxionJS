"use server";

import type React from "react";
import { generateOAuthUrl } from "@/registry/new-york/dynamic-components/social-auth/lib/oauth-utils";
import { db } from "@/registry/new-york/lib/db";

export interface OAuthActionResult {
  success?: string;
  error?: string;
  redirectUrl?: string;
  user?: any;
}

export interface OAuthProvider {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface OAuthConfig {
  providers: {
    github?: {
      clientId: string;
      clientSecret: string;
    };
  };
  redirectUrl?: string;
  onSuccess?: (provider: string, user: any) => void;
  onError?: (error: string) => void;
}

export const initiateOAuthLogin = async (
  provider: "github",
  redirectUrl?: string
): Promise<OAuthActionResult> => {
  try {
    if (!["github"].includes(provider)) {
      return { error: "Unsupported OAuth provider" };
    }

    const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`];
    if (!clientId) {
      return { error: `${provider} OAuth is not configured` };
    }

    const authUrl = generateOAuthUrl(provider, redirectUrl);

    return {
      success: "Redirecting to OAuth provider",
      redirectUrl: authUrl,
    };
  } catch (error) {
    console.error("OAuth initiation error:", error);
    return { error: "Failed to initiate OAuth login" };
  }
};

// Handle OAuth callback (you'll need to implement this in your API route)
export const handleOAuthCallback = async (
  provider: string,
  code: string,
  state?: string
): Promise<OAuthActionResult> => {
  try {
    // This is a simplified example - you'll need to implement the full OAuth flow
    // 1. Exchange code for access token
    // 2. Use access token to get user info
    // 3. Create or update user in database

    console.log("Handling OAuth callback:", { provider, code, state });

    // Example OAuth token exchange (implement based on provider)
    let userData;

    if (provider === "github") {
      // Implement GitHub OAuth token exchange
      userData = await exchangeGitHubCode(code);
    } else {
      return { error: "Unsupported provider" };
    }

    if (!userData) {
      return { error: "Failed to get user data from OAuth provider" };
    }

    const user = await createOrUpdateOAuthUser(provider, userData.id, {
      email: userData.email,
      name: userData.name,
      image: userData.image,
    });

    return {
      success: "OAuth login successful",
      user,
    };
  } catch (error) {
    console.error("OAuth callback error:", error);
    return { error: "OAuth authentication failed" };
  }
};

async function exchangeGitHubCode(code: string) {
  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID!,
          client_secret: process.env.GITHUB_CLIENT_SECRET!,
          code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || "OAuth error");
    }

    // Get user info using access token
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "AxionJS/1.0",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to get user info");
    }

    const userData = await userResponse.json();

    // Get user email (GitHub might not return email in user endpoint)
    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "AxionJS/1.0",
      },
    });

    let email = userData.email;
    if (!email && emailResponse.ok) {
      const emails = await emailResponse.json();
      const primaryEmail = emails.find((e: any) => e.primary && e.verified);
      email = primaryEmail?.email || emails[0]?.email;
    }

    return {
      id: userData.id.toString(),
      email,
      name: userData.name || userData.login,
      image: userData.avatar_url,
    };
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return null;
  }
}

// Get OAuth providers configuration
export const getOAuthProviders = async () => {
  const providers = [];

  if (process.env.GITHUB_CLIENT_ID) {
    providers.push({
      id: "github",
      name: "GitHub",
      enabled: true,
    });
  }

  return providers;
};

// Database operations for OAuth
export const createOrUpdateOAuthUser = async (
  provider: string,
  providerAccountId: string,
  userData: {
    email: string;
    name?: string;
    image?: string;
  }
) => {
  try {
    // Check if user exists with this email
    const existingUser = await db.user.findUnique({
      where: { email: userData.email },
    });

    let user;

    if (!existingUser) {
      // Create new user
      user = await db.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          image: userData.image,
          emailVerified: new Date(),
        },
      });
    } else {
      user = existingUser;
    }

    // Check if account is already linked
    const existingAccount = await db.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });

    // If account not linked, link it
    if (!existingAccount) {
      await db.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider,
          providerAccountId,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("OAuth user operation failed:", error);
    throw new Error("Failed to create or update user");
  }
};
