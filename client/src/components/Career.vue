<template>
  <form method="post" enctype="multipart/form-data">
    <div class="container">
      <h1>Career Section</h1>
      <p>Please fill in this form to Apply for a Job</p>
      <hr />

      <input
        type="text"
        v-model="name"
        placeholder="Enter Your Name"
        required
      />
      <input type="email" v-model="email" placeholder="Enter Email" required />
      <input
        type="tel"
        v-model="phone"
        placeholder="Enter Mobile Number"
        required
      />
      <input
        type="text"
        v-model="address"
        placeholder="Enter Address"
        required
      />

      <input
        type="text"
        v-model="qualification"
        placeholder="Enter Qualification"
        required
      />
      <input
        type="text"
        v-model="experience"
        placeholder="Enter Experience in Years"
        required
      />
      <label for="resume"
        ><i class="fa fa-pdf"></i>
        <strong>Upload Resume(size must be less than 1 MB)</strong></label
      >
      <input type="file" ref="resume" @change="saveResume" required />
      <hr />

      <button type="submit" class="registerbtn" @click.prevent="applyForJob">
        Apply
      </button>
    </div>
  </form>
</template>

<script>
import jQuery from "jquery";
export default {
  name: "Career",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      qualification: "",
      experience: "",
      resume: null
    };
  },
  methods: {
    saveResume() {
      this.resume = this.$refs.resume.files[0];
    },
    async applyForJob() {
      // client side validation
      if (
        !this.name ||
        !this.email ||
        !this.phone ||
        !this.address ||
        !this.qualification ||
        !this.experience ||
        this.resume == undefined
      ) {
        return window.alert("Please fill the data properly");
      }

      const userData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        qualification: this.qualification,
        experience: this.experience
      };
      try {
        // console.log(this.resume);
        // create form data
        const fd = new FormData();
        fd.append("myResume", this.resume);
        const params = jQuery.param(userData);
        console.log(params);
        // console.log(fd);
        const response = await fetch("http://localhost:5000/career?" + params, {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: fd
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong");
        } else {
          window.alert("Successfully Applied For the job! Check Your Mail");

          // clear all the input fields
          this.name = this.email = this.phone = this.address = this.qualification = this.experience =
            "";
          this.resume = null;
          // send to home page
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
