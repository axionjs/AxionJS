// OAuth URL generators - Replace with your OAuth implementation
export const generateOAuthUrl = (
  provider: string,
  redirectUrl?: string,
): string => {
  const baseUrls = {
    github: "https://github.com/login/oauth/authorize",
  };

  const params = new URLSearchParams({
    client_id: process.env[`${provider.toUpperCase()}_CLIENT_ID`] || "",
    redirect_uri:
      redirectUrl ||
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/${provider}`,
    scope: "user:email",
    response_type: "code",
    state: crypto.randomUUID(), // Add CSRF protection
  });

  return `${baseUrls[provider as keyof typeof baseUrls]}?${params.toString()}`;
};
