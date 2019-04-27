<template>
    <div>
        <div class="profile-header">
            <div class="d-flex align-items-center">
                <h1 class="flex-fill">{{t.get(`profileHeader`)}} {{userFirstName}}!</h1>
                <profile-stats></profile-stats>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
