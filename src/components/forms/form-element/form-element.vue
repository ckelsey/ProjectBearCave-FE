<template>
    <form class="form-element" v-if="model" @submit="submit($event)" action="#">
        <div class="form-row" v-for="(row, index) in model.form" :key="index">
            <div class="form-group form-row-item" v-for="item in row" :key="item.key">
                <div v-if="item.showIf">
                    <label v-if="item.fieldType !== `checkbox`">
                        <span class="label-inner d-flex align-items-center">
                            <span v-html="item.label" class="label-text"></span>
                            <span class="label-error">{{item.error}}</span>
                        </span>
                    </label>
                    <input
                        v-if="item.fieldType !== `file` && item.fieldType !== `select`"
                        :type="item.fieldType"
                        :ref="`${item.key}Input`"
                        :required="item.required"
                        @input="checkDirty"
                        v-model="item.value"
                    >
                    <input
                        v-if="item.fieldType === `file`"
                        :type="item.fieldType"
                        :ref="`${item.key}Input`"
                        :required="item.required"
                        @change="addFile(item, $event)"
                    >
                    <select
                        v-if="item.fieldType === `select`"
                        :type="item.fieldType"
                        :ref="`${item.key}Input`"
                        :required="item.required"
                        @input="checkDirty"
                        v-model="item.value"
                    >
                        <option
                            v-for="(option, index) in item.options"
                            :key="index"
                            :value="option.value || index"
                        >{{option.label || option}}</option>
                    </select>
                    <label
                        v-if="item.fieldType === `checkbox`"
                        @click="toggleCheckbox(`${item.key}Input`)"
                    >
                        <span class="label-inner d-flex">
                            <span v-html="item.label" class="label-text"></span>
                            <span class="label-error">{{item.error}}</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-between w-100 mt-2 form-buttons">
            <div class="d-flex align-items-center justify-content-start form-buttons-side">
                <div
                    v-for="(item, index) in leftButtons"
                    :key="index"
                    class="pr-2 form-button"
                    :class="item.position"
                >
                    <button
                        v-if="item.type === `button` && item.showIf"
                        class="btn"
                        :class="item.classes"
                        @click="item.action($event, model.form)"
                    >{{item.label}}</button>
                    <span
                        v-if="item.type === `text` && item.showIf"
                        :class="item.classes"
                        v-html="item.label"
                        @click="item.action($event, model.form)"
                    ></span>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-end form-buttons-side">
                <div
                    v-for="(item, index) in rightButtons"
                    :key="index"
                    class="pl-2 form-button"
                    :class="item.position"
                >
                    <button
                        v-if="item.type === `button` && item.showIf"
                        class="btn"
                        :class="item.classes"
                        @click="item.action($event, model.form)"
                    >{{item.label}}</button>
                    <span
                        v-if="item.type === `text` && item.showIf"
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
@import "@/global/global.scss";
.form-element {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;

    .form-buttons {
        flex-wrap: wrap;

        .form-buttons-side {
            flex-wrap: wrap;

            .form-button {
                white-space: nowrap;
                margin: 0.5rem 0rem;
            }
        }
    }

    .label-inner {
        white-space: nowrap;
        flex-wrap: nowrap;
        font-size: 90%;
    }

    .label-text {
        opacity: 0.62;
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

            &:empty {
                display: none;
            }
        }
    }

    .form-button:empty {
        display: none;
    }
}
</style>
