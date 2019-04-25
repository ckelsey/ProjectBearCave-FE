<template>
    <div id="profile-dash">
        <section
            id="profile-content"
            :class="classes"
        >
            <profile-header></profile-header>
            <div class="profile-content pt-3">
                <profile-tabs></profile-tabs>
                <div class="profile-tab-content">

                    <profile-content
                        modelkey="account"
                        title="Account settings"
                    ></profile-content>

                    <profile-content
                        modelkey="phoneNumbers"
                        title="Phone numbers"
                    ></profile-content>

                    <profile-content
                        modelkey="address"
                        title="Addresses"
                    ></profile-content>

                    <profile-content
                        modelkey="employment"
                        title="Employment history"
                    ></profile-content>

                    <profile-content
                        modelkey="vehicle"
                        title="Vehicles"
                    ></profile-content>
                </div>
            </div>

        </section>

        <modal-content ref="verifyModal">
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
        </modal-content>
    </div>
</template>

<script lang="ts" src="./profile-dashboard.ts"></script>
<style lang="scss">
@import "../../global.scss";

#profile-dash {
    #profile-content {
        .profile-content {
            display: flex;
        }

        .profile-tabs {
            width: 35px;

            .profile-toggle-item.toggle-off {
                opacity: 0;
                width: 0px;
                overflow: hidden;
            }
        }

        .profile-tab-content {
            width: 100%;
        }

        &.show-none {
            .profile-toggle {
                padding: 1rem;
            }
            .profile-toggle-item.toggle-off {
                opacity: 1;
                width: 100%;
            }

            .profile-tabs {
                width: 100%;
            }

            .profile-tab-content {
                width: 0px;
            }
        }
    }
}
</style>

