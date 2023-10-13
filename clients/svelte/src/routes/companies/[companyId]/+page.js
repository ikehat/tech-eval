import { fetchContacts } from '$lib/apiService.js';

export const load = ({ params }) => {
    return { 
        companyId: params.companyId,
        contacts: fetchContacts(params.companyId)
    };
}