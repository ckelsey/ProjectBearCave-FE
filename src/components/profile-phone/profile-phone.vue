<template>
  <div class="content-section">
        <div
            class="profile-toggle btn btn-primary"
            data-toggle="collapse"
            href="#PhoneCollapse"
            role="button"
            aria-expanded="false"
            aria-controls="PhoneCollapse"
        >Phone</div>
        <div
            class="collapse"
            id="PhoneCollapse"
        >
            <form>
                <div class="form-group label-inside">
                    <input
                        type="text"
                        name="text"
                        class="form-control"
                    >
                    <label>Phone</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./profile-phone.ts"></script>
