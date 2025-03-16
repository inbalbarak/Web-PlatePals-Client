/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_TOKEN_EXPIRES_HOURS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
