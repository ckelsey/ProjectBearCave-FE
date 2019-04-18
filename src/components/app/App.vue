<template>
  <div id="app">
    <nav-bar></nav-bar>
    <about-us v-if="state.state==='about'"></about-us>
    <support-section v-if="state.state==='support'"></support-section>
    <login-form v-if="state.state==='login' || state.state==='register'"></login-form>
    <profile-dashboard v-if="state.state==='account' && user.model"></profile-dashboard>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style lang="scss">
@import "../../global.scss";
</style>
