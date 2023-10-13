import { fetchInteractions } from '$lib/apiService.js';
export const load = ({ params }) => {
    return { 
        companyId: params.companyId,
        contactId: params.contactId,
        interactions: fetchInteractions(params.companyId, params.contactId)
    };
}