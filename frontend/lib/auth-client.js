import { createAuthClient } from '@better-auth/client';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000/api/auth',
  // Add any additional client configuration here
});

export default authClient;