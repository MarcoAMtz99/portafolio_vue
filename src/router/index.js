import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ShiftReviewView from '../views/ShiftReviewView.vue'
import ShiftReportBuilder from '../views/ShiftReportBuilder.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/shift-review',
    name: 'shift-review',
    component: ShiftReviewView,
  },
   {
    path: '/shift-report',
    name: 'shift-report',
    component: ShiftReportBuilder,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router