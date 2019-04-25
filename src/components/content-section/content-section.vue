<template>
    <section
        ref="section"
        class="content-section-wrapper"
        :class="Classes"
    >
        <div
            class="content-section-inner-wrapper"
            ref="inner"
        >
            <div
                class="content-section-content"
                ref="content"
            >
                <slot></slot>
            </div>
            <div
                class="content-section-wipe"
                ref="wipe"
            ></div>
        </div>
    </section>
</template>

<script lang="ts" src="./content-section.ts"></script>

<style lang="scss">
@import "../../global.scss";

.content-section-wrapper {
    position: absolute;
    left: 0%;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;

    .content-section-inner-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        left: 0px;
        display: flex;
        justify-content: center;

        .content-section-content {
            width: 100%;
        }
    }

    .content-section-wipe {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 0px;
        pointer-events: none;
        background: $medium-light-gray;
    }

    &.max > .content-section-inner-wrapper > .content-section-content {
        max-width: 1280px;
        padding: 2rem 1rem;
    }

    &.full {
        background: $light-gray;

        .content-section-inner-wrapper {
            overflow: auto;
        }
    }

    &.notfull {
        position: relative;
        height: auto;
        .content-section-inner-wrapper {
            max-height: 0px;
            overflow: hidden;
        }
    }

    &.showing {
        pointer-events: all;

        &.notfull {
            overflow: auto;
        }

        &.done-animating {
            .content-section-inner-wrapper {
                overflow: auto;
            }
        }
    }
}
</style>
