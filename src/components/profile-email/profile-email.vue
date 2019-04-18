<template>
    <div class="content-section">
        <div
            class="profile-toggle btn btn-primary"
            data-toggle="collapse"
            href="#emailCollapse"
            role="button"
            aria-expanded="false"
            aria-controls="emailCollapse"
        >Email</div>
        <div
            class="collapse"
            id="emailCollapse"
        >
            <form>
                <div class="form-group label-inside">
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                    >
                    <label>Email</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./profile-email.ts"></script>
