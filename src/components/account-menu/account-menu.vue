<template>
  <div class="account-menu">
    <button v-if="!isLoggedIn" ref="signin">Sign in</button>
    <button v-if="isLoggedIn">Account</button>
  </div>
</template>

<script lang="ts" src="./account-menu.ts"></script>

<style lang="scss">
</style>
