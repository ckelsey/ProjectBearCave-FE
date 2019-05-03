<template>
    <div class="breadcrumbs-container d-flex align-items-center"></div>
</template>

<script lang="ts" src="./bread-crumb.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.breadcrumbs-container {
    .breadcrumb-element {
        cursor: pointer;
        color: $primary-color;
        max-width: 0%;
        overflow: hidden;
        transform: scale3d(0, 1, 1);
        transform-origin: 0px 50%;
        transition: color 0.2s, max-width 0.2s, transform 0.2s;
        white-space: nowrap;

        &.no-click {
            color: $dark-color;
            cursor: text;

            &:hover {
                color: $dark-color;
            }
        }

        &:hover {
            color: $dark-color;
        }

        & + .breadcrumb-element::before {
            content: "\00bb";
            padding: 0rem 0.5rem;
        }

        &.expanded {
            max-width: 100%;
            transform: scale3d(1, 1, 1);
        }
    }
}
</style>
