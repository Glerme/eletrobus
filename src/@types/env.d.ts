declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    EXPO_PUBLIC_CLIENT_ID: string;
    EXPO_PUBLIC_REDIRECT_URI: string;
    EXPO_PUBLIC_SCOPE: string;
    EXPO_PUBLIC_RESPONSE_TYPE: string;
    EXPO_PUBLIC_API_URL: string;
  }
}
