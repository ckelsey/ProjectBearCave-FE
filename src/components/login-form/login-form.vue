<template>
  <div :class="classes">
    <div :class="registerClasses">
      <div class="form" :class="formState">
        <h2 id="register-message">Register and stuff</h2>
        <h2 id="login-message">Welcome back</h2>
        <input-label label="first name" type="text" :value="register.firstName"></input-label>
        <input-label label="last name" type="text" :value="register.lastName"></input-label>
        <input-label label="email" type="email" :value="register.email"></input-label>
        <input-label label="password" type="password" :value="register.password"></input-label>
        <input-label label="confirm password" type="password" :value="register.password"></input-label>
        <div class="form-bottom">
          <div class="form-bottom-left">
            <button id="register-button" class="border-orange bold">register</button>
            <button id="login-button" class="border-orange bold">login</button>
          </div>
          <div class="form-bottom-right">
            <span v-on:click="state.login='login'" id="switch-to-login">Already have an account?</span>
            <span v-on:click="state.login='register'" id="switch-to-register">Don't have an account?</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./login-form.ts"></script>

<style lang="scss">
.login-form {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 1;
  filter: blur(0px);
  transition: all 0.6s ease-in-out;

  &.out {
    filter: blur(14px);
    opacity: 0;
    top: 110vh;
  }

  h2{
    font-weight: bold;
  }

  .register-form {
    width: 100%;
    height: 100%;
    padding: 40px;
    max-width: 80%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .input-label {
      display: block;
      margin: 21px 0px 35px;
    }
  }

  .form {
    width: 100%;
    max-width: 600px;

    &.register {
      #login-message,
      #login-button,
      #switch-to-register {
        display: none;
      }

      [label="confirm-password"],
      [label="first name"],
      [label="last name"],
      #register-message,
      #register-button,
      #switch-to-login {
        display: block;
      }
    }

    &.login {
      #login-message,
      #login-button,
      #switch-to-register {
        display: block;
      }

      [label="confirm-password"],
      [label="first name"],
      [label="last name"],
      #register-message,
      #register-button,
      #switch-to-login {
        display: none;
      }
    }
  }

  .form-bottom {
    display: flex;
    align-items: self;
    justify-content: space-between;

    // .form-bottom-left {
    // }

    // .form-bottom-left {
    // }
  }
}
</style>
