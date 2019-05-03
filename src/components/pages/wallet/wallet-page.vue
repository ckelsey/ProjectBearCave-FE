<template>
    <div class="wallet-section">
        <h1>Bear better have ma money</h1>
        <div class="wallet-graph">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                width="100%"
                height="200px"
                :viewBox="`0 0 ${points.x2} ${points.y2}`"
            >
                <polyline :points="points.points"></polyline>
            </svg>
        </div>

        <div class="wallet-transactions">
            <div
                v-for="(claim, index) in historyList"
                :key="index"
                class="wallet-transaction-item w-100 d-flex align-items-center justify-content-between"
            >
                <div>{{claim.formattedTransacted}}</div>
                <div class="wallet-amounts d-flex align-items-center justify-content-between">
                    <div>
                        <b v-if="claim.deduct">-</b>
                        <b v-if="claim.deposit">+</b>
                        ${{claim.payout}}
                    </div>
                    <div class="wallet-balance">${{claim.inWallet}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./wallet-page.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.wallet-section {
    svg {
        transform: scale(1, -1);
        polyline {
            stroke: $primary-color;
            fill: none;
            stroke-width: 2px;
        }
    }

    .wallet-transactions{
        padding: 3rem 0px;
    }

    .wallet-transaction-item {
        padding: 0.5rem;
        background: rgba(239, 243, 245, 0.6);
        box-shadow: inset 0px 0px 0px 1px rgba(186, 202, 210, 0.4);
        color: $dark-color;
    }

    .wallet-balance {
        color: $primary-color;
        text-align: right;
    }

    .wallet-amounts {
        width: 30%;
        max-width: 120px;
    }
}
</style>
