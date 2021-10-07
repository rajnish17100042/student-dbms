<template>
  <form method="post">
    <div class="container">
      <h1>Register Student</h1>
      <p>Please fill in this form to register students</p>
      <hr/>

      <input type="text" v-model="name" placeholder="Enter Name of Student"  id="name" required/>
      <input type="email" v-model="email" placeholder="Enter Email"  id="email" required/>
      <input type="tel" v-model="phone" placeholder="Enter Mobile Number"  id="phone" required/>
      <input type="text" v-model="address" placeholder="Enter Address"  id="address" required/>
      <input type="text" v-model="city" placeholder="Enter City Name"  id="city" required/>
      <input type="text" v-model="state" placeholder="Enter State"  id="state" required/>
      <input type="text" v-model="pincode" placeholder="Enter Pincode"  id="pincode" required/>
      <input type="text" v-model="batch" placeholder="Enter Batch Name"  id="batch" required/>
      <input type="date" v-model="admissionDate" placeholder="Enter Date of Admission"  id="admissionDate" required/>
      <input type="text" v-model="personalMentor" placeholder="Enter Personal Mentor Name"  id="personalMentor" required/>
      <input type="password" v-model="password" placeholder="Enter Password" id="password" required/>
      <input type="password" v-model="cpassword" placeholder="Confirm Password"  id="cpassword" required/>
      <hr/>
    

      <button type="submit" class="registerbtn" @click.prevent="registerStudent">Register</button>
    </div>
    
  
  </form>
</template>





<script>


export default {
    name:'Signup',
    data(){
    return{
        name:'',
        email:'',
        phone:'',
        address:'',
        city:'',
        state:'',
        pincode:'',
        batch:'',
        admissionDate:'',
        personalMentor:'',
        password:'',
        cpassword:'',
    }
    },
    methods:{
        async registerStudent(){
          // client side validation 
            if(!this.name||!this.email||!this.phone||!this.address||!this.city||!this.state||!this.pincode||!this.batch||!this.admissionDate||!this.personalMentor||!this.password||!this.cpassword){
              return window.alert("Please fill the data properly");
            }
            if(this.password!==this.cpassword){
              return window.alert("Password not matching")
            }
            const student={
              name:this.name,
              email:this.email,
              phone:this.phone,
              address:this.address,
              city:this.city,
              state:this.state,
              pincode:this.pincode,
              batch:this.batch,
              admissionDate:this.admissionDate,
              personalMentor:this.personalMentor,
              password:this.password
            };
        try{
            const response = await fetch("http://localhost:5001/registerStudent", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(student),
            
            });
            // console.log(response);
            const data=await response.json();
            // console.log(data);
            if(response.status!==200||!data){
              window.alert("something went wrong! Please try again");
            }
        }catch(err){
            // console.log(err);
            window.alert("some Error occured! Please try again");
        } 

        }
    }

}
</script>>



<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type=text],input[type=email],input[type=tel],input[type=date], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="date"]::before {
	color: #999999;
	content: attr(placeholder);
}
input[type="date"] {
	color: #ffffff;
}
input[type="date"]:focus,
input[type="date"]:valid {
	color: #666666;
}
input[type="date"]:focus::before,
input[type="date"]:valid::before {
	content: "" !important;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>>