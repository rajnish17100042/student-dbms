<template>
  <form method="post">
    <div class="container">
      <h1>Login</h1>
      <p>Please fill in this form to Login</p>
      <hr />

      <input
        type="email"
        v-model="email"
        placeholder="Enter Your Email"
        id="email"
        required
      />

      <input
        type="password"
        v-model="password"
        placeholder="Enter Password"
        id="password"
        required
      />
      <select v-model="role" required>
        <option value="" disabled selected>Select your Role</option>
        <option value="student">Student</option>
        <option value="librarian">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <hr />

      <button type="submit" class="loginbtn" @click.prevent="login">
        Login
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      role: "",
      password: ""
    };
  },
  methods: {
    async login() {
      // client side validation
      if (!this.email || !this.role || !this.password) {
        return window.alert("Please fill the data properly");
      }

      const loginData = {
        email: this.email,
        role: this.role,
        password: this.password
      };
      console.log(loginData);
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginData)
        });
        // console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("Invalid Credentials");
        } else {
          window.alert("Logged In  successfully");

          // clear all the input fields
          this.email = this.role = this.password = "";

          // send user to home page after successful login

          this.$router.push({ name: "Home" });
        }
      } catch (err) {
        // console.log(err);
        window.alert("some Error occured! Please try again");
      }
    }
  }
};
</script>

<style scoped>
/* import css here */
@import "../assets/css/style.css";
</style>
