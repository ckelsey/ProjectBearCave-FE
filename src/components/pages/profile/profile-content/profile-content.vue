<template>
    <div class="profile-content-section pt-1 pr-1 pb-4 pl-4">
        <div class="profile-content-header d-flex align-items-center justify-content-between mb-3">
            <bread-crumbs :breadCrumbs$="breadCrumbs$"></bread-crumbs>
            <button
                class="btn btn-primary btn-circle"
                v-if="modelkey !== `account`"
                @click="updateBreadCrumbs({})"
            >
                <span class="btn-circle-inner">
                    <font-awesome-icon icon="plus"></font-awesome-icon>
                </span>
            </button>
        </div>
        <div class="profile-content-container">
            <div
                v-if="modelkey === `account` && formData.existingForms[0]"
                class="profile-content-container-inner account-form"
            >
                <form-element :model="formData.existingForms[0]"></form-element>
            </div>
            <div v-if="modelkey !== `account`" class="profile-content-container-inner">
                <slide-horizontal
                    :show$="formState$"
                    :equals="false"
                    ref="list"
                    class="content-list"
                >
                    <div
                        class="profile-content-list-item d-flex align-items-center justify-content-between"
                        v-for="(obj, $index) in formData.existingForms"
                        :key="$index"
                        @click="updateBreadCrumbs(obj)"
                    >
                        <span>{{obj.heading}}</span>
                        <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                    </div>
                </slide-horizontal>

                <slide-horizontal
                    :show$="formState$"
                    :equals="true"
                    ref="form"
                    class="content-form"
                >
                    <form-element :model="currentForm"></form-element>
                </slide-horizontal>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./profile-content.ts"></script>

<style lang="scss">
.profile-content-list-item {
    cursor: pointer;
    color: #25274d;
    padding: 1rem 0.5rem;
    box-shadow: 0px 1px 0px 0px rgba(37, 39, 77, 0.1);
    transition: color 0.4s, padding 0.4s;
}

.profile-content-container-inner {
    position: relative;
    overflow: hidden;
}
</style>
