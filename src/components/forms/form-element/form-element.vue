<template>
    <form class="form-element">
        <div class="form-row" v-for="(row, index) in model.form" :key="index">
            <div class="form-group form-row-item" v-for="item in row" :key="item.key">
                <label v-if="item.type !== `checkbox`">
                    <span class="label-inner d-flex align-items-center">
                        <span v-html="item.label" class="label-text"></span>
                        <span class="label-error">{{item.error}}</span>
                    </span>
                </label>
                <input
                    v-if="item.type !== `file` && item.type !== `select`"
                    :type="item.type"
                    :ref="`${item.key}Input`"
                    :required="item.required"
                    @input="checkDirty"
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
                    @input="checkDirty"
                    v-model="item.value"
                >
                    <option
                        v-for="(option, index) in item.options"
                        :key="index"
                        :value="option.value || index"
                    >{{option.label || option}}</option>
                </select>
                <label v-if="item.type === `checkbox`" @click="toggleCheckbox(`${item.key}Input`)">
                    <span class="label-inner d-flex">
                        <span v-html="item.label" class="label-text"></span>
                        <span class="label-error">{{item.error}}</span>
                    </span>
                </label>
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
            <div class="d-flex align-items-center justify-content-end form-buttons-side">
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
@import "@/global/global.scss";
.form-element {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;

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
}
</style>
