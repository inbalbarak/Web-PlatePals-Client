/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BACKEND_URL: string;
  readonly CLIENT_ID: string;
  readonly NODE_ENV: string;
  readonly TOKEN_EXPIRES_HOURS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
