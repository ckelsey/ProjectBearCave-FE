<template>
    <div>
        <h1>You have {{claims.openClaims.length}} open claims</h1>

        <div v-if="claims.unfiledClaims.length" class="claim-section-content">
            <collapse-content>
                <template v-slot:toggle>
                    <div
                        class="claim-section-header d-flex align-items-center justify-content-between w-100"
                    >
                        <div class="d-flex align-items-center justify-content-start">
                            Pre-qualified&nbsp;
                            <span
                                class="badge-element static"
                            >{{claims.unfiledClaims.length}}</span>
                        </div>
                        <b>${{claims.unfiledClaimsAmount}}</b>
                    </div>
                </template>
                <template v-slot:content>
                    <div>
                        <claim-content
                            v-for="(claim, $index) in claims.unfiledClaims"
                            :key="$index"
                            :claim="claim"
                        ></claim-content>
                    </div>
                </template>
            </collapse-content>
        </div>
        <div v-if="claims.filedClaims.length" class="claim-section-content">
            <collapse-content>
                <template v-slot:toggle>
                    <div
                        class="claim-section-header d-flex align-items-center justify-content-between w-100"
                    >
                        <div class="d-flex align-items-center justify-content-start">
                            Filed&nbsp;
                            <span
                                class="badge-element static color-dark"
                            >{{claims.completedClaims.length}}</span>
                        </div>
                        <b>${{claims.filedClaimsAmount}}</b>
                    </div>
                </template>
                <template v-slot:content>
                    <div>
                        <claim-content
                            v-for="(claim, $index) in claims.filedClaims"
                            :key="$index"
                            :claim="claim"
                        ></claim-content>
                    </div>
                </template>
            </collapse-content>
        </div>

        <div v-if="claims.completedClaims.length" class="claim-section-content">
            <collapse-content>
                <template v-slot:toggle>
                    <div
                        class="claim-section-header d-flex align-items-center justify-content-between w-100"
                    >
                        <div class="d-flex align-items-center justify-content-start">
                            Completed&nbsp;
                            <span
                                class="badge-element static color-dark"
                            >{{claims.completedClaims.length}}</span>
                        </div>
                        <b>${{claims.completedClaimsAmount}}</b>
                    </div>
                </template>
                <template v-slot:content>
                    <div>
                        <claim-content
                            v-for="(claim, $index) in claims.completedClaims"
                            :key="$index"
                            :claim="claim"
                        ></claim-content>
                    </div>
                </template>
            </collapse-content>
        </div>
    </div>
</template>
<script lang="ts" src="./claims-page.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.claim-section-container {
    flex-wrap: wrap;
}

.claim-section-column {
    min-width: 200px;
    flex-grow: 1;
    flex-basis: 0;
}

.claim-section-header {
    font-size: 1.15rem;
    font-weight: bold;
}

.claim-section-content {
    margin: 0rem 0rem 1rem;
}
</style>
