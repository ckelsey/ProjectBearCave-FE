<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div class="app-content">
            <div id="app-content-inner">
                <!-- <about-us v-if="state.state==='about'"></about-us>
                <support-section v-if="state.state==='support'"></support-section> -->
                <content-section
                    :show="routes.home$"
                    setmax="true"
                >
                    <div class="d-flex align-items-center justify-content-center">
                        <div>
                            <h1>HOME</h1>
                            <h1>HOME</h1>
                            <h1>HOME</h1>
                            <h1>HOME</h1>
                            <h1>HOME</h1>
                        </div>
                    </div>
                </content-section>

                <content-section
                    :show="routes.login$"
                    setmax="true"
                >
                    <login-form></login-form>
                </content-section>

                <content-section
                    :show="routes.profile$"
                    setmax="true"
                >
                    <profile-dashboard></profile-dashboard>
                </content-section>
                <content-section
                    :show="routes.termsModal$"
                    setmax="true"
                >
                    <terms-service></terms-service>
                </content-section>

                <content-section
                    :show="routes.terms$"
                    setmax="true"
                >
                    <terms-conditions></terms-conditions>
                </content-section>

                <content-section
                    :show="routes.agreement$"
                    setmax="true"
                >
                    <user-agreement></user-agreement>
                </content-section>

                <content-section
                    :show="routes.privacy$"
                    setmax="true"
                >
                    <privacy-policy></privacy-policy>
                </content-section>

                <alert-message
                    :active="state.alert.active"
                    :msg="state.alert.msg"
                    :status="state.alert.status"
                    :close="state.closeAlert"
                ></alert-message>

                <modal-content
                    id="file-upload-progress"
                    ref="uploadProgress"
                >
                    <div class="d-flex align-items-center justify-content-center flex-column upload-progress-modal">
                        <h4>Upload progress</h4>
                        <div class="upload-progress-bar-container">
                            <div
                                class="upload-progress-bar"
                                :style="{width:`${uploader.progressAmount}%`}"
                            ></div>
                        </div>
                        <div class="upload-progress-text-container">
                            <div class="upload-progress-text">{{uploader}}%</div>
                        </div>
                    </div>
                </modal-content>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style lang="scss">
@import "../../global.scss";

html {
    height: 100%;

    body {
        height: 100vh;
        padding: 0rem;
        margin: 0px;
        font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        font-size: 1rem;
        box-sizing: border-box;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        .btn {
            cursor: pointer;
            border-radius: 1px;
            border: none !important;
            white-space: nowrap;
            transition: all 0.4s;
        }

        .btn-danger {
            background-color: $red;
            box-shadow: $liftedShadowLight;

            &:hover,
            &:active,
            &:focus,
            &:not(:disabled):not(.disabled):active:focus {
                background-color: lighten($red, $amount: 10);
                box-shadow: none;
                // font-size: 1.125rem;
                // margin: -0.2rem;
            }
        }

        .btn-primary {
            background-color: $primary-color;
            box-shadow: none;
            // box-shadow: $liftedShadowLight;

            &:hover,
            &:active,
            &:focus,
            &:not(:disabled):not(.disabled):active:focus {
                background-color: $dark-color;
                box-shadow: none;
                // box-shadow: $liftedShadowDark;
                // font-size: 1.125rem;
                // margin: -0.2rem;
            }
        }

        .btn-secondary {
            background-color: $highlight-color;
            box-shadow: $liftedShadowLight;

            &:hover,
            &:active,
            &:focus,
            &:not(:disabled):not(.disabled):active:focus {
                background-color: $highlight-dark-color;
                box-shadow: none;
                // font-size: 1.125rem;
                // margin: -0.2rem;
            }
        }

        .btn-link {
            color: $primary-color;

            &:hover {
                color: $dark-color;
            }
        }

        .btn-text {
            background-color: transparent;
            color: inherit;
            box-shadow: none;

            &.btn-primary {
                color: $primary-color;
            }

            &.btn-secondary {
                color: $highlight-color;
            }

            &.btn-danger {
                color: $red;
            }
        }

        .btn-text:hover,
        .btn-text:focus,
        .btn-text:active,
        .btn-text:not(:disabled):not(.disabled):active {
            background-color: transparent;
            color: inherit;
            box-shadow: none;

            &.btn-primary {
                color: $dark-color;
            }

            &.btn-secondary {
                color: $highlight-dark-color;
            }

            &.btn-danger {
                color: darken($red, 10);
            }
        }

        .dropdown-menu {
            border-radius: 1px;
            border: none;
            padding: 0rem;
            box-shadow: $liftedShadow;

            .dropdown-item {
                transition: color 0.2s, background-color 0.2s;
                padding: 0.5rem 1.5rem;
            }

            .dropdown-item:focus,
            .dropdown-item:hover {
                color: $light-color;
                text-decoration: none;
                background-color: $dark-color;
            }
        }

        .form-control {
            background-color: transparent;
        }

        .form-control:focus {
            box-shadow: inset 0px 0px 0px 1px transparentize($primary, 0.9),
                0px 0px 0px 1px rgba($primary, 0.9);
        }

        input,
        select,
        textarea,
        button {
            outline: 0 !important;
            outline-style: none;
            border-radius: 1px !important;
            border: none !important;
            box-shadow: none;
            font-size: inherit;
            font-family: inherit;
            color: inherit;
            // box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.04);
        }

        input::-moz-focus-inner {
            border: 0;
        }
        select:-moz-focusring {
            color: transparent;
            text-shadow: 0 0 0 transparent;
        }
        select:focus::-ms-value {
            background-color: transparent;
            color: transparent;
        }
        input::-moz-focus-inner {
            outline: 0;
        }

        /* Or more specifically*/
        input[type="submit"]::-moz-focus-inner,
        input[type="button"]::-moz-focus-inner {
            outline: 0;
        }
        option:not(:checked) {
            color: inherit;
        }

        option {
            font-size: 1rem;
            appearance: none;
        }

        optgroup {
            font-size: 1rem;
        }

        select::-ms-expand {
            display: none;
        }

        button.btn {
            font-weight: 700;
            text-transform: capitalize;
        }

        select,
        input,
        textarea,
        option {
            box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
            padding: 0.5rem;
            background: transparent;
            width: 100%;
            appearance: none;
        }

        input:focus,
        input:active,
        select:focus,
        select:active,
        textarea:focus,
        textarea:active,
        input.form-control:focus,
        textarea.form-control:active,
        .form-group input:focus,
        .form-group input:active,
        .form-group select:focus,
        .form-group select:active,
        .form-group textarea:focus,
        .form-group textarea:active,
        .form-group input.form-control:focus,
        .form-group input.form-control:active,
        .form-group select.form-control:focus,
        .form-group select.form-control:active,
        .form-group textarea.form-control:focus,
        .form-group textarea.form-control:active {
            background: transparent;
            box-shadow: 0px 1px 0px 0px $primary-color,
                0px 2px 0px 0px transparentize($primary-color, 0.8);
            // padding: 0.5rem;
        }

        .is-invalid input,
        .is-invalid select,
        .is-invalid textarea,
        .is-invalid button,
        input.is-invalid,
        select.is-invalid,
        textarea.is-invalid,
        button.is-invalid,
        .is-invalid input:focus,
        .is-invalid select:focus,
        .is-invalid textarea:focus,
        .is-invalid button:focus,
        input.is-invalid:focus,
        select.is-invalid:focus,
        textarea.is-invalid:focus,
        button.is-invalid:focus,
        .is-invalid input:active,
        .is-invalid select:active,
        .is-invalid textarea:active,
        .is-invalid button:active,
        input.is-invalid:active,
        select.is-invalid:active,
        textarea.is-invalid:active,
        button.is-invalid:active {
            box-shadow: 0px 1px 0px 0px transparentize($red, 0.5);
            color: $red;
        }

        input[type="checkbox"] {
            width: 0px;
            height: 0px;
            opacity: 0;
            padding: 0px;
            margin: 0px;
            pointer-events: none;
            position: absolute;
        }

        input[type="checkbox"] + label {
            align-items: flex-start;
            cursor: pointer;

            &:before {
                content: "";
                width: 0px;
                height: 0px;
                display: inline-block;
                padding: 0.5rem;
                box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
                position: relative;
                left: 1px;
                margin-right: 1rem;
                margin-top: 0.25rem;
                border-radius: 1px;
                cursor: pointer;
                transition: box-shadow 0.2s ease-in-out,
                    background-color 0.2s ease-in-out;
            }

            .checkbox-label {
                font-weight: bold;
                display: block;
            }

            .checkbox-message {
                font-size: 80%;
            }
        }

        input[type="checkbox"]:checked + label:before,
        input[type="checkbox"]:checked + label:before {
            box-shadow: inset 0px 0px 0px 1px transparentize($primary, 0.9),
                0px 0px 0px 1px rgba($primary, 0.9);
            background-color: $primary;
        }

        input[type="file"] {
            box-shadow: none !important;
            padding: 1rem 0px;
        }

        label {
            display: flex;
            align-items: center;
            margin: 0rem;
        }

        .label-error {
            font-size: 80%;
            color: $red;
            padding: 0rem 0.5em;
            font-weight: normal;
        }

        .form-group-bottom {
            margin-top: 3rem;
        }

        .form-group {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }

        .icon-lg {
            font-size: 1.75rem;
        }

        i {
            font-style: italic;
        }

        .list-item,
        a.list-item {
            user-select: none;
            color: inherit;
            padding: 1rem;
            text-decoration: none;
            transition: padding 0.2s ease-in-out, color 0.2s ease-in-out,
                background-color 0.2s ease-in-out;

            &.highlight,
            &:hover,
            &:focus,
            &:active {
                text-decoration: none;
                background-color: $primary;
                color: $white;
            }
        }

        a {
            cursor: pointer;
        }

        .form-row {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
            flex-wrap: wrap;
            width: calc(100% + 3rem);
            margin: 0rem 0rem 0rem -3rem;

            .form-row-item {
                flex-grow: 1;
                margin: 0px;
                padding-left: 3rem;
                max-width: 500px;
                min-width: 200px;
            }
        }

        .color-primary,
        .color-hover-primary:hover {
            color: $primary;
        }

        .color-hover-primary:hover {
            transition: all 0.2s;
        }

        .color-dark {
            color: $dark-color;
        }

        .color-danger {
            color: $red;
        }

        .alert {
            max-width: 86%;
            position: fixed;
            top: -200px;
            left: 7%;
            width: 100%;
            box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.11);
            border: none;
            border-radius: 1px;
            opacity: 0;
            user-select: none;
            pointer-events: none;
            transition: opacity 0.2s, top 0.2s, box-shadow 0.2s;

            &.active {
                pointer-events: all;
                opacity: 1;
                top: 11vh;
                box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.11),
                    inset 0px -1px 0px rgba(0, 0, 0, 0.2),
                    0px 10px 35px rgba(0, 0, 0, 0.13);
            }
        }

        .content-pane-container {
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
        }

        .content-pane {
            position: relative;
            min-width: calc(100% + 90px);
            min-height: 100%;
            opacity: 1;
            padding: 0px 45px;
            left: -45px;
            transition: left 0.4s, opacity 0.4s;
        }

        .has-clarence {
            padding-bottom: 75px;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-weight: bold;
        }

        h1 {
            margin-bottom: 2rem;
        }

        h2 {
            margin-bottom: 1.5rem;
        }

        #app {
            height: 100vh;
        }

        .app-content {
            height: 100vh;
            padding-top: 70px;
            backface-visibility: hidden;
            opacity: 1;
            filter: blur(0);
            transform-origin: 50% 85%;
            transform: translateX(0rem) translateZ(0) scale3d(1, 1, 1);
            transition: transform 0.4s ease-in-out 0.2s,
                opacity 0.4s ease-in-out 0.2s, filter 0.4s ease-in-out 0.2s;
        }

        #app-content-inner {
            overflow: hidden;
            height: calc(100vh - 70px);
            width: 100vw;
            position: relative;

            .upload-progress-modal {
                max-width: 500px;
                width: 90vw;
                color: $dark-color;
                position: relative;
                padding: 1rem;

                .upload-progress-bar-container {
                    width: 100%;
                    position: relative;
                    height: 15px;
                    margin: 0.5rem 0rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: $medium-light-gray;

                    .upload-progress-bar {
                        height: 100%;
                        width: 1px;
                        background-color: $primary-color;
                        transition: width 0.2s;
                    }
                }
            }
        }

        .close-before {
            display: flex;
            align-items: center;
            justify-content: center;
            &:before {
                content: "\00D7";
                display: block;
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: currentColor;
                font-weight: bold;
                font-size: 22px;
                margin-right: 0.25rem;
                line-height: 22px;
                font-family: sans-serif;
                margin-top: -4px;
            }
        }

        .checkmark-before {
            display: flex;
            align-items: center;
            justify-content: center;

            &:before {
                content: "\2713";
                display: block;
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: currentColor;
                font-weight: bold;
                font-size: 17px;
                margin-right: 0.25rem;
                line-height: 17px;
                font-family: sans-serif;
            }
        }

        .pointer {
            cursor: pointer;
        }

        .form-button:empty {
            display: none;
        }
    }

    * {
        box-sizing: border-box;
        color: inherit;
        font: inherit;
        backface-visibility: hidden;
    }
}
</style>
