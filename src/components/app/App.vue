<template>
  <div id="app" :class="classes">
    <nav-bar></nav-bar>
    <hero-element></hero-element>
    <!-- <login-signup></login-signup> -->
    <!-- <div class="overlay"></div> -->
    <login-form></login-form>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style lang="scss">
html {
  height: 100%;
}

body {
  min-height: 100vh;
  margin: 0px;
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  font-size: 1rem;
  overflow: hidden;

  // --overlay-color: rgba(75, 152, 189, 0.93);
  --overlay-color: #fff;
  --primary-color: #2c9bc9;
  --secondary-color: rgb(81, 91, 101);
  --on-dark-text-color: #fff;
  --on-light-text-color: #4e5b5f;
  --background-color: #e8ecec;
  --orange: #f28d4e;
  --blue: #53c6dc;
  --green: #56c4b3;
  --dark-blue: #424c58;
}

* {
  box-sizing: border-box;
  color: inherit;
  font: inherit;
  backface-visibility: hidden;
}

h1 {
  font-size: 192%;
  font-weight: 900;
}

#app {
  width: 100vw;
  height: 100vh;
  min-width: 300px;
  position: relative;
  overflow: hidden;
  background: var(--background-color);
  color: var(--on-light-text-color);

  &.darken {
    background: #ccd4dc;
  }
}

.bg-green {
  background: var(--green);
  color: var(--on-dark-text-color);
}

.link-list {
  a {
    display: block;
    text-decoration: none !important;
    padding: 21px;
    transition: all 0.2s;
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
}

.blur {
  filter: blur(4px);
  opacity: 0.15;
  backface-visibility: hidden;
  transition: all 0.2s ease-in-out;
}

.shift-left {
  left: 51px;
  transition: all 0.2s ease-in-out;
}

button {
  display: inline-block;
  border: none;
  background: transparent;
  // background: var(--primary-color);
  font: inherit;
  // color: var(--on-dark-text-color);
  color: inherit;
  padding: 7px 21px;
  margin: 0px;
  cursor: pointer;
  outline: none !important;
  opacity: 0.9;
  transform: translate3d(0, 0, 0) scale(1);
  backface-visibility: none;
  // box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(0, 0, 0, 0);
  transform-origin: center center;
  filter: blur(0);
  border-radius: 2px;
  transition: all 0.2s;

  &.border-orange {
    box-shadow: inset 0px 0px 0px 1px var(--orange);
    color: var(--orange);

    &:hover {
      background: var(--orange);
      color: var(--on-dark-text-color);
    }
  }

  &.bold {
    font-weight: bold;
  }

  &.hamburger {
    position: relative;
    display: flex;
    height: 36px;
    padding: 7px;
    align-items: center;
    justify-content: center;

    i {
      width: 23px;
      display: inline-block;
      height: 0px;
      box-shadow: 0px 0px 0px 1px var(--on-light-text-color);
      position: relative;
      transition: all 0.2s;

      &:before {
        display: inline-block;
        height: 0px;
        width: 100%;
        box-shadow: 0px 0px 0px 1px var(--on-light-text-color);
        content: "";
        position: absolute;
        top: -7px;
        left: 0px;
        transition: all 0.2s;
      }
      &:after {
        display: inline-block;
        height: 0px;
        width: 100%;
        box-shadow: 0px 0px 0px 1px var(--on-light-text-color);
        content: "";
        position: absolute;
        top: 7px;
        left: 0px;
        transition: all 0.2s;
      }
    }

    &.on-dark {
      i {
        box-shadow: 0px 0px 0px 1px var(--on-dark-text-color);

        &:before {
          box-shadow: 0px 0px 0px 1px var(--on-dark-text-color);
        }
        &:after {
          box-shadow: 0px 0px 0px 1px var(--on-dark-text-color);
        }
      }
    }
  }

  &:hover {
    opacity: 1;
    // transform: translate3d(0, 0, 0) scale(1.05);
    // box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.2),
    //   0px 6px 7px rgba(0, 0, 0, 0.29);
    // filter: blur(0);

    // &.clear,
    // &.white {
    //   box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(0, 0, 0, 0);
    //   background: var(--primary-color);
    //   color: var(--on-dark-text-color);
    // }

    &.hamburger {
      i {
        box-shadow: 0px 0px 0px 1px var(--primary-color);

        &:before {
          box-shadow: 0px 0px 0px 1px var(--primary-color);
        }
        &:after {
          box-shadow: 0px 0px 0px 1px var(--primary-color);
        }
      }

      &.on-dark {
        i {
          box-shadow: 0px 0px 0px 1px var(--on-dark-text-color);

          &:before {
            box-shadow: 0px 0px 0px 1px var(--on-dark-text-color);
          }
          &:after {
            box-shadow: 0px 0px 0px 1px var(--on-dark-text-color);
          }
        }
      }
    }
  }
}

.overlay {
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQYV2NkYGD4z8DAwMgABXAGNgGwSgwVAFbmAgXQdISfAAAAAElFTkSuQmCC);
  opacity: 0.15;
}
</style>
