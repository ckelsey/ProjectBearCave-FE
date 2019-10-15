<template>
    <div>
        <input type="file" @change="upload">
        <div>{{error}}</div>
        <div>{{progress}}%</div>
    </div>
</template>
<script lang="ts" src="./upload-test.ts"></script>
