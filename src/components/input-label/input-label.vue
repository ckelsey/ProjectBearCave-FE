<template>
  <div class="input-label">
    <input :class="inputClass" :type="inputType" :value="value" ref="input" @input="onInput">
    <label>{{getLabel}}</label>
  </div>
</template>

<script lang="ts" src="./input-label.ts"></script>

<style lang="scss">
.input-label {
  display: inline-block;
  position: relative;
  width: 100%;

  label {
    display: block;
    position: absolute;
    top: 7px;
    left: 7px;
    color: inherit;
    font: inherit;
    user-select: none;
    pointer-events: none;
    opacity: 0.5;
    transition: all 0.2s;
  }

  input {
    width: 100%;
    background: #fff;
    color: inherit;
    border: none;
    font: inherit;
    -webkit-appearance: none;
    padding: 7px;
    box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3);
    cursor: text;
    outline: none !important;
    transition: all 0.2s;

    &:focus + label,
    &.has-value + label {
      top: -21px;
      font-size: 80%;
      opacity:1;
    }
  }
}
</style>
