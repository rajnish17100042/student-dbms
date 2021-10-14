<template>
  <form method="post">
    <div class="container">
      <h1>Update Student</h1>
      <p>Please fill the updated data</p>
      <hr />

      <input
        type="text"
        v-model="student.name"
        placeholder="Enter Name of Student"
        id="name"
        required
      />
      <input
        type="email"
        v-model="student.email"
        placeholder="Enter Email"
        id="email"
        required
      />
      <input
        type="tel"
        v-model="student.phone"
        placeholder="Enter Mobile Number"
        id="phone"
        required
      />
      <input
        type="text"
        v-model="student.address"
        placeholder="Enter Address"
        id="address"
        required
      />
      <input
        type="text"
        v-model="student.city"
        placeholder="Enter City Name"
        id="city"
        required
      />
      <input
        type="text"
        v-model="student.state"
        placeholder="Enter State"
        id="state"
        required
      />
      <input
        type="text"
        v-model="student.pincode"
        placeholder="Enter Pincode"
        id="pincode"
        required
      />
      <input
        type="text"
        v-model="student.batch"
        placeholder="Enter Batch Name"
        id="batch"
        required
      />
      <input
        type="date"
        v-model="student.admission_date"
        placeholder="Enter Date of Admission"
        id="admissionDate"
        required
      />
      <input
        type="text"
        v-model="student.personal_mentor"
        placeholder="Enter Personal Mentor Name"
        id="personalMentor"
        required
      />

      <hr />

      <button type="submit" class="registerbtn" @click.prevent="updateStudent">
        Update
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UpdateStudent",
  data() {
    return {
      student: {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        batch: "",
        admission_date: "",
        personal_mentor: ""
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
      const response = await fetch(
        "http://localhost:5000/registerStudent/" + id,
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
      console.log(data[0]);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "AdminDashboard" });
      } else {
        this.student = data[0];
      }
    } catch (err) {
      // console.log(err);

      this.$router.push({ name: "AdminDashboard" });
    }
  },

  methods: {
    async updateStudent() {
      try {
        const id = this.$route.params.id;
        console.log(id);
        console.log(this.student);
        const response = await fetch(
          "http://localhost:5000/registerStudent/" + id,
          {
            method: "PATCH",
            credentials: "include", //important to include cookie data will be sent to server
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.student)
          }
        );
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong");
        } else {
          window.alert("Student updated successfully");

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
