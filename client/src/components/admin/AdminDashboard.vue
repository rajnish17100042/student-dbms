<template>
  <div class="wrapper">
    <div class="main_content">
      <div class="header">
        <p>List of Students</p>
      </div>
      <div class="info">
        <div>
          {{ students }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      students: []
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/studentDetails",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include" // very important to include ... authentication will not be done .... cookies will not be sent to the server  ...checked
        }
      );
      const data = await response.json();

      console.log(response);
      console.log(data);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "Login" });
      } else {
        // display the data on the dashboard
        this.students = data;
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
@import "../../assets/css/commonDashboardStyle.css";
</style>
