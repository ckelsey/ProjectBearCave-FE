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

        <panel-content
            direction="left"
            ref="panel"
            v-bind:toggler="getPanelToggler"
        >
            <a
                class="list-item"
                :class="state.state === `about`?`highlight`:``"
                href="/about"
                @click="goToAbout($event)"
            >About us</a>
            <a
                class="list-item"
                :class="state.state === `support`?`highlight`:``"
                href="/support"
                @click="goToSupport($event)"
            >Support</a>
        </panel-content>
    </div>
</template>

<script lang="ts" src="./company-menu.ts"></script>

<style lang="scss">
.company-menu {
    .panel-content {
        a {
            display: block;
            cursor: pointer;
        }
    }
}
</style>
