<template>
    <div class="list-to-sidebar d-flex" :class="isSidebar ? `sidebar`:``">
        <div class="list-to-sidebar-tabs">
            <div
                class="list-to-sidebar-tab d-flex align-items-center justify-content-between w-100"
                v-for="tab in tabs"
                :key="tab.key"
                @click="show$.next(tab.key)"
                :title="translate.get(tab.name)"
                :class="show$.value === tab.key ? `active`: ``"
            >
                <span class="list-to-sidebar-tab-left d-flex align-items-center">
                    <font-awesome-icon v-if="tab.icon" :icon="tab.icon" class="list-to-sidebar-tab-icon" :class="!collapseIcon ? `do-not-collapse` : ``"></font-awesome-icon>
                    <span class="list-to-sidebar-tab-label" :class="!collapseLabel ? `do-not-collapse` : ``" v-html="tab.name"></span>
                </span>

                <font-awesome-icon icon="chevron-right" class="list-to-sidebar-tab-arrow"></font-awesome-icon>
            </div>
        </div>
        <div class="list-to-sidebar-content">
            <div class="list-to-sidebar-tab-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./list-to-sidebar.ts"></script>
<style lang="scss">
@import "@/global/global.scss";

.list-to-sidebar {
    .list-to-sidebar-tabs {
        width: 100%;

        .list-to-sidebar-tab {
            cursor: pointer;
            color: $dark-color;
            padding: 1rem 0.5rem;
            box-shadow: 0px 1px 0px 0px transparentize($dark-color, 0.9);
            transition: color 0.4s, padding 0.4s;

            &.active,
            &.active:hover {
                color: $primary-color;
            }

            &:hover {
                color: darken($primary-color, 10);
            }

            .list-to-sidebar-tab-left {
                flex-grow: 1;
                max-width: 100%;

                .list-to-sidebar-tab-label {
                    padding: 0rem 0.75rem;
                    width: 100%;
                    display: block;
                    white-space: nowrap;
                    transition: width 0.2s, padding 0.2s;
                }

                .list-to-sidebar-tab-arrow {
                    display: block;
                    transition: width 0.2s, padding 0.2s;
                }
            }
        }
    }

    .list-to-sidebar-content {
        width: 0%;
        pointer-events: none;
        overflow: hidden;
    }

    &.sidebar {
        .list-to-sidebar-tabs {
            width: 35px;

            .list-to-sidebar-tab {
                padding: 0.34rem 0.5rem;

                .list-to-sidebar-tab-icon:not(.do-not-collapse),
                .list-to-sidebar-tab-label:not(.do-not-collapse),
                .list-to-sidebar-tab-arrow {
                    width: 0%;
                    padding: 0rem;
                    overflow: hidden;
                }
            }
        }

        .list-to-sidebar-content {
            pointer-events: all;
            overflow: visible;
            width: calc(100% - 35px);
        }
    }
}
</style>
