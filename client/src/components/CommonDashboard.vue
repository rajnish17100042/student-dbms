<template>
  <section>
    <h2>Basic Information</h2>

    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
      </tr>
      <tr>
        <td>{{ name }}</td>
        <td>{{ email }}</td>
        <td>{{ phone }}</td>
        <td><button @click.prevent="logout">Logout</button></td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: "CommonDashboard",
  data() {
    return {
      name: "",
      email: "",
      phone: ""
    };
  },
  methods: {
    logout() {
      window.alert("logout");
    }
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await response.json();

      // console.log(response);
      //   console.log(data.user[0]);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");
        // in case of any error redirect user to the login page
        this.$router.push({ name: "Login" });
      } else {
        // display the data on the dashboard
        const { name, email, phone } = data.user[0];
        this.name = name;
        this.email = email;
        this.phone = phone;
      }
    } catch (err) {
      console.log(err);
      // in case of any error redirect user to the login page
      //   history.push("/login");
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
