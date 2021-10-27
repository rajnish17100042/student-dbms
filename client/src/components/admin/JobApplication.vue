<template>
  <div class="wrapper">
    <div class="main_content">
      <!-- displaying Job Application -->
      <div class="header">
        <h1>Job Application</h1>
      </div>

      <div class="info">
        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Date Of Appliction</th>
            <th>View Resume</th>
          </tr>
          <tr v-for="applicant in applicants" :key="applicant.id">
            <td>{{ applicant.name }}</td>
            <td>{{ applicant.email }}</td>
            <td>{{ applicant.phone }}</td>
            <td>{{ applicant.qualification }}</td>
            <td>{{ applicant.experience }}</td>
            <td>{{ applicant.applied_at }}</td>
            <td>
              <button
                type="button"
                class="btn btn-info btn-lg"
                data-toggle="modal"
                data-target="#myModal"
              >
                View Resume
              </button>
              <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>
                    <div class="modal-body">
                      <embed
                        :src="
                          `https://student-dbms-images.s3.amazonaws.com/${applicant.resume}`
                        "
                        frameborder="0"
                        width="100%"
                        height="400px"
                      />

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobApplication",
  data() {
    return {
      applicants: []
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/job-application",
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

      // console.log(response);
      //   console.log(data);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "Login" });
      } else {
        // display the data on the dashboard
        // console.log(data.result);
        this.applicants = data.result;
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
