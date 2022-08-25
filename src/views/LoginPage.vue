<template>
  <div class="auth">
    <form class="auth-form" @submit.prevent="submit">
      <div class="logo">
        <img src="../assets/logo_lrge.png"/>
      </div>
      <h1>{{login? 'Sign in' : 'Sign up' }}  to Waffly</h1>
      <div class="form-wrapper" v-if="login">
      <div class="form-input">
        <label for="email"> Login </label>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your e-mail"
          v-model="credentials.email"
          required
        />
      </div>

      <div class="form-input">
        <label for="password"> Password </label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          v-model="credentials.password"
          required
        />
      </div>
      <div class="error" v-if="error.code !== 200">
        {{ error.message }}
      </div>
      <div class="form-checked">
        <label class="sing" for="remember" @click="login = false; error= {}">Sing up</label>
      </div>

      <div class="form-button">
        <button @keyup.enter="submit" type="submit">Login</button>
      </div>
      </div>
       <div class="form-wrapper" v-else>
        <div class="form-input">
        <label for="email"> First Name </label>

        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="Enter your First Name"
          v-model="reg.fname"
          required
        />
      </div>
      <div class="form-input">
        <label for="email"> Last Name </label>

        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Enter your Last Name"
          v-model="reg.lname"
          required
        />
      </div>
      <div class="form-input">
        <label for="email"> Email </label>

        <input
          type="email"
          name="email"
          id="emailReg"
          placeholder="Enter your e-mail"
          v-model="reg.email"
          required
        />
      </div>

      <div class="form-input">
        <label for="password"> Password </label>
        <input
          type="password"
          name="password"
          id="passwordReg"
          placeholder="Type your password"
          v-model="reg.password"
          required
        />
      </div>
      <div class="error" v-if="error.code !== 200">
        {{ error.message }}
      </div>
      <div class="form-checked">
        <label class="sing" for="remember" @click="login = true; error= {}">Sing in</label>
      </div>

      <div class="form-button">
        <button @keyup.enter="submit" type="submit">Registration</button>
      </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'singIn',
    components: {},
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
        reg:{
          fname: '',
          lname: '',
          email: '',
          password: '',
        },
        error: {},
        login: true
      };
    },
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
      }),
    },
    methods: {
      ...mapActions({
        singIn: 'auth/singIn',
        register: 'auth/register',
      }),
      submit() {
        if(this.login){
          this.singIn(this.credentials).then((e) => {
          this.error = {};
          if (this.authenticated) {
            this.successLogin();
          } else {
            this.errorLogin(e);
          }
        });
        }else{
          this.register(this.reg)
        }

      },
      successLogin() {
        this.error = {};
        this.$router.push({
          name: 'home',
        });
      },
      errorLogin(e) {
        this.error = {
          code: e.response.status,
          message: 'Email or Password incorrect',
        };

      },
    },
    mounted() {

    },
  };
</script>
<style lang="scss" scoped>
  .sing{
    color:#212121 ;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        opacity: .6;
        transition: 0.3s;
      }
  }
  .form-wrapper{
    width: 460px;
    background: #FFFFFF;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.0698208);
    border-radius: 8px;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 24px;
  }
  .logo{
    display: flex;
    justify-content:  center;
  }
  .auth {
    position: relative;
    background-size: cover;
    color: #fff;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Inter;
  }
  .auth-form {
    display: block;
    z-index: 1;


    h1 {
      padding-bottom: 35px;
      font-style: normal;
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      /* identical to box height, or 120% */

      text-align: center;
      letter-spacing: -0.4px;

      color: #212121;
    }
  }
  .form-button {
    display: flex;

    button {
      font-weight: 600;
      color: #fff;
      padding: 16px 24px;
      background: #212121;
      border-radius: 8px;
      width: 100%;
      border-width: 0;
      cursor: pointer;
      &:hover {
        opacity: .6;
        transition: 0.3s;
      }
    }
  }
  .form-input {
    font-style: normal;
    font-size: 14px;
    line-height: 17px;

    label {
      color: #212121;
      font-weight: 500;
      display: block;
      margin-bottom: 8px;
    }

    input {
       color: #212121;
      margin-bottom: 24px;
      width: 100%;
      padding: 12px 0 12px 12px;
      background: inherit;
      border: 1px solid #EAEAEA;
      border-radius: 8px;
      box-sizing: border-box;

      &:focus-visible {
        outline: 0px;
      }
      &::placeholder {
        color: #7a828a;
      }
    }
  }
  .form-checked {
    margin-bottom: 24px;

    label {
      color: #7a828a;
    }

    input {
      background: #1b1b1b;
      border: 1px solid #202020;
      box-sizing: border-box;
      border-radius: 2px;
    }

    .custom-checkbox {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    .custom-checkbox + label {
      display: inline-flex;
      align-items: center;
      user-select: none;
    }



  }
  .error {
    animation: shake 0.2s ease-in-out 0s 2;
    color: red;
    margin-bottom: 10px;
    @keyframes shake {
      0% {
        margin-left: 0rem;
      }
      25% {
        margin-left: 0.5rem;
      }
      75% {
        margin-left: -0.5rem;
      }
      100% {
        margin-left: 0rem;
      }
    }
  }
</style>

