<template>
  <div :class="classes" ref="button">
      <button class="hamburger on-dark"><i></i></button>
      <left-pane class="bg-green" ref="menu">
        <div class="link-list">
          <div><a href="/" ref="aboutUs">About us</a></div>
          <div><a href="/" ref="contact">Contact</a></div>
          <div><a href="/" ref="support">Support</a></div>
          <!-- <div><a href="/" onclick="return false;">Charity</a></div>
          <div><a href="/" onclick="return false;">Blog</a></div>
          <div><a href="/" onclick="return false;">Contact</a></div> -->
        </div>
      </left-pane>
  </div>
</template>

<script lang="ts" src="./company-menu.ts"></script>

<style lang="scss">

</style>
