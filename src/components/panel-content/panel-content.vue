<template>
    <div
        class="panel-content"
        :class="classes"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts" src="./panel-content.ts"></script>
<style lang="scss">
@import "../../global.scss";
.panel-content {
    position: fixed;
    width: 0%;
    max-width: 250px;
    height: calc(100% - 68px);
    top: 68px;
    left: 0px;
    padding-left: 0px;
    padding-right: 0px;
    overflow: hidden;
    background: $dark-color;
    color: lighten($dark-color, 60%);
    display: flex;
    flex-direction: column;
    transition: width 0.4s ease-in-out, right 0.35s ease-in-out,
        left 0.35s ease-in-out, padding-left 0.3s ease-in-out,
        padding-right 0.3s ease-in-out, overflow 0s linear 0.4s;

    &.opening,
    &.closing {
        .list-item {
            padding: 1rem 2rem;
        }
    }

    &.expanded {
        width: 90%;
        overflow: auto;
    }

    &.right {
        left: unset;
        right: 0px;
    }

    * {
        color: lighten($dark-color, 60%);
        white-space: nowrap;
    }
}
</style>
