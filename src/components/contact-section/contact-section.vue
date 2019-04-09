<template>
  <content-section ref="contentSection" :show="state.state==='contact'">
    <div class="contact-container">
      <section class="content-section-inner">
        <h4 class="heading">we're here to help</h4>
        <h1 class="heading">Contact us</h1>
        <section class="contact-form">
          <div>
            <ticket-form></ticket-form>
          </div>
          <section class="address">
            <div>
                <h4>Address</h4>
              <p>{{street}}</p>
              <p>{{city}}, {{addressState}} {{zip}}</p>
            </div>
            <div>
              <a class="primary" :href="emailLink">{{email}}</a>
            </div>
          </section>
        </section>

        <section style="margin-top: 84px;">
          <h1>
            Looking for support?
            <button class="border-orange bold" ref="supportButton">click here</button>
          </h1>
        </section>
      </section>
    </div>
  </content-section>
</template>

<script lang="ts" src="./contact-section.ts"></script>

<style lang="scss">
h1 button {
  margin-left: 21px;
}

.contact-form {
  display: flex;
  justify-content: space-between;
}
</style>
