<template>
  <form method="post">
    <div class="container">
      <h1>Login</h1>
      <p>Please fill in this form to Login</p>
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
      <label for="password"
        ><i class="fa fa-key"></i><strong>Password</strong></label
      >

      <input
        type="password"
        v-model="password"
        placeholder="Enter Password"
        id="password"
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
      password: "",
      role: ""
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        "http://localhost:5000/loginAuthentication",
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
      } else if (data === "teacher") {
        window.alert("redirecting to the teacher dashboard");
      } else if (data === "student") {
        window.alert("redirecting to the student dashboard");
      } else if (data === "admin") {
        // window.alert("redirecting to the admin dashboard");
        this.$router.push({ name: "AdminDashboard" });
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    async login() {
      // client side validation
      if (!this.email || !this.password || !this.role) {
        return window.alert("Please fill the data properly");
      }

      const loginData = {
        email: this.email,
        password: this.password,
        role: this.role
      };
      console.log(loginData);
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          //   credentials: "include", // Don't forget to specify this if you need cookies

          body: JSON.stringify(loginData)
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("Invalid Credentials");
        }
        // send user to respective dashboard after successful login
        if (this.role === "admin") {
          this.$router.push({ name: "AdminDashboard" });
        } else if (this.role === "student") {
          window.alert("redirecting to Student Dashboard");
        } else if (this.role === "teacher") {
          window.alert("redirecting to Teacher Dashboard");
        }

        // clear all the input fields
        this.email = this.role = this.password = "";
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
