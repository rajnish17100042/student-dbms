//  import all the components to be routed
import AdminRegistration from "./components/admin/AdminRegistration.vue";
import TeacherRegistration from "./components/admin/TeacherRegistration.vue";
import StudentRegistration from "./components/admin/StudentRegistration.vue";
import Home from "./components/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

// will define route and for every route we will create an object
const routes = [
  //    route for home page
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  // route admin registration
  {
    name: "AdminRegistration",
    component: AdminRegistration,
    path: "/admin/registerAdmin",
  },
  // route for teacher registration
  {
    name: "TeacherRegistration",
    component: TeacherRegistration,
    path: "/admin/registerTeacher",
  },
  // route for student registration
  {
    name: "StudentRegistration",
    component: StudentRegistration,
    path: "/admin/registerStudent",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// after creating the routes register the routes in main.js file