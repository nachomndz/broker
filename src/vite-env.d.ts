/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string; // Define la variable de entorno
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  