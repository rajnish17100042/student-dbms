//  import all the components to be routed
import AdminRegistration from "./components/admin/AdminRegistration.vue";
import TeacherRegistration from "./components/admin/TeacherRegistration.vue";
import StudentRegistration from "./components/admin/StudentRegistration.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import CommonDashboard from "./components/CommonDashboard.vue";
import RegistrationDetails from "./components/admin/RegistrationDetails.vue";

import { createRouter, createWebHistory } from "vue-router";

// will define route and for every route we will create an object
const routes = [
  //    route for home page
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  //route for login page
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  // route admin registration
  {
    name: "AdminRegistration",
    component: AdminRegistration,
    path: "/registerAdmin",
  },
  // route for teacher registration
  {
    name: "TeacherRegistration",
    component: TeacherRegistration,
    path: "/registerTeacher",
  },
  // route for student registration
  {
    name: "StudentRegistration",
    component: StudentRegistration,
    path: "/registerStudent",
  },

  // route  for common dashboard

  {
    name: "CommonDashboard",
    component: CommonDashboard,
    path: "/adminDashboard",
  },
  // route  for admin dashboard

  {
    name: "RegistrationDetails",
    component: RegistrationDetails,
    path: "/adminDashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// after creating the routes register the routes in main.js file
