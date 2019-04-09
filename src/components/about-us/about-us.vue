<template>
  <content-section ref="contentSection" :show="state.state==='about'">
    <div class="about-us-container">
      <section id="about-us-top" class="content-section-inner">
        <div class="text-section">
          <h4 class="heading">{{subTitle}}</h4>
          <h1 class="heading">{{title}}</h1>
          <p>{{message}}</p>
          <p>
            <button class="border-orange bold" ref="contact">Contact us</button>
          </p>
        </div>
        <div class="image" :style="style"></div>
      </section>

      <section id="about-us-profiles" class="content-section-inner">
        <h1>Multiple personalities. No egos</h1>
        <div id="team">
          <a v-for="profile in team" :key="profile.id" class="profile" :href="profile.link" target="_blank">
            <div class="profile-image" :style="profileImage(profile.img)"></div>
            <div class="profile-name">{{profile.name}}</div>
            <div class="profile-title">{{profile.title}}</div>
          </a>
        </div>
      </section>
    </div>
  </content-section>
</template>

<script lang="ts" src="./about-us.ts"></script>

<style lang="scss">
.about-us-container {
  height: 100%;
  overflow: auto;
  padding-bottom: 42px;
  
  #about-us-top {
    display: flex;

    .text-section {
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    .image {
      flex-grow: 1;
      flex-basis: 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 100% 100%;
    }
  }
  #about-us-profiles {
    h1 {
      text-align: center;
    }

    #team {
      display: flex;
      flex-wrap: wrap;

      .profile {
        max-width: 300px;
        flex-grow: 1;
        flex-basis: 0;
        min-width: 200px;
        align-items: flex-start;
        justify-content: center;
        padding: 21px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .profile-image {
          width: 100%;
          height: 0px;
          padding: 50% 0px;
          border-radius: 50%;
          overflow: hidden;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          box-shadow: 0px 0px 0px 5px rgba(60, 155, 201, 0.08);
        }

        .profile-name {
          font-weight: 600;
          padding: 14px 14px 0px;
        }
        .profile-title {
          font-size: 85%;
          font-weight: 100;
        }
      }
    }
  }
}
</style>
