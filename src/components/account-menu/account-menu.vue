<template>
    <div class="account-menu">
        <div v-show="userReady">
            <button
                v-if="!loggedIn"
                ref="signin"
                class="btn btn-primary"
                @click="state.state = `login`"
            >Sign in</button>
            <div v-if="loggedIn" class="d-flex justify-content-end">
                <button
                    class="account btn btn-link d-inline-flex align-items-center icon-lg"
                    ref="panelToggler"
                >
                    <font-awesome-icon icon="user-circle" />
                </button>
                <panel-content
                    direction="right"
                    ref="panel"
                    v-bind:toggler="getPanelToggler"
                >
                    <a
                        class="list-item"
                        :class="state.state === `profile` ? `highlight` : `` "
                        href="/profile"
                        @click="goToProfile($event)"
                    >Profile</a>
                    <a
                        class="list-item"
                        :class="state.state === `claims` ? `highlight` : `` "
                        href="/wallet"
                        @click="goToClaims($event)"
                    >Claims</a>
                    <a
                        class="list-item"
                        :class="state.state === `wallet` ? `highlight` : `` "
                        href="/wallet"
                        @click="goToWallet($event)"
                    >Wallet</a>
                    <a
                        class="list-item"
                        href="/"
                        @click="logout($event)"
                    >Logout</a>
                </panel-content>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./account-menu.ts"></script>
<style lang-"scss"></style>
