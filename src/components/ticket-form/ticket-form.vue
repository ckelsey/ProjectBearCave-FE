<template>
  <div class="form">
    <input-label
      id="name"
      label="name"
      type="text"
      name="name"
      :value="ticket.name"
      @onInput="formUpdate"
    ></input-label>
    <input-label
      id="email"
      label="email"
      type="email"
      name="email"
      :value="ticket.email"
      @onInput="formUpdate"
    ></input-label>
    <input-label
      id="message"
      label="message"
      type="text"
      name="message"
      :value="ticket.message"
      @onInput="formUpdate"
    ></input-label>
    <div>
        <button class="border-orange bold" ref="submit">Send</button>
    </div>
  </div>
</template>

<script lang="ts" src="./ticket-form.ts"></script>

<style lang="scss">
.input-label{
    margin: 21px 0px;
}
</style>
