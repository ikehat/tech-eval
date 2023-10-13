const BASE_URL = 'http://node.ik2.co:5000';

export async function fetchCompanies() {
  try {
    const res = await fetch(`${BASE_URL}/companies`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
export async function addCompany(companyData) {
    try {
        fetch(`${BASE_URL}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });

    } catch (error) {
        console.log(error);
    }
}
export async function editCompany(companyId, companyData) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });

    } catch (error) {
        console.log(error);
    }
}
export async function deleteCompany(companyId) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export async function fetchContacts(companyId) {
  try {
    const res = await fetch(`${BASE_URL}/companies/${companyId}/contacts`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
export async function addContact(companyId, contactData) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

    } catch (error) {
        console.log(error);
    }
}
export async function editContact(companyId, contactId, contactData) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

    } catch (error) {
        console.log(error);
    }
}
export async function deleteContact(companyId, contactId) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}/contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export async function fetchInteractions(companyId, contactId) {
  try {
    const res = await fetch(`${BASE_URL}/companies/${companyId}/contacts/${contactId}/interactions`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
export async function addInteraction(companyId, contactId, interactionData) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}/contacts/${contactId}/interactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(interactionData)
        });

    } catch (error) {
        console.log(error);
    }
}
export async function editInteraction(companyId, contactId, interactionId, interactionData) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}/contacts/${contactId}/interactions/${interactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(interactionData)
        });

    } catch (error) {
        console.log(error);
    }
}
export async function deleteInteraction(companyId, contactId, interactionId) {
    try {
        fetch(`${BASE_URL}/companies/${companyId}/contacts/${contactId}/interactions/${interactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log(error);
    }
}
