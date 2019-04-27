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

        <div class="d-flex align-items-center justify-content-between w-100 mt-4">
            <div class="d-flex align-items-center justify-content-start">
                <div
                    v-for="(item, index) in leftButtons"
                    :key="index"
                    class="pr-2 form-button"
                    :class="item.position"
                >
                    <button
                        v-if="item.type === `button` && item.condition"
                        class="btn"
                        :class="item.classes"
                        @click="item.action($event, model.form)"
                    >{{item.label}}</button>
                    <span
                        v-if="item.type === `text` && item.condition"
                        :class="item.classes"
                        v-html="item.label"
                        @click="item.action($event, model.form)"
                    ></span>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-end">
                <div
                    v-for="(item, index) in rightButtons"
                    :key="index"
                    class="pl-2 form-button"
                    :class="item.position"
                >
                    <button
                        v-if="item.type === `button` && item.condition"
                        class="btn"
                        :class="item.classes"
                        @click="item.action($event, model.form)"
                    >{{item.label}}</button>
                    <span
                        v-if="item.type === `text` && item.condition"
                        :class="item.classes"
                        v-html="item.label"
                        @click="item.action($event, model.form)"
                    ></span>
                </div>
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
