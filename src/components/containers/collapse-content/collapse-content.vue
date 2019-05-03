<template>
    <div class="collapse-content" :class="toggled ? `showing` : `hiding`">
        <div class="collapse-content-toggle" @click="toggle" ref="toggler">
            <slot name="toggle"></slot>
        </div>
        <div class="collapse-content-content" ref="content">
            <div class="collapse-content-content-inner" ref="inner">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./collapse-content.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.collapse-content {
    position: relative;
    height: auto;
    left: 0%;
    top: 0px;
    width: 100%;

    .collapse-content-content {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .collapse-content-content-inner {
        padding: 1px;
    }

    .collapse-content-toggle {
        background: rgba(239, 243, 245, 0.6);
        box-shadow: inset 0px 0px 0px 1px rgba(186, 202, 210, 0.4);
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        opacity: 0.8;
        transition: opacity 0.2s, background-color 0.2s;

        &:before {
            content: "";
            display: block;
            border: 5px solid transparent;
            border-left-color: $primary-color;
            position: relative;
            left: 0px;
            top: 0px;
            transition: border-color 0.2s, top 0.2s, left 0.2s;
        }

        &:hover {
            opacity: 1;
            background: rgba(217, 234, 243, 0.5);
        }
    }

    &.showing > .collapse-content-toggle {
        opacity: 1;
        background: rgba(217, 234, 243, 0.5);

        &:before {
            left: -2px;
            top: 2px;
            border-top-color: $primary-color;
            border-left-color: transparent;
        }
    }
}
</style>
