<template>
    <form class="form-element">
        <div
            class="form-row"
            v-for="(row, index) in model.form"
            :key="index"
        >
            <div
                class="form-group form-row-item"
                v-for="item in row"
                :key="item.key"
            >
                <label v-if="item.type !== `checkbox`">{{item.label}}<span class="label-error">{{item.error}}</span></label>
                <input
                    v-if="item.type !== `file` && item.type !== `select`"
                    :type="item.type"
                    :ref="`${item.key}Input`"
                    :required="item.required"
                    v-model="item.value"
                >
                <input
                    v-if="item.type === `file`"
                    :type="item.type"
                    :ref="`${item.key}Input`"
                    :required="item.required"
                    @change="addFile(item, $event)"
                >
                <select
                    v-if="item.type === `select`"
                    :type="item.type"
                    :ref="`${item.key}Input`"
                    :required="item.required"
                    v-model="item.value"
                >
                    <option
                        v-for="(option, index) in item.options"
                        :key="index"
                        :value="option.value || index"
                    >{{option.label || option}}</option>
                </select>
                <label
                    v-if="item.type === `checkbox`"
                    @click="toggleCheckbox(`${item.key}Input`)"
                >{{item.label}}<span class="label-error">{{item.error}}</span></label>
            </div>
        </div>

        <div class="d-flex align-items-center mt-4">
            <div>
                <button
                    class="btn btn-secondary"
                    @click="submit($event)"
                >{{!existing && !updateOnly ? `add` : `update`}}</button>
            </div>
            <div
                class="pl-4"
                v-if="existing && !updateOnly"
            >
                <button
                    class="btn btn-danger"
                    @click="del($event)"
                >Delete</button>
            </div>
            <div
                class="pl-4 color-primary"
                v-if="confirmed && existing && !updateOnly"
            >
                <span>
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>&nbsp;Verified
                </span>
            </div>
            <div
                class="pl-4"
                v-if="!confirmed && existing && !updateOnly && canSMSVerify"
            >
                <button
                    class="btn btn-primary"
                    @click="verify($event)"
                >Verify SMS</button>
            </div>
            <div
                class="fpl-4 color-red"
                v-if="!confirmed && existing && !updateOnly"
            >
                <span class="pl-4">
                    <font-awesome-icon icon="times-circle"></font-awesome-icon>&nbsp;Not verified
                </span>
            </div>
        </div>
    </form>
</template>
<script lang="ts" src="./form-element.ts"></script>
<style lang="scss">
@import "../../global.scss";
.form-element {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 1rem;
    background: rgba(239, 243, 245, 0.6);
    margin: 1rem 0rem;
    box-shadow: inset 0px 0px 0px 1px rgba(186, 202, 210, 0.4);
}
</style>
