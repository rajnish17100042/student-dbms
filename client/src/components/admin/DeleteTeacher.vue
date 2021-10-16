<template>
  <h1></h1>
</template>

<script>
export default {
  name: "DeleteTeacher",

  async beforeCreate() {
    try {
      const id = this.$route.params.id;
      console.log(id);
      const response = await fetch(
        "http://localhost:5000/registerTeacher/" + id,
        {
          method: "DELETE",
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

        this.$router.push({ name: "AdminDashboard" });
      } else {
        window.alert("Teacher deleted successfully");
        this.$router.push({ name: "AdminDashboard" });
      }
    } catch (err) {
      // console.log(err);

      this.$router.push({ name: "AdminDashboard" });
    }
  }
};
</script>

<style></style>
