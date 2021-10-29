<template>
  <form method="post">
    <div class="container">
      <h1>Update Student Password</h1>
      <p>Please fill in to update the password</p>
      <hr />
      <input
        type="password"
        v-model="currentPassword"
        placeholder="Enter Current Password"
        required
      />
      <input
        type="password"
        v-model="newPassword"
        placeholder="Enter New Password"
        required
      />
      <input
        type="password"
        v-model="cnewPassword"
        placeholder="Confirm New Password"
        required
      />

      <hr />

      <button
        type="submit"
        class="registerbtn"
        @click.prevent="updateStudentPassword"
      >
        Update Password
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UpdateStudentPassword",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      cnewPassword: ""
    };
  },
  // beforeMount() {
  //   window.alert("before mounting");
  // },
  async mounted() {
    try {
      const response = await fetch("/registrationAuthentication", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include" // very important to include ... authentication will not be done .... cookies will not be sent to the server  ...checked
      });
      const data = await response.json();

      // console.log(response);
      // console.log(data);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "Login" });
      } else {
        // display the data on the dashboard
        console.log("rendering page");
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    async updateStudentPassword() {
      try {
        // client side validation
        if (!this.currentPassword || !this.newPassword || !this.cnewPassword) {
          return window.alert("Please fill the data properly");
        }
        if (this.newPassword !== this.cnewPassword) {
          return window.alert("Password not matching");
        }
        const student = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        };
        const id = this.$route.params.id;
        console.log(id);
        console.log(student);
        const response = await fetch("/updateStudentPassword/" + id, {
          method: "PATCH",
          credentials: "include", //important to include cookie data will be sent to server
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(student)
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong");
        } else {
          window.alert("password updated successfully");

          // send admin to  dashbard
          this.$router.push({ name: "AdminDashboard" });
        }
      } catch (err) {
        console.log(err);
        window.alert("some Error occured! Please try again");
      }
    }
  }
};
</script>

<style scoped>
/* import css here */
@import "../../assets/css/style.css";
</style>
