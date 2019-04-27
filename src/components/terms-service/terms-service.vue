<template>
    <div
        id="terms-of-service"
    >
        <div id="tos-inner">
            <h1 class="p-2">Hey there, you'll need to agree to the terms to continue.</h1>
            <div class="form-group p-2">

                <input
                    class="form-control"
                    type="checkbox"
                    name="agentConsent"
                    id="agentConsent"
                    v-model="consent.agent.value"
                >
                <label for="agentConsent" @click="clickLabel('agent')">
                    <span>
                        <span class="checkbox-label">Allow {{constants.companyName}} to be your agent<span class="label-error">{{consent.agent.error}}</span></span>
                        <span class="checkbox-message">
                            An 'agent' is someone who works on your behalf.
                            In this context, it lets me file your claims,
                            and keep an eye on any court activity that might affect you.
                        </span>
                    </span>
                </label>

            </div>
            <div class="form-group p-2">

                <input
                    class="form-control"
                    type="checkbox"
                    name="assigneeConsent"
                    id="assigneeConsent"
                    v-model="consent.assignee.value"
                >
                <label for="assigneeConsent" @click="clickLabel('assignee')">
                    <span>
                        <span class="checkbox-label">Allow {{constants.companyName}} to be your assignee<span class="label-error">{{consent.assignee.error}}</span></span>
                        <span class="checkbox-message">
                            An 'assignee' is someone you designate to receive something.
                            In this case, it gives my creators the legal right to
                            collect payments for you.
                        </span>
                    </span>
                </label>

            </div>

            <div class="form-group p-2">
                <button
                    class="btn btn-secondary"
                    ref="submit"
                    @click="accept()"
                    type="button"
                >Submit</button>
            </div>

            <div class="d-flex">
                <a
                    href="#"
                    @click="goToTerms($event)"
                    class="p-2"
                >Terms</a>
                <a
                    href="#"
                    @click="goToPrivacy($event)"
                    class="p-2"
                >Privacy</a>
                <a
                    href="#"
                    @click="goToUserAgreement($event)"
                    class="p-2"
                >User agreement</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./terms-service.ts"></script>

<style lang="scss">
#terms-of-service {
    width: 100%;
    background: #fff;
}
</style>

