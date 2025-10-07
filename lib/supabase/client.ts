// Mock Supabase client configuration for development
export function createClient() {
  return {
    auth: {
      getUser: async () => ({
        data: { user: null },
        error: null,
      }),
      signOut: async () => ({
        error: null,
      }),
      signInWithPassword: async (credentials: any) => ({
        data: { user: null, session: null },
        error: null,
      }),
      signUp: async (credentials: any) => ({
        data: { user: null, session: null },
        error: null,
      }),
    },
    from: (table: string) => ({
      select: (columns: string = "*") => ({
        eq: (column: string, value: any) => ({
          single: async () => ({ data: null, error: null }),
          execute: async () => ({ data: [], error: null }),
        }),
        execute: async () => ({ data: [], error: null }),
      }),
      insert: (data: any) => ({
        execute: async () => ({ data: null, error: null }),
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          execute: async () => ({ data: null, error: null }),
        }),
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          execute: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  };
}

export function createBrowserClient() {
  return createClient();
}
