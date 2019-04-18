<template>
    <div
        class="content-section"
        id="profile-dash"
    >
        <section class="content-section-inner">
            <h1>Hey there {{userFirstName}}!</h1>
            <p>Here are some things to do</p>
        </section>
        <profile-email></profile-email>
        <profile-address></profile-address>
        <profile-phone></profile-phone>
        <profile-employment></profile-employment>
        <profile-vehicle></profile-vehicle>
    </div>
</template>

<script lang="ts" src="./profile-dashboard.ts"></script>
<style lang="scss">
#profile-dash {
    .btn[data-toggle] {
        width: 100%;
        text-align: left;
    }
}
</style>

