<template>
    <div class="clarence-helper-container">
        <div
            class="clarence-helper-inner"
            ref="container"
        >
            <div class="clarence-helper">
                <div class="clarence-bubble"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.clarence-helper-container {
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: fixed;
    top: 0px;
    left: 0px;

    .clarence-helper-inner {
        width: 100vw;
        height: 100vw;
        max-width: 250px;
        max-height: 250px;
        position: relative;
        transition: top 0.2s ease-in-out, left 0.2s ease-in-out,
            width 0.2s ease-in-out, height 0.2s ease-in-out;
    }

    .clarence-helper {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .clarence-bubble {
        width: 100%;
        height: 100%;
        position: relative;
        background: $primary-color;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid $dark-color;
    }
}

// .clarence-helper-container {
//     max-width: 280px;
//     width: 100%;
//     padding: 2rem;
//     height: 100%;
//     position: relative;
// }

// .clarence-bubble {
//     width: 0px;
//     height: 0px;
//     position: relative;
//     padding: 0%;
//     transition: padding 0.2s ease-in-out;

//     .clarence-bubble-inner {
//         position: absolute;
//         top: 0px;
//         right: 0px;
//         width: 100%;
//         height: 100%;
//         background: $primary-color;
//         border-radius: 50%;
//         transition: top 0.2s, right 0.2s, box-shadow 0.2s;
//         box-shadow: 0px 0px 0px transparent;
//         transition: box-shadow 0.2s ease-in-out;

//         .speech-bubble {
//             position: absolute;
//             bottom: 89%;
//             left: 50%;
//             width: 130%;
//             background: #fff;
//             border-radius: 50px;
//             text-align: center;
//             line-height: 1.1rem;
//             font-size: 0rem;
//             padding: 0rem;
//             box-shadow: 0px 0px 0px transparent;
//             transition: box-shadow 0.2s ease-in-out, padding 0.2s ease-in-out,
//                 font-size 0.2s ease-in-out;

//             &:after {
//                 content: "";
//                 display: block;
//                 width: 0px;
//                 height: 0px;
//                 border: 10px solid transparent;
//                 border-left-color: #fff;
//                 border-top-color: #fff;
//                 position: absolute;
//                 bottom: -14px;
//                 left: 25px;
//             }
//         }

//         .clarence-svg-outer {
//             width: 100%;
//             height: 100%;
//             position: relative;
//             overflow: hidden;
//             border-radius: 50%;
//         }

//         .clarence-svg {
//             width: 110%;
//             height: 110%;
//             left: -5%;
//             top: -5%;
//             position: relative;

//             svg {
//                 width: 100%;
//                 height: 100%;
//                 position: relative;
//             }
//         }
//     }

//     &.active {
//         padding: 33%;
//         .clarence-bubble-inner {
//             box-shadow: 0px 0px 0px 3px $dark-color;

//             .speech-bubble {
//                 padding: 0.8rem 1.5rem;
//                 font-size: 0.9rem;
//                 box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.11),
//                     0px 2px 0px 0px rgba(0, 0, 0, 0.07),
//                     0px 5px 15px 0px rgba(0, 0, 0, 0.05);
//             }
//         }
//     }
// }
</style>
