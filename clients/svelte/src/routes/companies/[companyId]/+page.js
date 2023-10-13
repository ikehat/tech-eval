export const load = ({ fetch, params }) => {
    
    async function fetchInitialData(companyId) {
        try {
            const res = await fetch(`http://localhost:5000/companies/${companyId}/contacts`);
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    return { 
        companyId: params.companyId,
        contacts: fetchInitialData(params.companyId)
    };
}