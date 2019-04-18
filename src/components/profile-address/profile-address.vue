<template>
  <div class="content-section">
        <div
            class="profile-toggle btn btn-primary"
            data-toggle="collapse"
            href="#AddressCollapse"
            role="button"
            aria-expanded="false"
            aria-controls="AddressCollapse"
        >Address</div>
        <div
            class="collapse"
            id="AddressCollapse"
        >
            <form>
                <div class="form-group label-inside">
                    <input
                        type="text"
                        name="text"
                        class="form-control"
                    >
                    <label>Address</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./profile-address.ts"></script>
