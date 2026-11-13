export function getGoogleLoginLink(): string {
    return `${import.meta.env.VITE_API_URL}/v1/api/authentication/google`;
}
