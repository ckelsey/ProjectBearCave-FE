<template>
    <div class="stats-container-outer" v-if="total[0] !== total[1]">
        <p>Your profile is about {{Math.round((total[0] / total[1]) * 100)}}% complete</p>
        <div class="stats-container d-flex align-items-center mb-5 mt-5">
            <div
                v-for="(stat, index) in stats"
                :key="index"
                class="stat-item"
                :class="{ complete: stat.complete }"
                :title="stat.title"
                @click="profileState$.next(stat.key)"
            >
                <div class="stat-item-inner">
                    <font-awesome-icon :icon="stat.icon"></font-awesome-icon>
                </div>
            </div>
        </div>
    </div>
    <!-- <div
            v-for="(stat, index) in statKeys"
            :key="index"
            class="stat-container"
            :class="stat"
        >
            <div class="stat">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        r="54"
                        cx="60"
                        cy="60"
                        :stroke-dasharray="`${dashArray} ${dashArray}`"
                        :stroke-dashoffset="stats[stat]"
                        @click="profileState$.next(stat)"
                        @mouseover="statOver(stat)"
                    />
                </svg>
            </div>
        </div>
        <div class="stats-total">{{total}}%</div>
        <div class="selected-stat">
            <span v-if="selectedStat.key === ``">{{translate.get(`ProfileCompletion`)}}</span>
            <span v-if="selectedStat.key !== ``">{{selectedStat.key}} {{selectedStat.percent}}%</span>
    </div>-->
</template>
<script lang="ts" src="./profile-stats.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.stats-container {
    width: 100%;
    position: relative;
    height: 0.25rem;
    background: #dadada;
    border-radius: 1px;

    .stat-item {
        height: 100%;
        flex-basis: 0;
        flex-grow: 1;
        background: $highlight-color;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: height 0.2s ease-in-out;
        box-shadow: inset 1px 1px 0px 0px rgba(0, 0, 0, 0.22),
            inset 0px -1px 0px 0px rgba(0, 0, 0, 0.16);

        &:hover {
            .stat-item-inner {
                font-size: 1rem;
                left: -0.125rem;
                top: -0.125rem;

                svg {
                    width: 1rem;
                    height: 1rem;
                }
            }
        }

        .stat-item-inner {
            position: relative;
            left: 0rem;
            top: 0rem;
            font-size: 0.8rem;
            padding: 0.5rem;
            background: $highlight-color;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: font-size 0.2s ease-in-out, left 0.2s ease-in-out,
                top 0.2s ease-in-out;

            svg {
                position: relative;
                width: 0.75rem;
                height: 0.75rem;
                transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
            }
        }

        &.complete {
            background: $primary-color;

            .stat-item-inner {
                background: $primary-color;
            }
        }
    }
}

// .stats-container {
//     position: relative;
//     width: 7rem;
//     height: 8rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: $primary-color;
//     font-weight: bold;
//     font-size: 1rem;
//     pointer-events: none;
//     margin-bottom: 1rem;

//     .stats-total {
//         font-size: 0.9rem;
//     }

//     .selected-stat {
//         position: absolute;
//         bottom: -0.5rem;
//         font-size: 0.8rem;
//         text-transform: capitalize;
//         left: 0px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         transition: color 0.2s;
//         width: 100%;
//         white-space: nowrap;
//     }

//     .stat-container {
//         position: absolute;
//         width: 100%;
//         height: 100%;
//         top: 0px;
//         right: 0px;
//         pointer-events: none;

//         .stat {
//             position: relative;
//             width: 100%;
//             height: 100%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             pointer-events: none;

//             svg {
//                 width: 100%;
//                 height: 100%;
//                 stroke: currentColor;
//                 pointer-events: none;

//                 circle {
//                     fill: none;
//                     stroke: currentColor;
//                     stroke-width: 4px;
//                     cursor: pointer;
//                     pointer-events: all;
//                     opacity: 0.8;
//                     transform: rotate(90deg);
//                     transform-origin: 50% 50%;
//                     transition: stroke-width 0.2s, opacity 0.2s;

//                     &:hover {
//                         stroke-width: 6px;
//                         opacity: 1;
//                     }
//                 }
//             }
//         }

//         &.account {
//             color: $primary-color;

//             .stat {
//                 width: 100%;
//                 right: 0%;
//             }
//         }

//         &.phoneNumbers {
//             color: $primary-dark-color;
//             .stat {
//                 width: 87.5%;
//                 height: 87.5%;
//                 top: calc(6.25% / 1);
//                 right: -6.25%;
//             }
//         }

//         &.address {
//             color: $dark-color;
//             .stat {
//                 width: 75%;
//                 height: 75%;
//                 top: calc(12.5% / 1);
//                 right: -12.5%;
//             }
//         }

//         &.vehicle {
//             color: $highlight-dark-color;
//             .stat {
//                 width: 62.5%;
//                 height: 62.5%;
//                 top: calc(18.75% / 1);
//                 right: -18.75%;
//             }
//         }

//         &.employment {
//             color: $highlight-color;
//             .stat {
//                 width: 50%;
//                 height: 50%;
//                 top: calc(25% / 1);
//                 right: -25%;
//             }
//         }
//     }
// }
</style>
