<template>
  <div class="content-section">
        <div
            class="profile-toggle btn btn-primary"
            data-toggle="collapse"
            href="#EmploymentCollapse"
            role="button"
            aria-expanded="false"
            aria-controls="EmploymentCollapse"
        >Employment</div>
        <div
            class="collapse"
            id="EmploymentCollapse"
        >
            <form>
                <div class="form-group label-inside">
                    <input
                        type="text"
                        name="text"
                        class="form-control"
                    >
                    <label>Employment</label>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts" src="./profile-employment.ts"></script>
