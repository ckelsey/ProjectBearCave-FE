<template>
    <div class="login-register-form">
        <form
            :class="formState"
            ref="form"
        >
            <div
                class="login-form"
                ref="loginForm"
            >
                <div class="form-inner">
                    <h2 id="login-message">Welcome back</h2>
                    <div
                        v-for="field in formData"
                        v-bind:key="field.name"
                        :id="`field-${field.name}`"
                    >

                        <div
                            class="form-group"
                            v-if="!field.register"
                            :class="{'is-invalid':!field.validation.valid}"
                        >

                            <label :for="field.name">{{field.label}} <span class="label-error">{{field.validation.reason.join(`, `)}}</span></label>

                            <input
                                class="form-control"
                                :type="field.inputType"
                                :name="`login-${field.name}`"
                                :id="`login-${field.name}`"
                                :ref="field.name"
                                :autocomplete="field.name.indexOf(`email`) > -1 ? `email` : field.name.toLowerCase().indexOf(`password`) > -1 ? `password` : field.name === `fname` ? `first name`:`last name`"
                                v-model="field.value"
                                @keyup.enter="loginRegister"
                            >

                        </div>
                    </div>
                    <div class="form-group-bottom d-flex align-items-center justify-content-between">

                        <button
                            class="btn btn-secondary"
                            ref="submit"
                            @click="loginRegister"
                            type="button"
                        >Login</button>

                        <div class="form-bottom-right">
                            <span
                                @click="switchForm(`register`)"
                                class="btn btn-link form-collapse"
                            >Need an account?</span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="register-form"
                ref="registerForm"
            >

                <div class="form-inner">
                    <h2 id="register-message">Register and stuff</h2>

                    <div
                        v-for="field in formData"
                        v-bind:key="field.name"
                        :id="`field-${field.name}`"
                    >
                        <div
                            class="form-group"
                            :class="{'is-invalid':!field.validation.valid}"
                        >
                            <label :for="field.name">{{field.label}}<span class="label-error">{{field.validation.reason.join(`, `)}}</span></label>
                            <input
                                class="form-control"
                                :type="field.inputType"
                                :name="`register-${field.name}`"
                                :id="`register-${field.name}`"
                                :ref="field.name"
                                :autocomplete="field.name.indexOf(`email`) > -1 ? `email` : field.name.toLowerCase().indexOf(`password`) > -1 ? `password` : field.name === `fname` ? `first name`:`last name`"
                                v-model="field.value"
                                @keyup.enter="loginRegister"
                            >

                        </div>
                    </div>
                    <div class="form-group-bottom">
                        <div class="form-group">

                            <input
                                class="form-control"
                                type="checkbox"
                                name="agentConsent"
                                id="agentConsent"
                                v-model="consent.agent.value"
                            >
                            <label for="agentConsent">
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
                        <div class="form-group">

                            <input
                                class="form-control"
                                type="checkbox"
                                name="assigneeConsent"
                                id="assigneeConsent"
                                v-model="consent.assignee.value"
                            >
                            <label for="assigneeConsent">
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
                    </div>
                    <input
                        class="enigma"
                        type="checkbox"
                        name="enigma"
                        id="enigma"
                        v-model="enigma"
                    >
                    <div class="form-group-bottom d-flex align-items-center justify-content-between">
                        <button
                            class="btn btn-secondary"
                            ref="submit"
                            @click="loginRegister"
                            type="button"
                        >Register</button>

                        <div class="form-bottom-right">
                            <span
                                @click="switchForm(`login`)"
                                class="btn btn-link form-collapse"
                            >Have an account?</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" src="./login-form.ts"></script>

<style lang="scss">
.login-register-form {
    max-width: 500px;
    margin: auto;
    padding: 3rem 0rem 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .login-form {
        opacity: 1;
        height: 0%;
        overflow: hidden;
        max-height: 0px;
        transform: rotate3d(0, 1, 0, 0deg);
        transition: opacity 0.2s, transform 0.2s;
    }

    .register-form {
        opacity: 0;
        height: 0%;
        overflow: hidden;
        max-height: 0px;
        transform: rotate3d(0, 1, 0, 90deg);
        transition: opacity 0.2s, transform 0.2s;
    }

    .show-login {
        .login-form {
            height: auto;
            overflow: visible;
            max-height: unset;
            opacity: 1;
            transform: rotate3d(0, 1, 0, 0deg);
        }

        .register-form {
            height: 0%;
            overflow: hidden;
            max-height: 0px;
            opacity: 0;
            transform: rotate3d(0, 1, 0, 90deg);
        }
    }

    .show-register {
        .login-form {
            height: 0%;
            overflow: hidden;
            max-height: 0px;
            opacity: 0;
            transform: rotate3d(0, 1, 0, 90deg);
        }

        .register-form {
            height: auto;
            overflow: visible;
            max-height: unset;
            opacity: 1;
            transform: rotate3d(0, 1, 0, 0deg);
        }
    }
}
</style>
