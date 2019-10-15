<template>
    <div id="profile-dash">
        <section id="profile-content">
            <profile-header :profileState$="profileState$"></profile-header>
            <list-to-sidebar :show$="profileState$" :tabs="Tabs" collapseLabel="true" class="mt-2">
                <slide-vertical
                    class="profile-content"
                    v-for="tab in Tabs"
                    :key="tab.key"
                    :show$="profileState$"
                    :equals="tab.key"
                >
                    <profile-content
                        :model="tab"
                        :profileState$="profileState$"
                    ></profile-content>
                    <!-- <profile-content
                        :modelkey="tab.key"
                        :title="tab.name"
                        :newFormText="tab.newFormText"
                        :profileState$="profileState$"
                        :noContentMarkup="tab.noContentMarkup"
                    ></profile-content>-->
                </slide-vertical>
            </list-to-sidebar>
        </section>

        <!-- <modal-content ref="verifyModal">
            <div class="verify-number-form">
                <div class="form-group">
                    <label>Verification number</label>
                    <input
                        type="number"
                        ref="verifyNumber"
                    >
                </div>
                <div class="form-group">
                    <button
                        class="btn btn-secondary"
                        @click="verifySMS($event)"
                    >Verify</button>
                </div>
            </div>
        </modal-content>-->
    </div>
</template>

<script lang="ts" src="./profile-page.ts"></script>
<style lang="scss">
#profile-content {
    .list-to-sidebar-tab-content {
        position: relative;
    }
}
</style>


