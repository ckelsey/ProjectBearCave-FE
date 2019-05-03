<template>
    <div class="about-us-container">
        <section id="about-us-top">
            <div class="text-section">
                <h4 class="heading">{{subTitle}}</h4>
                <h2 class="heading">{{title}}</h2>
                <p>{{message}}</p>
            </div>
        </section>

        <section id="about-us-profiles">
            <h2>Multiple personalities. No egos</h2>
            <div id="team">
                <a
                    v-for="profile in team"
                    :key="profile.id"
                    class="profile"
                    :href="profile.link"
                    target="_blank"
                >
                    <div class="profile-image"></div>
                    <div class="profile-name">{{profile.name}}</div>
                    <div class="profile-title">{{profile.title}}</div>
                </a>
            </div>
        </section>
        <section class="support-form">
            <div class="d-flex align-items-start justify-content-between">
                <div class="w-100">
                    <h2>Contact us</h2>
                    <support-ticket></support-ticket>
                </div>
                <div class="w-100">
                    <div>
                        <h2>Address</h2>
                        <p>{{constants.street}}</p>
                        <p>{{constants.city}}, {{constants.state}} {{constants.zip}}</p>
                    </div>
                    <div>
                        <a class="primary" :href="constants.mailTo">{{constants.email}}</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" src="./about-page.ts"></script>

<style lang="scss">
.about-us-container {

    section {
        margin: 0rem 0rem 4rem;
    }

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
