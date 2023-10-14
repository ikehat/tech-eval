<template>
    <div>
        <h1>Interaction</h1>
        <button @click="handleBack">Back</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="interaction in interactions" :key="interaction.id">
                    <td>{{ interaction.id }}</td>
                    <td>{{ interaction.date }}</td>
                    <td>{{ interaction.description }}</td>
                    <td>{{ interaction.status }}</td>
                    <td class="table-options">
                        <button @click="handleEdit(interaction)">Edit</button>
                        <button @click="handleDelete(interaction)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="handleAdd">Add</button>
    </div>
</template>

<script>
import { useCompaniesStore } from '@/stores/companies';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

export default {
    name: "ContactTable",
    setup() {
        const route = useRoute();
        const { companyId, contactId } = route.params;

        const router = useRouter();
        const store = useCompaniesStore();
        onMounted(() => {
            store.setActiveCompany(companyId);
            store.setActiveContact(contactId);
            store.fetchInteractions();
        });
    
        const handleAdd = () => {
            const interaction = {
                id: false,
                date: '',
                description: '',
                status: '',
            };
            store.setAddEditPopupInfo({ 
                type: 'interaction', 
                initialData: interaction,
                pageBack: `/company/${companyId}/contact/${contactId}`
            });
            router.push({ name:'add-interaction' });
        };
    
        const handleEdit = (interaction) => {
            store.setAddEditPopupInfo({ 
                type: 'interaction', 
                initialData:  interaction,
                pageBack: `/company/${companyId}/contact/${contactId}`
            });
            router.push({ name:'edit-interaction' });
        };
    
        const handleDelete = async (interaction) => {
            store.deleteInteraction(interaction.id);
        };

        const handleBack = () => {
            router.push({ name:'contact', params: { 
                    companyId: companyId 
                } 
            });
        };
    
        const interactions = computed(() => store.interactions);

        return {
            interactions,
            handleBack,
            handleAdd,
            handleEdit,
            handleDelete
        };
    }
};
</script>