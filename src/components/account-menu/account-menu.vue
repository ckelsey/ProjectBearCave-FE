<template>
    <div class="account-menu">
        <button
            v-if="!hasUser"
            ref="signin"
            class="btn btn-primary"
            @click="state.state = `login`"
        >Sign in</button>
        <button
            v-if="hasUser"
            @click="state.state = `account`"
            class="btn btn-link d-inline-flex align-items-center size-125"
        >
            <font-awesome-icon icon="user-circle" /></button>
    </div>
</template>
<script lang="ts" src="./account-menu.ts"></script>
