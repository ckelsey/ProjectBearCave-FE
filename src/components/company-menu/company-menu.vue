<template>
  <div class="dropdown company-menu">
    <a
      class="btn btn-link dropdown-toggle d-inline-flex align-items-center size-125"
      href="#"
      role="button"
      id="companyMenu"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <font-awesome-icon icon="bars"/>
    </a>

    <div class="dropdown-menu" aria-labelledby="companyMenu">
      <a class="dropdown-item" href="#" ref="aboutUs">About us</a>
      <a class="dropdown-item" href="#" ref="support">Support</a>
    </div>
  </div>
</template>

<script lang="ts" src="./company-menu.ts"></script>

<style lang="scss">
.company-menu {

  .dropdown-toggle::after {
    display: none;
  }
}
</style>
