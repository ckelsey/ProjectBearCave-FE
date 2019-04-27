<template>
    <div
        class="modal-content-container"
        v-if="isActive"
    >
        <div class="modal-content-inner">
            <div
                class="close-btn icon-lg"
                @click="close"
            >
                <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" src="./modal-content.ts"></script>
<style lang="scss">
@import "../../global.scss";

.modal-content-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.65);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .modal-content-inner {
        width: auto;
        max-width: 90%;
        min-width: 250px;
        overflow: auto;
        background: #fff;
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.45),
            0px 2px 1px rgba(0, 0, 0, 0.52), 0px 5px 15px rgba(0, 0, 0, 0.67);
        border-radius: 2px;
        padding: 1rem;
        box-sizing: border-box;
        font-size: 1rem;
        pointer-events: all;
        position: relative;

        .close-btn {
            position: absolute;
            right: 1rem;
            top: 0.75rem;
            cursor: pointer;
            font-size: 1.5rem;
            line-height: 1.5rem;
        }
    }
}
</style>
