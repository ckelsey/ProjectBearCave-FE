<template>
  <div class="form ticket-form">
    <div class="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        :value="ticket.name"
        @onInput="formUpdate"
        class="form-control"
      >
    </div>
    <div class="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        :value="ticket.email"
        @onInput="formUpdate"
        class="form-control"
      >
    </div>
    <div class="form-group">
      <label>Message</label>
      <textarea name="message" :value="ticket.message" @onInput="formUpdate" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <button class="btn btn-secondary" ref="submit">Send</button>
    </div>
  </div>
</template>

<script lang="ts" src="./support-ticket.ts"></script>

<style lang="scss">
.ticket-form {
  max-width: 350px;
  width: 90%;
}
</style>
