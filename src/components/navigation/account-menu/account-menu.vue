<template>
    <div class="account-menu">
        <button
            v-if="!loggedIn"
            ref="signin"
            class="btn btn-primary"
            @click="goTo($event, `login`)"
        >Sign in</button>
        <div v-if="loggedIn" class="d-flex justify-content-end">
            <button
                class="account btn btn-link d-inline-flex align-items-center icon-lg"
                ref="panelToggler"
            >
                <font-awesome-icon icon="user-circle"/>
            </button>
            <span class="badge-element">{{claimCount}}</span>
            <side-panel direction="right" ref="panel" v-bind:toggler="getPanelToggler">
                <a
                    v-for="item in menu"
                    :key="item"
                    class="list-item"
                    href="/profile"
                    :class="route === item ? `highlight` : `` "
                    @click="goTo($event, item)"
                >{{item}}</a>
                <a class="list-item" href="/" @click="logout($event)">Logout</a>
            </side-panel>
        </div>
    </div>
</template>
<script lang="ts" src="./account-menu.ts"></script>
<style lang="scss">
.account-menu {
    .list-item {
        text-transform: capitalize;
    }
}
</style>

