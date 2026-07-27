declare module 'nuxt/schema' {
    interface RuntimeConfig {
        apiUrl: string;
        cmsUrl: string;
    }
    interface PublicRuntimeConfig {
        apiUrl: string;
        cmsUrl: string;
        cmsAccessToken: string;
    }
}

export { }
