<template>
  <nav class="nav-bar">
    <company-menu ref="menu"></company-menu>
    <brand-element ref="brand"></brand-element>
    <account-menu ref="account"></account-menu>
  </nav>
</template>

<script lang="ts" src="./nav-bar.ts"></script>

<style lang="scss">
nav.nav-bar {
  height: 60px;
  width: 100%;
  background: var(--dark-blue);
  position: fixed;
  top: 0px;
  left: 0px;
  color: var(--on-dark-text-color);
  z-index: 10;
  padding: 0px;
  box-shadow: 0px 1px 0px rgba(26, 36, 41, 0.16),
    0px 3px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;

  .brand-element {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }

  .account-menu,
  .company-menu {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 0;
    min-width: 80px;
    transition: all 0.2s;

    button {
      padding: 0px;
      width: 100%;
      height: 100%;
    }

    &:hover,
    &.toggled {
      &.account-menu {
        background: var(--blue);
      }

      &.company-menu {
        background: var(--green);
      }
    }
  }
}
</style>
