<template>
    <div class="profile-tabs">
        <div
            class="profile-toggle"
            v-for="tab in Tabs"
            :key="tab.key"
            @click="state.profile = tab.key"
            :title="translate.get(tab.name)"
            :class="state.profile === tab.key ? `active`: ``"
        >
            <div class="profile-toggle-item category-icon">
                <font-awesome-icon :icon="tab.icon"></font-awesome-icon>
            </div>
            <div class="profile-toggle-item toggle-off">{{tab.name}}</div>
            <div class="arrow-icon profile-toggle-item toggle-off">
                <font-awesome-icon icon="chevron-right"></font-awesome-icon>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss">
@import "../../global.scss";

.profile-toggle {
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    opacity: 0.95;
    cursor: pointer;
    position: relative;
    margin: 0rem;
    user-select: none;
    transition: opacity 0.4s, padding 0.4s, width 0.2s;

    .profile-toggle-item {
        white-space: nowrap;
        opacity: 0.75;
        transition: opacity 0.4s, color 0.4s, width 0.2s;
    }

    .category-icon {
        padding-right: 0.5rem;
    }

    .arrow-icon {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    &:hover,
    &.active {
        opacity: 1;
        .profile-toggle-item {
            color: $primary;
        }
    }
}
</style>
