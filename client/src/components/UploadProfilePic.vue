<template>
  <form method="post" enctype="multipart/form-data">
    <div class="container">
      <h1>Upload Profile Picture</h1>
      <p>Please fill in this form</p>
      <hr />

      <label for="email"
        ><i class="fa fa-envelope"></i> <strong>Email</strong></label
      >
      <input
        type="email"
        v-model="email"
        placeholder="Enter Your Email"
        required
        disabled
      />
      <label for="image"
        ><i class="fa fa-image"></i>
        <strong>Choose Image(size must be less than 1 MB)</strong></label
      >
      <input
        type="file"
        ref="file"
        @change="saveImage"
        required
        accept="image/*"
      />
      <hr />

      <button type="submit" class="loginbtn" @click.prevent="uploadImage">
        Upload Image
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UploadProfilePic",
  data() {
    return {
      email: "",
      image: null
    };
  },
  async mounted() {
    // window.alert("Mounting");
    // first check that this route is only reachable to admin and teacher  ...first authenticate the user
    try {
      const response = await fetch(
        "http://localhost:5000/common-authentication",
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
        console.log(data.user.email, data.user.name);
        this.name = data.user.name;
        this.email = data.user.email;
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    saveImage() {
      this.image = this.$refs.file.files[0];
    },
    async uploadImage() {
      //   client side validation
      if (this.image == undefined) {
        return window.alert("Please choose a file to upload");
      }
      // console.log(this.image);
      try {
        // create form data
        const fd = new FormData();
        fd.append("myImage", this.image);

        //make the request to the Server
        const response = await fetch("http://localhost:5000/upload-image", {
          method: "POST",
          credentials: "include", //important to include cookie data will be sent to server
          body: fd
        });

        const data = await response.json();
        console.log(response);
        console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong! Please try again");
        } else {
          window.alert("Image Uploaded  successfully");
          // clear all the input fields
          this.image = null;
        }
      } catch (err) {
        return window.alert("Some Error Occured ! Please try again ");
      }
    }
  }
};
</script>

<style scoped>
/* import css here */
@import "../assets/css/style.css";
</style>
