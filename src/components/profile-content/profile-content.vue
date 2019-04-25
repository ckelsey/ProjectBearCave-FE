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
                    <form-element
                        v-for="(obj, $index) in formData.existingForms"
                        :key="$index"
                        :model="obj"
                        :confirmed="obj.model.SMSVerification === 1 || obj.model.confirmed === 1"
                        :existing="true"
                        :updateOnly="formData.updateOnly"
                        :submission="formSubmit"
                        :deletion="formDelete"
                        :verification="formVerify"
                    >
                    </form-element>
                </div>
                <div
                    class="new-form"
                    v-if="formData.newForm.length"
                >
                    <form-element
                        v-for="(obj, $index) in formData.newForm"
                        :key="$index"
                        :model="obj"
                        :confirmed="false"
                        :existing="false"
                        :submission="formSubmit"
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
</style>
