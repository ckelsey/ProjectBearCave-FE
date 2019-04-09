<template>
  <div :class="classes">
    <div :class="registerClasses">
      <div class="form" :class="formState">
        <h2 id="register-message">Register and stuff</h2>
        <h2 id="login-message">Welcome back</h2>
        <div class="login-register-inputs">
          <input-label
            id="firstNameInput"
            label="first name"
            type="text"
            name="firstName"
            :value="register.firstName"
            @onInput="formUpdate"
          ></input-label>
          <input-label
            id="lastNameInput"
            label="last name"
            name="lastName"
            type="text"
            :value="register.lastName"
            @onInput="formUpdate"
          ></input-label>
        </div>
        <div class="login-register-inputs">
          <input-label
            id="emailInput"
            name="email"
            label="email"
            type="email"
            :value="register.email"
            @onInput="formUpdate"
          ></input-label>
        </div>
        <div class="login-register-inputs">
          <input-label
            id="passwordInput"
            label="password"
            type="password"
            name="password"
            :value="register.password"
            @onInput="formUpdate"
          ></input-label>
          <input-label
            id="confirmPasswordInput"
            label="confirm password"
            type="password"
            name="confirmPassword"
            :value="register.confirmPassword"
            @onInput="formUpdate"
          ></input-label>
        </div>
        <div class="form-bottom">
          <div class="form-bottom-left">
            <button v-on:click="loginRegister" class="border-orange bold">
              <span id="register-button">register</span>
              <span id="login-button">login</span>
            </button>
          </div>
          <div class="form-bottom-right">
            <span v-on:click="state.login='login'" id="switch-to-login">Have an account?</span>
            <span v-on:click="state.login='register'" id="switch-to-register">Need an account?</span>
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

  .register-form {
    width: 100%;
    height: 100%;
    padding: 120px 20px 40px;
    margin: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .input-label {
      display: block;
      margin: 21px 0px 35px;
    }
  }

  .login-register-inputs {
    display: flex;
    flex-wrap: wrap;
    margin: 0px -10px;

    .input-label {
      min-width: 280px;
      flex-shrink: 1;
      width: auto;
      margin: 10px 10px 25px;
      flex-grow: 1;
      box-sizing: border-box;
    }
  }

  .form {
    #switch-to-register,
    #switch-to-login {
      cursor: pointer;
    }

    &.register {
      #login-message,
      #login-button,
      #switch-to-register {
        display: none;
      }

      #confirmPasswordInput,
      #firstNameInput,
      #lastNameInput,
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

      #confirmPasswordInput,
      #firstNameInput,
      #lastNameInput,
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

    .form-bottom-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
