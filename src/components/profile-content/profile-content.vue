<template>
    <div>
        <content-section
            :show="state.profileObserver$"
            :equals="modelkey"
            full="false"
            setmax="false"
        >
            <div class="profile-content-section pt-1 pr-1 pb-4 pl-4">
                <h4 class="mt-1">{{translate.get(title)}}</h4>
                <div
                    class="existing-form"
                    v-if="formData.existingForms.length"
                >
                    <div v-if="modelkey === `account`">
                        <form-element :model="formData.existingForms[0]"></form-element>
                    </div>

                    <div v-if="modelkey !== `account`">
                        <collapse-element
                            v-for="(obj, $index) in formData.existingForms"
                            :key="$index"
                        >
                            <template v-slot:toggle>
                                <div>{{obj.heading}}</div>
                            </template>
                            <template v-slot:content>
                                <form-element :model="obj"></form-element>
                            </template>
                        </collapse-element>
                    </div>
                </div>
                <div
                    class="new-form"
                    v-if="formData.newForm.length"
                >
                    <form-element
                        v-for="(obj, $index) in formData.newForm"
                        :key="$index"
                        :model="obj"
                    >
                    </form-element>
                </div>
            </div>
        </content-section>
    </div>
</template>

<script lang="ts" src="./profile-content.ts"></script>

<style lang="scss">
@import "../../global.scss";

.profile-content-section {
    .collapse-element {
        margin: 1rem 0px;

        .form-element {
            margin: -2px 0px 0px;
        }
    }
}
</style>
