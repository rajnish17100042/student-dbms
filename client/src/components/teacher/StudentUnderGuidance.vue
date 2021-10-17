<template>
  <div class="wrapper">
    <div class="main_content">
      <!-- displaying student data  -->
      <div class="header">
        <h1>Students Under Guidance</h1>
      </div>

      <div class="info">
        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Batch</th>
            <th>Personal Mentor</th>
            <th>Action</th>
          </tr>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.batch }}</td>
            <td>{{ student.personal_mentor }}</td>
            <td>
              <router-link :to="'/updateStudent/' + student.id"
                ><i class="fas fa-edit"></i
              ></router-link>
              <router-link :to="'/deleteStudent/' + student.id"
                ><i class="fas fa-trash" style="padding:0px 20px"></i
              ></router-link>
              <router-link :to="'/updateStudentPassword/' + student.id"
                ><i class="fas fa-key"></i
              ></router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentUnderGuidance",
  data() {
    return {
      students: []
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        "http://localhost:5000/teacher/studentUnderGuidance",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include" // very important to include ... authentication will not be done .... cookies will not be sent to the server  ...checked
        }
      );
      const data = await response.json(); //parese the responses as json

      //   console.log(response);
      //   console.log(data);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "Login" });
      } else {
        // display the data on the dashboard
        // console.log(data.result);
        this.students = data.result;
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
