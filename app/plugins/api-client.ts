export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const baseUrl = import.meta.server ? config.apiUrl : config.public.apiUrl;
    const client = $fetch.create({
        baseURL: baseUrl
    })
    return {
        provide: {
            apiFetch: client
        }
    }
})