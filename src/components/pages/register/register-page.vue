<template>
    <div class="register-form d-flex align-items-center justify-content-center">
        <h2 id="register-message" class="w-100">Register</h2>
        <form-element :model="formData.newForm[0]" v-if="formData.newForm[0]"></form-element>
    </div>
</template>

<script lang="ts" src="./register-page.ts"></script>

<style lang="scss">
.register-form {
    flex-direction: column;
    max-width: 450px;
    margin: auto;
    padding: 0rem 0rem 4rem;
    min-height: 100%;
}
</style>
