<template>
  <content-section ref="contentSection" :show="state.state==='support'">
    <div class="content-section-inner">
      <section>
        <h4 class="heading">we're here to help</h4>
        <h1 class="heading">Send us a message</h1>
        <section class="support-form">
          <div>
            <ticket-form></ticket-form>
          </div>
        </section>
      </section>
      <section class="FAQ" style="margin-top: 84px;">
          <h1>FAQ's</h1>
      </section>
    </div>
  </content-section>
</template>

<script lang="ts" src="./support-section.ts"></script>

<style lang="scss">
</style>
