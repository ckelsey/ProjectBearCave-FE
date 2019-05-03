<template>
    <div class="company-menu">
        <a
            class="btn btn-link d-inline-flex align-items-center icon-lg"
            id="companyMenu"
            href=""
            ref="panelToggler"
            @click="togglePanel($event)"
        >
            <font-awesome-icon icon="bars" />
        </a>

        <side-panel
            direction="left"
            ref="panel"
            v-bind:toggler="getPanelToggler"
        >
            <a
                class="list-item"
                :class="state.state === `about`?`highlight`:``"
                href="/about"
                @click="goTo($event, `about`)"
            >About us</a>
            <a
                class="list-item"
                :class="state.state === `support`?`highlight`:``"
                href="/support"
                @click="goTo($event, `support`)"
            >Support</a>
            <a
                class="list-item"
                :class="state.state === `terms`?`highlight`:``"
                href="/terms"
                @click="goTo($event, `terms`)"
            >Terms</a>
            <a
                class="list-item"
                :class="state.state === `privacy`?`highlight`:``"
                href="/privacy"
                @click="goTo($event, `privacy`)"
            >Privacy</a>
            <a
                class="list-item"
                :class="state.state === `agreement`?`highlight`:``"
                href="/agreement"
                @click="goTo($event, `agreement`)"
            >User agreement</a>
        </side-panel>
    </div>
</template>

<script lang="ts" src="./company-menu.ts"></script>

<style lang="scss">
.company-menu {
    .side-panel {
        a {
            display: block;
            cursor: pointer;
        }
    }
}
</style>
