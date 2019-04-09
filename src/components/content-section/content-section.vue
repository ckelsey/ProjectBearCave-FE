<template>
  <section ref="section" :class="classes">
    <div class="content-section-inner-container">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" src="./content-section.ts"></script>

<style lang="scss">
.content-section {
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

  .content-section-inner-container {
    height: 100%;
    padding-top: 60px;

    .content-section-inner {
      max-width: 1200px;
      margin: auto;
      padding: 21px 42px;
    }
  }
}
</style>
