<template>
    <div
        class="alert show d-flex align-items-start justify-content-between"
        role="alert"
        :class="{
            'alert-danger': status.indexOf(`danger`) > -1 || status.indexOf(`error`) > -1,
            'alert-success': status.indexOf(`success`) > -1,
            'alert-warning': status.indexOf(`warning`) > -1,
            'active':active
        }"
    >
        <div v-html="msg"></div>
        <div>
            <button
                type="button"
                class="close"
                aria-label="Close"
                @click="close"
            ><span aria-hidden="true">&times;</span></button>
        </div>
    </div>
</template>
<script lang="ts" src="./alert-message.ts"></script>
