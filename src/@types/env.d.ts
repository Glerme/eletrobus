declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    GOOGLE_MAPS_API_KEY: string;
    CLIENT_ID: string;
    REDIRECT_URI: string;
    SCOPE: string;
    RESPONSE_TYPE: string;
  }
}
