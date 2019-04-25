<template>
    <a
        href="/"
        @click="goHome($event)"
        class="navbar-brand d-inline-flex align-items-center"
        ref="brand"
    >
        <!-- <img :src="brandSrc"> -->
        <span v-html="brandText"></span>
    </a>
</template>

<script lang="ts" src="./brand-element.ts"></script>

<style lang="scss">
@import "../../global.scss";

a.navbar-brand {
    color: $primary-color;
    user-select: none;
    font-weight: 300;
    font-size: 1.4rem;
    line-height: 1.45rem;
    font-family: $font-family-display;
    position: relative;
    top: -2px;
    margin: 0px;
    transition: color 0.2s ease-in-out;

    span {
        position: relative;
        left: 4px;
        text-transform: lowercase;
    }

    b {
        font-weight: bold;
        font-size: 1.5rem;
        display: block;
        position: relative;
        top: -4px;
        text-transform: uppercase;
        // color: darken($primary-color, 3%);
    }

    img {
        max-width: 100%;
        max-height: 100%;
        height: 2rem;
    }

    &:hover {
        color: #000;
    }

    * {
        padding: 0rem 0.1rem;
    }
}
</style>
