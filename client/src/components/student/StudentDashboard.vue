<template>
  <div>
    <div class="wrapper">
      <div class="sidebar">
        <ul>
          <li>
            <a><i class="fas fa-envelope"></i>{{ student.email }}</a>
          </li>
          <li>
            <a><i class="fas fa-phone"></i>{{ student.phone }}</a>
          </li>
        </ul>
        <!-- <button @click="logout">Logout</button>      not working here -->
      </div>
      <div class="main_content">
        <div class="header">
          Welcome <strong>{{ student.name }}</strong> !! Have a nice day.
          <button @click="logout">Logout</button>

          <button>
            <router-link :to="'/updateStudentPassword/' + student.id"
              ><i class="fas fa-key">Update Password</i></router-link
            >
          </button>
        </div>

        <!-- displaying student data  -->
        <div class="header">
          <h1>Registration Details</h1>
        </div>

        <div class="info">
          <table id="customers">
            <tr>
              <th>Batch</th>
              <th>Personal Mentor</th>
              <th>Admission Date</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
            </tr>
            <tr>
              <td>{{ student.batch }}</td>
              <td>{{ student.personal_mentor }}</td>
              <td>{{ student.admission_date }}</td>
              <td>{{ student.address }}</td>
              <td>{{ student.city }}</td>
              <td>{{ student.state }}</td>
              <td>{{ student.pincode }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentDashboard",

  data() {
    return {
      student: []
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
      const response = await fetch("http://localhost:5000/student/dashboard", {
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
        this.student = data.user[0];
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
