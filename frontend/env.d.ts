/// <reference types="vite/client" />
// src/env.d.ts
interface Window {
    env: {
        VITE_API_BASE_URL: string;
    };
}