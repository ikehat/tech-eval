export const load = ({ fetch, params }) => {
    
    async function fetchInitialData(companyId, contactId) {
        try {
            const res = await fetch(`http://localhost:5000/companies/${companyId}/contacts/${contactId}/interactions`);
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    return { 
        companyId: params.companyId,
        contactId: params.contactId,
        interactions: fetchInitialData(params.companyId, params.contactId)
    };
}