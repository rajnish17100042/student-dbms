<template>
  <div>
    <div class="wrapper">
      <div class="sidebar">
        <ul>
          <li>
            <a><i class="fas fa-envelope"></i>{{ email }}</a>
          </li>
          <li>
            <a><i class="fas fa-phone"></i>{{ phone }}</a>
          </li>
        </ul>
        <div class="social_media">
          <a href="#"><i class="fas fa-facebook-f"></i></a>
          <a href="#"><i class="fas fa-twitter"></i></a>
          <a href="#"><i class="fas fa-instagram"></i></a>
        </div>
      </div>
      <div class="main_content">
        <div class="header">
          Welcome <strong>{{ name }}</strong> !! Have a nice day.
        </div>
      </div>
    </div>

    <!-- admin dashboard  -->
    <AdminDashboard />
  </div>
</template>

<script>
import AdminDashboard from "./admin/AdminDashboard.vue";
export default {
  name: "CommonDashboard",
  components: {
    AdminDashboard
  },

  data() {
    return {
      name: "",
      email: "",
      phone: ""
    };
  },
  methods: {
    logout() {
      window.alert("logout");
    }
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await response.json();

      // console.log(response);
      //   console.log(data.user[0]);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "Login" });
      } else {
        // display the data on the dashboard
        const { name, email, phone } = data.user[0];
        this.name = name;
        this.email = email;
        this.phone = phone;
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/commonDashboardStyle.css";
</style>
