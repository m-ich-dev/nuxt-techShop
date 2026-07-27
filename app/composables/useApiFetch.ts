export const useApiFetch = createUseFetch(callerOptions => ({
    $fetch: useNuxtApp().$apiFetch as typeof $fetch,
    ...callerOptions
}))