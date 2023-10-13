import { fetchCompanies } from '$lib/apiService.js';

export const load = () => {
    return { 
        companies: fetchCompanies()
    };
}