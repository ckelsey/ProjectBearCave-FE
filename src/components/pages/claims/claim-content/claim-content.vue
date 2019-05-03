<template>
    <collapse-content>
        <template v-slot:toggle>
            <div class="d-flex align-items-center justify-content-between w-100">
                <span>{{claim.defendant}}</span>
                <b>${{claim.payout}}</b>
            </div>
        </template>
        <template v-slot:content>
            <div class="claim-content-section d-flex align-item-center">
                <div class="d-flex align-items-center justify-content-center flex-column mr-5">
                    <div class="claim-amount-circle">
                        <div class="claim-amount-circle-inner">
                            <div class="d-flex align-items-center justify-content-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    width="100%"
                                    height="100%"
                                    :viewBox="`0 0 100 100`"
                                >
                                    <text
                                        x="50%"
                                        y="50%"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                    >${{claim.payout}}</text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="claim-status">
                        <b>Deadline&nbsp;</b>
                        {{claim.formattedDeadline}}
                    </div>
                    <div class="claim-status">
                        <b>Distributes&nbsp;</b>
                        {{claim.formattedDistro}}
                    </div>
                    <div class="claim-status">
                        <div v-if="claim.filed">
                            <span>Filed on {{claim.filedOn}}</span>
                        </div>
                        <div v-if="!claim.filed">
                            <button class="btn btn-secondary" @click="fileClaim(claim)">File</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </collapse-content>
</template>
<script lang="ts" src="./claim-content.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.claim-content-section {
    background: rgba(239, 243, 245, 0.6);
    padding: 1rem;
    box-shadow: inset 0px 0px 0px 1px rgba(186, 202, 210, 0.4);
    color: $dark-color;

    .claim-amount-circle {
        min-width: 100px;
        position: relative;
        padding: 50% 0%;
        height: 0px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: inset 0px 0px 0px 3px $primary-color;
        background: #fff;
        color: $primary-color;
        font-weight: bold;

        .claim-amount-circle-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                text {
                    fill: currentColor;
                    font-size: 1.75rem;
                }
            }
        }
    }

    .claim-status {
        padding: 0.5rem;
    }
}
</style>
