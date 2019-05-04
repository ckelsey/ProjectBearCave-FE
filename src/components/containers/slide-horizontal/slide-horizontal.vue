<template>
    <div class="slide-horizontal" :class="showing ? `showing`:``">
        <div class="slide-horizontal-inner" ref="inner">
            <div class="markup" ref="markup"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" src="./slide-horizontal.ts"></script>

<style lang="scss">
@import "@/global/global.scss";

.slide-horizontal {
    left: 0%;
    top: 0px;
    width: 100%;
    pointer-events: none;
    position: relative;

    &.showing {
        pointer-events: all;
    }

    .slide-horizontal-inner {
        min-width: 100%;
        min-height: 100%;
        top: 0px;
        left: 0px;
    }
}
</style>
