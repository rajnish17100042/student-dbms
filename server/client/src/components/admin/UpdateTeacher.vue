<template>
  <form method="post">
    <div class="container">
      <h1>Update Teacher</h1>
      <p>Please fill the updated data</p>
      <hr />

      <input
        type="text"
        v-model="teacher.name"
        placeholder="Enter Name of Teacher"
        required
      />
      <input
        type="email"
        v-model="teacher.email"
        placeholder="Enter Email"
        required
      />
      <input
        type="tel"
        v-model="teacher.phone"
        placeholder="Enter Mobile Number"
        required
      />
      <input
        type="text"
        v-model="teacher.address"
        placeholder="Enter Address"
        required
      />
      <input
        type="text"
        v-model="teacher.city"
        placeholder="Enter City Name"
        required
      />
      <input
        type="text"
        v-model="teacher.state"
        placeholder="Enter State"
        required
      />
      <input
        type="text"
        v-model="teacher.pincode"
        placeholder="Enter Pincode"
        required
      />
      <input
        type="text"
        v-model="teacher.qualification"
        placeholder="Enter Qualification"
        required
      />
      <input
        type="text"
        v-model="teacher.experience"
        placeholder="Enter Experience in Years"
        id="experience"
        required
      />
      <input
        type="date"
        v-model="teacher.joining_date"
        placeholder="Enter Date of Joining"
        required
      />
      <input
        type="text"
        v-model="teacher.salary"
        placeholder="Enter Salary"
        required
      />

      <hr />

      <button type="submit" class="registerbtn" @click.prevent="updateTeacher">
        Update
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UpdateTeacher",
  data() {
    return {
      teacher: {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        qualification: "",
        experience: "",
        joining_date: "",
        salary: ""
      }
    };
  },
  // beforeMount() {
  //   window.alert("before mounting");
  // },
  async mounted() {
    try {
      const id = this.$route.params.id;
      console.log(id);
      const response = await fetch("/registerTeacher/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include" // very important to include ... authentication will not be done .... cookies will not be sent to the server  ...checked
      });
      const data = await response.json();
      console.log(response);
      console.log(data[0]);
      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "AdminDashboard" });
      } else {
        this.teacher = data[0];
      }
    } catch (err) {
      // console.log(err);
      this.$router.push({ name: "AdminDashboard" });
    }
  },
  methods: {
    async updateTeacher() {
      try {
        const id = this.$route.params.id;
        console.log(id);
        console.log(this.teacher);
        const response = await fetch("/registerTeacher/" + id, {
          method: "PATCH",
          credentials: "include", //important to include cookie data will be sent to server
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.teacher)
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong");
        } else {
          window.alert("Teacher updated successfully");
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
