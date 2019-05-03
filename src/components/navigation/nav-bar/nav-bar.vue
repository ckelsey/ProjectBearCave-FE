<template>
    <nav class="navbar navbar-expand fixed-top w-100">
        <div class="d-inline-flex align-items-center justify-content-between p-0 navbar-inner">
            <company-menu></company-menu>
            <brand-element ref="brand"></brand-element>
            <account-menu></account-menu>
        </div>
    </nav>
</template>

<script lang="ts" src="./nav-bar.ts"></script>
<style lang="scss">
.navbar {
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05),
        0px 3px 15px rgba(0, 0, 0, 0.05);

    .navbar-inner {
        width: 100%;
        max-width: 1280px;
        margin: auto;

        #companyMenu,
        .account-menu .account.btn {
            padding: 0px;
        }
    }

    .navbar-brand {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
}
</style>
