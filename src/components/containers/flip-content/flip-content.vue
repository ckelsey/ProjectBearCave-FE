<template>
    <div class="flip-content" :class="showing ? `unflipped` : ``"></div>
</template>
<script lang="ts" src="./flip-content.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.flip-content {
    opacity: 0;
    height: 0%;
    overflow: hidden;
    max-height: 0px;
    transform: rotate3d(0, 1, 0, 90deg);
    transition: opacity 0.2s, transform 0.2s;

    &.unflipped {
        height: auto;
        overflow: visible;
        max-height: unset;
        opacity: 1;
        transform: rotate3d(0, 1, 0, 0deg);
    }
}
</style>
