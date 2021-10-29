<template>
  <form method="post">
    <div class="container">
      <h1>Reset Password</h1>
      <p>Please fill in to reset your password</p>
      <hr />

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

      <button type="submit" class="registerbtn" @click.prevent="resetPassword">
        Reset Password
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      newPassword: "",
      cnewPassword: ""
    };
  },
  // beforeMount() {
  //   window.alert("before mounting");
  // },
  async mounted() {
    try {
      const params = this.$route.params;
      const { role, email, token } = params;
      const response = await fetch(
        "/resetPassword/" + role + "/" + email + "/" + token,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
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
        console.log("rendering page");
      }
    } catch (err) {
      //   console.log(err);
      // in case of any error redirect user to the login page
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    async resetPassword() {
      //   window.alert("Hitting the function");
      try {
        const params = this.$route.params;
        const { role, email, token } = params;
        const userData = {
          newPassword: this.newPassword,
          cnewPassword: this.cnewPassword
        };
        const response = await fetch(
          "/resetPassword/" + role + "/" + email + "/" + token,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
          }
        );
        const data = await response.json();

        console.log(response);
        console.log(data);

        // check the status code sent from the backend
        if (response.status !== 200 || !data) {
          return window.alert("Sorry! Something is missing");
        } else {
          this.$router.push({ name: "Login" });
        }
      } catch (err) {
        //   console.log(err);
        return window.alert("Sorry! Something is missing");
      }
    }
  }
};
</script>

<style scoped>
/* import css here */
@import "../assets/css/style.css";
</style>
