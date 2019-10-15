<template>
    <div class="login-form d-flex align-items-center justify-content-center">
        <h2 id="login-message" class="w-100">Welcome back</h2>
        <form-element :model="formData"></form-element>
    </div>
</template>

<script lang="ts" src="./login-page.ts"></script>

<style lang="scss">
.login-form {
    flex-direction: column;
    max-width: 450px;
    margin: auto;
    padding: 0rem 0rem 4rem;
    min-height: 100%;
}
</style>
