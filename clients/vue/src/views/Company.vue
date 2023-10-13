<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company Name</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td>{{ company.id }}</td>
          <td>{{ company.companyName }}</td>
          <td>{{ company.website }}</td>
          <td class="table-options">
            <button @click="handleEdit(company)">Edit</button>
            <button @click="handleDelete(company)">Delete</button>
            <button @click="handleOpen(company)">Open</button>
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
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


export default {
  name: "CompanyTable",
  setup() {
    const router = useRouter();
    const store = useCompaniesStore();
    onMounted(() => {
      store.fetchCompanies();
    });

    const handleOpen = (company) => {
      router.push({ name:'contact', params: { companyId: company.id } });
    };

    const handleAdd = () => {
      const company = {
        id: false,
        companyName: '',
        website: '',
        contacts: []
      };
      store.setAddEditPopupInfo({ 
        type: 'company', 
        initialData:  company,
        pageBack: '/'
      });
      router.push({ name:'add-company' });
    };

    const handleEdit = (company) => {
      store.setAddEditPopupInfo({ 
        type: 'company', 
        initialData:  company,
        pageBack: '/'
      });
      router.push({ name:'edit-company' });
    };

    const handleDelete = async (company) => {
      store.deleteCompany(company.id);
    };

    // Use computed to get a reactive reference to companies
    const companies = computed(() => store.companies);

    return {
      companies,
      handleAdd,
      handleEdit,
      handleDelete,
      handleOpen
    };
  }
};
</script>