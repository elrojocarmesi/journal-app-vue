import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import dayBookRouter from "../modules/dayBook/router"
import authRouter from "../modules/auth/router"
import isAuthenticatedGuard from "../modules/auth/router/auth-guard"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      ...authRouter,
    },
    {
      path: "/daybook",
      beforeEnter: [isAuthenticatedGuard],
      ...dayBookRouter,
    },
  ],
})

export default router
