<template>
    <div class="profile-header mb-4">
        <h1 class="flex-fill">{{t.get(`profileHeader`)}} {{userFirstName}}!</h1>
        <profile-stats :profileState$="profileState$"></profile-stats>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
