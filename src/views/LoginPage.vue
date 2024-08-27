<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Login</h1>
    </header>
    <form @submit.prevent="onLogin">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" v-model="email" required>
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" required>
          <label for="password">Password</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light btn-primary" type="submit" name="action">Login</button>
      <button class="btn btn-secondary waves-effect waves-light" type="button" @click="cancel">Back</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
// No longer importing axios or useRouter from separate files
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',     // Holds the user's input for email
      password: '',  // Holds the user's input for password
      message: ''    // Holds any messages to display to the user (e.g., error or success messages)
    };
  },
  // Directly using Vue's `this.$router` instead of `useRouter`
  methods: {
    // Method triggered when the login form is submitted
    async onLogin() {
      // Check if both email and password fields are filled
      if (!this.email || !this.password) {
        this.message = 'Please fill in all fields';
        return;
      }

      try {
        // Send a POST request to the backend login API with the user's credentials
        const response = await fetch('http://localhost:8087/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        // If the response contains user data, proceed with login
        if (data) {
          // Store the customer data in localStorage for session persistence
          localStorage.setItem('customer', JSON.stringify(data));

          // Display a success message
          this.message = 'Login successful';

          // Redirect the user to the home page using $router
          this.$router.push('/home');
        } else {
          // If the API response indicates incorrect login details, display a message
          this.message = 'Incorrect details';
        }
      } catch (error) {
        // Catch any errors that occur during the API call and display them
        this.message = error.message;
      }
    },

    // Method to handle the cancel button action
    cancel() {
      // Go back to the previous page
      window.history.back();
    }
  },
  mounted() {
    // Automatically check if a user is already logged in when the component is mounted
    const storedCustomer = localStorage.getItem('customer');

    // If customer data is found in localStorage, redirect to the home page
    if (storedCustomer) {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Header styling */
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-image: url('https://wallpaperaccess.com/full/1880033.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Dark overlay over the header background image */
.header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

/* Heading styling */
h1 {
  font-family: var(--font-family);
  color: #a8f4ff;
  position: relative;
  z-index: 1;
}

/* Input field styling */
.input-field {
  position: relative;
}

/* Button styling */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  margin-right: 10px;
}

/* Primary button styling */
.btn-primary {
  background-color: #42b983;
  border: none;
  color: #fff;
}

/* Hover effect for primary button */
.btn-primary:hover {
  background-color: rgba(0, 117, 11, 0.86);
  transform: scale(1.05);
}

/* Secondary button styling */
.btn-secondary {
  background-color: #dc3545;
  border: none;
  color: #fff;
}

/* Hover effect for secondary button */
.btn-secondary:hover {
  background-color: rgba(168, 0, 0, 0.85);
  transform: scale(1.05);
}
</style>
