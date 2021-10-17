//  import all the components to be routed
import AdminRegistration from "./components/admin/AdminRegistration.vue";
import TeacherRegistration from "./components/admin/TeacherRegistration.vue";
import StudentRegistration from "./components/admin/StudentRegistration.vue";
import UpdateStudent from "./components/admin/UpdateStudent.vue";
import UpdateTeacher from "./components/admin/UpdateTeacher.vue";
import UpdateAdmin from "./components/admin/UpdateAdmin.vue";
import UpdateStudentPassword from "./components/admin/UpdateStudentPassword.vue";
import UpdateTeacherPassword from "./components/admin/UpdateTeacherPassword.vue";
import UpdateAdminPassword from "./components/admin/UpdateAdminPassword.vue";
import DeleteStudent from "./components/admin/DeleteStudent.vue";
import DeleteTeacher from "./components/admin/DeleteTeacher.vue";
import DeleteAdmin from "./components/admin/DeleteAdmin.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import AdminDashboard from "./components/admin/AdminDashboard.vue";
import StudentDashboard from "./components/student/StudentDashboard.vue";
import TeacherDashboard from "./components/teacher/TeacherDashboard.vue";
import RegistrationDetails from "./components/admin/RegistrationDetails.vue";
import StudentUnderGuidance from "./components/teacher/StudentUnderGuidance.vue";
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
  // route for update student
  {
    name: "UpdateStudent",
    component: UpdateStudent,
    path: "/updateStudent/:id",
  },
  // route for update teacher
  {
    name: "UpdateTeacher",
    component: UpdateTeacher,
    path: "/updateTeacher/:id",
  },
  // route for update admin
  {
    name: "UpdateAdmin",
    component: UpdateAdmin,
    path: "/updateAdmin/:id",
  },
  // route to update student password
  {
    name: "UpdateStudentPassword",
    component: UpdateStudentPassword,
    path: "/updateStudentPassword/:id",
  },
  // route to update teacher password
  {
    name: "UpdateTeacherPassword",
    component: UpdateTeacherPassword,
    path: "/updateTeacherPassword/:id",
  },
  // route to update admin password
  {
    name: "UpdateAdminPassword",
    component: UpdateAdminPassword,
    path: "/updateAdminPassword/:id",
  },
  // route to delete student
  {
    name: "DeleteStudent",
    component: DeleteStudent,
    path: "/deleteStudent/:id",
  },
  // route to delete teacher
  {
    name: "DeleteTeacher",
    component: DeleteTeacher,
    path: "/deleteTeacher/:id",
  },
  // route to delete admin
  {
    name: "DeleteAdmin",
    component: DeleteAdmin,
    path: "/deleteAdmin/:id",
  },

  // route  for Admin dashboard

  {
    name: "AdminDashboard",
    component: AdminDashboard,
    path: "/admin/Dashboard",
  },
  // route  for Admin dashboard
  {
    name: "StudentDashboard",
    component: StudentDashboard,
    path: "/student/Dashboard",
  },

  // route  for teacher dashboard

  {
    name: "TeacherDashboard",
    component: TeacherDashboard,
    path: "/teacher/Dashboard",
  },
  // route to display all registration details of student,teacher and admin on admin dashboard
  {
    name: "RegistrationDetails",
    component: RegistrationDetails,
    path: "/admin/Dashboard",
  },

  // route to display all the students in the under guidance of a particular teacher
  {
    name: "StudentUnderGuidance",
    component: StudentUnderGuidance,
    path: "/teacher/Dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// after creating the routes register the routes in main.js file
