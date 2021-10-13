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
        <!-- <button @click="logout">Logout</button>      not working here -->
      </div>
      <div class="main_content">
        <div class="header">
          Welcome <strong>{{ name }}</strong> !! Have a nice day.
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <!-- admin dashboard  -->
    <RegistrationDetails />
  </div>
</template>

<script>
import RegistrationDetails from "./RegistrationDetails.vue";
export default {
  name: "AdminDashboard",
  components: {
    RegistrationDetails
  },

  data() {
    return {
      name: "",
      email: "",
      phone: ""
    };
  },
  methods: {
    async logout() {
      // console.log("logout");
      try {
        const response = await fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await response.json();

        // console.log(response);
        console.log(data);

        // check the status code sent from the backend
        if (response.status !== 200 || !data) {
          window.alert("Some Error occured! Please Try again");
        } else {
          console.log("logged out");
          this.$router.push({ name: "Login" });
        }
      } catch (err) {
        // console.log(err);

        window.alert("Some Error occured! Please Try again");
      }
    }
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:5000/admin/dashboard", {
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

<style>
@import "../../assets/css/commonDashboardStyle.css";
</style>
