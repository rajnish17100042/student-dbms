<template>
  <div>
    <div class="wrapper">
      <div class="sidebar">
        <ul>
          <li>
            <a href="#"><i class="fas fa-home"></i>Home</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-user"></i>Profile</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-address-card"></i>About</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-project-diagram"></i>portfolio</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-blog"></i>Blogs</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-address-book"></i>Contact</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-map-pin"></i>Map</a>
          </li>
        </ul>
        <div class="social_media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="main_content">
        <div class="header">
          Welcome <strong>{{ name }}</strong
          >!! Have a nice day.
        </div>
        <div class="info">
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed
          </div>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed
          </div>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonDashboard",
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
      console.log(err);
      // in case of any error redirect user to the login page
      //   history.push("/login");
    }
  }
};
</script>

<style scoped>
@import "../assets/css/commonDashboardStyle.css";
</style>
