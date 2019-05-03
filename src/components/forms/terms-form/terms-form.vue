<template>
    <div id="terms-of-service">
        <div id="tos-inner">
            <h1 class="p-2 mb-0">Hey there, you'll need to agree to the terms to continue.</h1>

            <form-element :model="formData.newForm[0]" v-if="formData.newForm[0]" class="p-2"></form-element>

            <div class="d-flex">
                <a href="/terms" class="p-2">Terms</a>
                <a href="/privacy" class="p-2">Privacy</a>
                <a href="/agreement" class="p-2">User agreement</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./terms-form.ts"></script>

<style lang="scss">
#terms-of-service {
    width: 100%;
    background: #fff;
}
</style>

