<template>
    <div class="slide-vertical" :class="showing ? `showing`:``">
        <div class="slide-vertical-inner" ref="inner">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" src="./slide-vertical.ts"></script>

<style lang="scss">
@import "@/global/global.scss";
.slide-vertical {
    left: 0%;
    top: 0px;
    width: 100%;
    pointer-events: none;
    position: relative;

    &.showing {
        pointer-events: all;
    }

    .slide-vertical-inner{
        min-width: 100%;
        min-height: 100%;
        top:0px;
        left: 0px;
    }
}

// .slide-vertical {
//     left: 0%;
//     top: 0px;
//     width: 100%;
//     pointer-events: none;
//     position: relative;
//     height: auto;

//     .slide-vertical-inner {
//         position: relative;
//         width: 100%;
//         height: 100%;
//         left: 0px;
//         display: flex;
//         justify-content: center;

//         .slide-vertical-content {
//             width: 100%;
//         }
//     }

//     &.showing {
//         pointer-events: all;
//     }
// }
</style>
