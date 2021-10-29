<template>
  <div>
    <Navbar />
    <router-view />
  </div>
  <!-- <AdminRegistration /> -->
  <!-- <StudentRegistration /> -->
  <!-- <TeacherRegistration /> -->
</template>

<script>
import Navbar from "./components/Navbar.vue";
// import StudentRegistration from "./components/admin/StudentRegistration.vue";
// import TeacherRegistration from "./components/admin/TeacherRegistration.vue";
// import AdminRegistration from "./components/admin/AdminRegistration.vue";

export default {
  name: "App",
  components: {
    Navbar
    // StudentRegistration,
    // TeacherRegistration,
    // AdminRegistration,
  }
};
</script>

<style></style>
