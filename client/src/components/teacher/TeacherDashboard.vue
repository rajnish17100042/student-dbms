<template>
  <div>
    <div class="wrapper">
      <div class="sidebar">
        <ul>
          <li>
            <a><i class="fas fa-envelope"></i>{{ teacher.email }}</a>
          </li>
          <li>
            <a><i class="fas fa-phone"></i>{{ teacher.phone }}</a>
          </li>
        </ul>
        <!-- <button @click="logout">Logout</button>      not working here -->
      </div>
      <div class="main_content">
        <div class="header">
          Welcome <strong>{{ teacher.name }}</strong> !! Have a nice day.
          <button @click="logout">Logout</button>

          <button>
            <router-link :to="'/updateTeacherPassword/' + teacher.id"
              ><i class="fas fa-key">Update Password</i></router-link
            >
          </button>
          <button>
            <router-link to="/notice-board">Issue a Notice</router-link>
          </button>
        </div>

        <!-- displaying teacher data  -->
        <div class="header">
          <h1>Registration Details</h1>
        </div>

        <div class="info">
          <table id="customers">
            <tr>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Joining Date</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
            </tr>
            <tr>
              <td>{{ teacher.qualification }}</td>
              <td>{{ teacher.experience }}</td>
              <td>{{ teacher.joining_date }}</td>
              <td>{{ teacher.address }}</td>
              <td>{{ teacher.city }}</td>
              <td>{{ teacher.state }}</td>
              <td>{{ teacher.pincode }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- displaying the list of student whose mentor is the current teacher  -->
    <StudentUnderGuidance />
  </div>
</template>

<script>
import StudentUnderGuidance from "./StudentUnderGuidance.vue";
export default {
  name: "TeacherDashboard",
  components: {
    StudentUnderGuidance
  },
  data() {
    return {
      teacher: []
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
      const response = await fetch("http://localhost:5000/teacher/dashboard", {
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
        this.teacher = data.user[0];
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
