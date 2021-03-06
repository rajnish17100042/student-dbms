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
import Career from "./components/Career.vue";
import JobApplication from "./components/admin/JobApplication.vue";
import ForgetPassword from "./components/ForgetPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import AdminDashboard from "./components/admin/AdminDashboard.vue";
import StudentDashboard from "./components/student/StudentDashboard.vue";
import TeacherDashboard from "./components/teacher/TeacherDashboard.vue";
import RegistrationDetails from "./components/admin/RegistrationDetails.vue";
import StudentUnderGuidance from "./components/teacher/StudentUnderGuidance.vue";
import NoticeBoard from "./components/NoticeBoard.vue";
import UploadProfilePic from "./components/UploadProfilePic.vue";
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
  //route for career section
  {
    name: "Career",
    component: Career,
    path: "/career",
  },
  //route to diaplay all the job application
  {
    name: "JobApplication",
    component: JobApplication,
    path: "/admin/job-application",
  },
  //route for forget password page
  {
    name: "ForgetPassword",
    component: ForgetPassword,
    path: "/forget-password",
  },
  //route  to reset password
  {
    name: "ResetPassword",
    component: ResetPassword,
    path: "/reset-password/:role/:email/:token",
  },
  // route admin registration
  {
    name: "AdminRegistration",
    component: AdminRegistration,
    path: "/admin/register-admin",
  },
  // route for teacher registration
  {
    name: "TeacherRegistration",
    component: TeacherRegistration,
    path: "/admin/register-teacher",
  },
  // route for student registration
  {
    name: "StudentRegistration",
    component: StudentRegistration,
    path: "/admin/register-student",
  },
  // route for update student
  {
    name: "UpdateStudent",
    component: UpdateStudent,
    path: "/admin/update-student/:id",
  },
  // route for update teacher
  {
    name: "UpdateTeacher",
    component: UpdateTeacher,
    path: "/admin/update-teacher/:id",
  },
  // route for update admin
  {
    name: "UpdateAdmin",
    component: UpdateAdmin,
    path: "/admin/update-admin/:id",
  },
  // route to update student password
  {
    name: "UpdateStudentPassword",
    component: UpdateStudentPassword,
    path: "/update-student-password/:id",
  },
  // route to update teacher password
  {
    name: "UpdateTeacherPassword",
    component: UpdateTeacherPassword,
    path: "/update-teacher-password/:id",
  },
  // route to update admin password
  {
    name: "UpdateAdminPassword",
    component: UpdateAdminPassword,
    path: "/update-admin-password/:id",
  },
  // route to delete student
  {
    name: "DeleteStudent",
    component: DeleteStudent,
    path: "/delete-student/:id",
  },
  // route to delete teacher
  {
    name: "DeleteTeacher",
    component: DeleteTeacher,
    path: "/admin/delete-teacher/:id",
  },
  // route to delete admin
  {
    name: "DeleteAdmin",
    component: DeleteAdmin,
    path: "/admin/delete-admin/:id",
  },

  // route  for Admin dashboard

  {
    name: "AdminDashboard",
    component: AdminDashboard,
    path: "/admin/dashboard",
  },
  // route  for Admin dashboard
  {
    name: "StudentDashboard",
    component: StudentDashboard,
    path: "/student/dashboard",
  },

  // route  for teacher dashboard

  {
    name: "TeacherDashboard",
    component: TeacherDashboard,
    path: "/teacher/dashboard",
  },
  // route to display all registration details of student,teacher and admin on admin dashboard
  {
    name: "RegistrationDetails",
    component: RegistrationDetails,
    path: "/admin/dashboard",
  },

  // route to display all the students in the under guidance of a particular teacher
  {
    name: "StudentUnderGuidance",
    component: StudentUnderGuidance,
    path: "/teacher/dashboard",
  },

  // route to issue a notice
  {
    name: "NoticeBoard",
    component: NoticeBoard,
    path: "/notice-board",
  },
  // route to upload profile picture
  {
    name: "UploadProfilePic",
    component: UploadProfilePic,
    path: "/upload-image",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// after creating the routes register the routes in main.js file
