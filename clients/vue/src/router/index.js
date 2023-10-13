import { createRouter, createWebHistory } from 'vue-router'
import Company from '../views/Company.vue'
import Contact from '../views/Contact.vue'
import Interaction from '../views/Interaction.vue'
import AddEdit from '../views/Popup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'company',
      component: Company
    },
    {
      path: '/company/:companyId',
      name: 'contact',
      component: Contact
    },
    {
      path: '/company/:companyId/contact/:contactId',
      name: 'interaction',
      component: Interaction
    },
    {
      path: '/add-company',
      name: 'add-company',
      component: AddEdit
    },
    {
      path: '/edit-company',
      name: 'edit-company',
      component: AddEdit
    },
    {
      path: '/add-contact',
      name: 'add-contact',
      component: AddEdit
    },
    {
      path: '/edit-contact',
      name: 'edit-contact',
      component: AddEdit
    },
    {
      path: '/add-interaction',
      name: 'add-interaction',
      component: AddEdit
    },
    {
      path: '/edit-interaction',
      name: 'edit-interaction',
      component: AddEdit
    }
  ]
})

export default router
