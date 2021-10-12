<template>
  <form method="post">
    <div class="container">
      <h1>Register Teacher</h1>
      <p>Please fill in this form to register teacher</p>
      <hr />

      <input
        type="text"
        v-model="name"
        placeholder="Enter Name of the Teacher"
        id="name"
        required
      />
      <input
        type="email"
        v-model="email"
        placeholder="Enter Email"
        id="email"
        required
      />
      <input
        type="tel"
        v-model="phone"
        placeholder="Enter Mobile Number"
        id="phone"
        required
      />
      <input
        type="text"
        v-model="address"
        placeholder="Enter Address"
        id="address"
        required
      />
      <input
        type="text"
        v-model="city"
        placeholder="Enter City Name"
        id="city"
        required
      />
      <input
        type="text"
        v-model="state"
        placeholder="Enter State"
        id="state"
        required
      />
      <input
        type="text"
        v-model="pincode"
        placeholder="Enter Pincode"
        id="pincode"
        required
      />
      <input
        type="text"
        v-model="qualification"
        placeholder="Enter Qualification"
        id="qualification"
        required
      />
      <input
        type="text"
        v-model="experience"
        placeholder="Enter Experience in Years"
        id="experience"
        required
      />
      <input
        type="date"
        v-model="joiningDate"
        placeholder="Enter Date of Joining"
        id="joiningDate"
        required
      />
      <input
        type="text"
        v-model="salary"
        placeholder="Enter Salary"
        id="salary"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Enter Password"
        id="password"
        required
      />
      <input
        type="password"
        v-model="cpassword"
        placeholder="Confirm Password"
        id="cpassword"
        required
      />
      <hr />

      <button
        type="submit"
        class="registerbtn"
        @click.prevent="registerTeacher"
      >
        Register
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "TeacherRegistration",
  async mounted() {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/registrationAuthentication",
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
        console.log("rendering registration page");
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
      this.$router.push({ name: "Login" });
    }
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      qualification: "",
      experience: "",
      joiningDate: "",
      salary: "",
      password: "",
      cpassword: ""
    };
  },
  methods: {
    async registerTeacher() {
      // client side validation
      if (
        !this.name ||
        !this.email ||
        !this.phone ||
        !this.address ||
        !this.city ||
        !this.state ||
        !this.pincode ||
        !this.qualification ||
        !this.experience ||
        !this.joiningDate ||
        !this.salary ||
        !this.password ||
        !this.cpassword
      ) {
        return window.alert("Please fill the data properly");
      }
      if (this.password !== this.cpassword) {
        return window.alert("Password not matching");
      }
      const teacher = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        city: this.city,
        state: this.state,
        pincode: this.pincode,
        qualification: this.qualification,
        experience: this.experience,
        joiningDate: this.joiningDate,
        salary: this.salary,
        password: this.password
      };
      try {
        const response = await fetch("http://localhost:5000/registerTeacher", {
          method: "POST",
          credentials: "include", //important to include cookie data will be sent to server
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(teacher)
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong or  already registered");
        } else {
          window.alert("Teacher Registered successfully");

          // clear all the input fields
          this.name = this.email = this.phone = this.address = this.city = this.state = this.pincode = this.qualification = this.experience = this.joiningDate = this.salary = this.password = this.cpassword =
            "";

          // send admin to home page
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
@import "../../assets/css/style.css";
</style>
