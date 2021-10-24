<template>
  <form method="post">
    <div class="container">
      <h1>Forget Password Page</h1>
      <p>Please fill in this form to reset your password</p>
      <hr />

      <label for="email"
        ><i class="fa fa-envelope"></i> <strong>Email</strong></label
      >
      <input
        type="email"
        v-model="email"
        placeholder="Enter Your Email"
        id="email"
        required
      />

      <label for="role"
        ><i class="fa fa-universal-access"></i><strong>Role</strong></label
      >
      <select v-model="role" required>
        <option value="" disabled selected>Select your Role</option>
        <option value="student">student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <hr />

      <button type="submit" class="loginbtn" @click.prevent="forgetPassword">
        Get Reset Password Link
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      email: "",
      role: ""
    };
  },

  methods: {
    async forgetPassword() {
      //   window.alert("Hitting the function");
      // cilent side validation
      if (!this.email || !this.role) {
        return window.alert("Please fill the data properly");
      }
      const userData = {
        email: this.email,
        role: this.role
      };
      //   make a post request to server with email and role to check whether user exists
      try {
        const response = await fetch("http://localhost:5000/forget-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log(response);
        console.log(data);
        // check the status code of the response
        if (response.status !== 200 || !data) {
          window.alert("some error occured or User does not exists");
        } else {
          window.alert("Please check your email for reset password link ");
        }
      } catch (err) {
        // console.log(err);
        return window.alert("Some Error occured! Please try again");
      }
    }
  }
};
</script>

<style scoped>
/* import css here */
@import "../assets/css/style.css";
</style>
