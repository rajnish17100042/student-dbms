<template>
  <form method="post">
    <div class="container">
      <h1>Announcement</h1>
      <p>Please fill in this form to issue a Notice</p>
      <hr />

      <label for="name"><i class="fa fa-user"></i> <strong>Name</strong></label>
      <input type="text" v-model="name" placeholder="Name" required disabled />

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
      <label for="group"
        ><i class="fa fa-universal-access"></i><strong>Group</strong></label
      >
      <select v-model="group" required>
        <option value="" disabled selected>Select Group</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="common">Common</option>
      </select>

      <label for="noticeNate"
        ><i class="fa fa-universal-date"></i><strong>Notice Date</strong></label
      >

      <input
        type="date"
        v-model="noticeDate"
        placeholder="Enter Date of notice issued"
        required
      />
      <label for="subject"
        ><i class="fa fa-text"></i> <strong>Subject</strong></label
      >
      <input
        type="text"
        v-model="subject"
        placeholder="Enter subject for Notice"
        id="email"
        required
      />
      <label for="notice"><strong>Notice</strong></label>
      <textarea
        v-model="notice"
        placeholder="Write notice here..."
        style="height:200px"
      ></textarea>

      <hr />

      <button type="submit" class="loginbtn" @click.prevent="issueNotice">
        Issue Notice
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "NoticeBoard",
  data() {
    return {
      name: "",
      email: "",
      group: "",
      noticeDate: "",
      subject: "",
      notice: ""
    };
  },
  async mounted() {
    // window.alert("Mounting");
    // first check that this route is only reachable to admin and teacher  ...first authenticate the user
    try {
      const response = await fetch("http://localhost:5000/authentication", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include" // very important to include ... authentication will not be done .... cookies will not be sent to the server  ...checked
      });
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
    async issueNotice() {
      //   client side validation
      if (!this.group || !this.noticeDate || !this.subject || !this.notice) {
        return window.alert("Please fill all the field properly");
      }
      try {
        const noticeData = {
          name: this.name,
          email: this.email,
          group: this.group,
          notice_date: this.noticeDate,
          subject: this.subject,
          notice: this.notice
        };

        //make the request to the Server
        const response = await fetch("http://localhost:5000/issue-notice", {
          method: "POST",
          credentials: "include", //important to include cookie data will be sent to server
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(noticeData)
        });

        const data = await response.json();
        console.log(response);
        console.log(data);
        if (response.status !== 200 || !data) {
          window.alert("something went wrong! Please try again");
        } else {
          window.alert("Notice Issued successfully");
          // clear all the input fields
          this.group = this.notice_date = this.subject = this.notice = "";
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
