<template>
  <div class="content-section">
        <div
            class="profile-toggle btn btn-primary"
            data-toggle="collapse"
            href="#VehicleCollapse"
            role="button"
            aria-expanded="false"
            aria-controls="VehicleCollapse"
        >Vehicle</div>
        <div
            class="collapse"
            id="VehicleCollapse"
        >
            <form>
                <div class="form-group label-inside">
                    <input
                        type="text"
                        name="text"
                        class="form-control"
                    >
                    <label>Vehicle</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./profile-vehicle.ts"></script>
