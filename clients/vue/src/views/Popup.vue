<template>
    <div class="overlay">
        <div class="popup">
            <div v-if="type === 'company'">
                <div class="popup-item">
                    <div>Company Name</div>
                    <input :value="formData.companyName" @input="updateFormData('companyName', $event)" placeholder="Company Name" />
                </div>
                <div class="popup-item">
                    <div>Website</div>
                    <input type="url" :value="formData.website" @input="updateFormData('website', $event)" placeholder="Website" />
                </div>
            </div>

            <div v-if="type === 'contact'">
                <div class="popup-item">
                    <div>Name</div>
                    <input :value="formData.name" @input="updateFormData('name', $event)" placeholder="Name" />
                </div>
                <div class="popup-item">
                    <div>Email</div>
                    <input :value="formData.email" @input="updateFormData('email', $event)" placeholder="Email" />
                </div>
                <div class="popup-item">
                    <div>Mobile</div>
                    <input :value="formData.mobile" @input="updateFormData('mobile', $event)" placeholder="Mobile" />
                </div>
                <div class="popup-item">
                    <div>Status</div>
                    <select :value="formData.status" @input="updateFormData('status', $event)" placeholder="Status">
                        <option value=""></option>
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
            </div>

            <div v-if="type === 'interaction'">
                <div class="popup-item">
                    <div>Date</div>
                    <input :value="formData.date" type="date" @input="updateFormData('date', $event)" />
                </div>
                <div class="popup-item">
                    <div>Description</div>
                    <input :value="formData.description" @input="updateFormData('description', $event)" placeholder="Description" />
                </div>
                <div class="popup-item">
                    <div>Status</div>
                    <select :value="formData.status" @input="updateFormData('status', $event)" placeholder="Status">
                        <option value=""></option>
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
            </div>

            <button @click="handleSubmit">Submit</button>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { useCompaniesStore } from '@/stores/companies';

export default {
    name: 'Popup-Component',
    setup() {
        const store = useCompaniesStore();
        const router = useRouter();
        const { type, initialData, pageBack } = store.getAddEditPopupInfo();

        // Accessing the state data
        const formData = initialData;

        const handleSubmit = () => {
            // Similar structure
            if (type === 'company') {
                if (formData.id === false) {
                    store.addCompany(formData);
                } else {
                    store.editCompany(formData);
                }
            }
            if (type === 'contact') {
                if (formData.id === false) {
                    store.addContact(formData);
                } else {
                    store.editContact(formData);
                }
            }
            if (type === 'interaction') {
                if (formData.id === false) {
                    store.addInteraction(formData);
                } else {
                    store.editInteraction(formData);
                }
            }

            router.push(pageBack);
        };

        const updateFormData = (key, event) => {
            formData[key] = event.target.value;
        };

        return {
            type,
            formData,
            handleSubmit,
            updateFormData,
        };
    }
};
</script>

<style scoped>
    /* Your styles here */
</style>
