<template>
    <section ref="section" class="page-content-wrapper" :class="Classes">
        <div class="page-content-inner-wrapper" ref="inner">
            <div class="page-content-content" ref="content">
                <slot></slot>
            </div>
        </div>
    </section>
</template>

<script lang="ts" src="./page-content.ts"></script>

<style lang="scss">
@import "@/global/global.scss";

.page-content-wrapper {
    position: absolute;
    left: 0%;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    background: $light-gray;

    .page-content-inner-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        left: 0px;
        display: flex;
        justify-content: center;

        .page-content-content {
            width: 100%;
            max-width: 1280px;
            padding: 2rem 1rem;
        }
    }

    &.showing {
        pointer-events: all;
    }
}
</style>
