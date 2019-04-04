<template>
  <div class="login-signup">
    <!-- <div class="login-signup-background"></div> -->
    <div class="login-signup-inner">
      <input-label type="email" label="email"></input-label>
      <input-label type="password" label="password"></input-label>
      <button>sign in</button>
    </div>
  </div>
</template>

<script lang="ts" src="./login-signup.ts"></script>

<style lang="scss">
.login-signup {
  position: relative;
  top: 80vh;
  height: 20vh;
  color: var(--on-dark-text-color);
  background: var(--overlay-color);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-signup-background {
    position: absolute;
    width: 100vw;
    height: 38vh;
    top: -9vh;
    background: radial-gradient(
      ellipse at center,
      rgba(140, 161, 171, 0.91) 0%,
      rgba(60, 155, 201, 0) 66%
    );
    backface-visibility: hidden;
  }

  .login-signup-inner {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
      margin: 0px 7px;
    }
  }
}
</style>
