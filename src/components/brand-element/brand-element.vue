<template>
  <a href="/" onclick="return false;" class="navbar-brand d-inline-flex align-items-center" ref="brand">
    <img :src="brandSrc">
    <span>{{brandText}}</span>
  </a>
</template>

<script lang="ts" src="./brand-element.ts"></script>

<style lang="scss">
@import "../../global.scss";

.navbar-brand {
  color: $primary-color;
  text-transform: uppercase;
  font-weight: 700;
  transition: color;

  img {
    max-width: 100%;
    max-height: 100%;
    height: 2rem;
  }

  &:hover {
    color: darken($color: $primary-color, $amount: 5);
  }

  *{
      padding: 0rem 0.1rem;
  }
}
</style>
