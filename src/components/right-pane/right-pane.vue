<template>
  <div class="left-pane" ref="pane">
    <div class="left-pane-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./left-pane.ts"></script>

<style lang="scss">
.left-pane {
  position: fixed;
  top: 60px;
  left: 0px;
  height: calc(100vh - 60px);
  z-index: 9;
  width: 0%;
  max-width: 300px;
  transition: all 0.4s ease-in-out;
  overflow: hidden;

  .left-pane-inner {
    padding: 21px;
    overflow: auto;
    opacity: 0;
    transition: all 0.1s ease-in-out;
  }

  &.open {
    width: 90%;

    .left-pane-inner {
      opacity: 1;
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>
