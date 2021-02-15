import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Dash from "./views/Dash.vue";
import Profile from "./views/Profile.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter,
      },
      meta: {
        dontAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter,
      },
      meta: {
        dontAuth: true,
      },
    },
    {
      path: "/dash",
      name: "dash",
      components: {
        header: AppHeader,
        default: Dash,
        footer: AppFooter,
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter,
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else if (
    to.matched.some((record) => record.meta.dontAuth) &&
    store.getters.isLoggedIn
  )
    next("/dash");
  else next();
});

export default router;
