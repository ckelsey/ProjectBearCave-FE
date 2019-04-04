<template>
  <div :class="classes">
    <div :class="registerClasses">
      <div class="form">
        <input-label label="first name" type="text" :value="register.firstName"></input-label>
        <input-label label="last name" type="text" :value="register.lastName"></input-label>
        <input-label label="email" type="email" :value="register.email"></input-label>
        <input-label label="password" type="password" :value="register.password"></input-label>
        <input-label label="confirm password" type="password" :value="register.password"></input-label>
        <button class="border-orange bold">register</button>
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
    padding: 40px;
    max-width: 300px;
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
  }
}
</style>
