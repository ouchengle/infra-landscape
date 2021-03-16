<template>
    <main
            class="home"
            :aria-labelledby="data.heroText !== null ? 'main-title' : null">
        <div class="bg bg_1"></div>
        <div class="bg bg_2"></div>
        <div class="bg bg_3"></div>
        <div class="bg bg_1_cover"></div>
        <div class="bg bg_3_cover"></div>
        <div class="section">
            <div id="section_1">
                <div class="white_content_box">
                    <svgicon-SvgIcon iconClass="coffee"></svgicon-SvgIcon>
                    <p class="margin_bottom_2rem">A DIGITAL MARKETING & DESIGN AGENCY</p>
                    <p class="margin_bottom_2rem">We love the Web and the work we do.We work closely with our clients to
                        deliver the best possible
                        solutions for their needs</p>
                    <NavLink
                            class="action-button"
                            :item="actionLink"
                    />
                </div>

            </div>
            <div id="section_2">
                <div class="white_content_box">
                    <div>
                        <h2>ABOUT US</h2>
                        <p>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
                            Semantics
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.</p>
                    </div>
                    <div>
                        <img src="https://themes.gohugo.io//theme/airspace-hugo/images/wrapper-img.png" alt="picture">
                    </div>
                </div>
            </div>
            <div id="section_3">
                <div class="white_content_box">
                    <div>
                        <h2>WE BELIEVE IN GREAT IDEAS</h2>
                        <p>Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
                            eros.
                            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
                            justo sit amet risus.</p>
                        <p>Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
                            eros.
                            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
                            justo sit amet risus.</p>
                        <p>Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at
                            eros.
                            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
                            justo sit amet risus.</p>
                        <NavLink
                                class="action-button black-font-color"
                                :item="actionLink_faq"
                        />
                    </div>
                </div>

            </div>
            <div id="section_4" class="white_bg">
                <div class="white_content_box">
                    <div class="center">
                        <h2>OUR SERVICES</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,</p>
                        <p>there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
                            Semantics</p>
                    </div>
                    <div>
                        <div class="flex_space_between">
                            <div class="center" v-for="item in serviceArr">
                                <img class="img-coffee" :src="item.src" alt="coffee">
                                <h2>{{item.title}}</h2>
                                <p>{{item.description}}</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>

            </div>
            <div id="section_5">
                <div class="white_content_box center white-font-color">
                    <h2 class="margin_bottom_2rem">We design delightful digital experiences.</h2>
                    <p>Read more about what we do and our philosophy of design. Judge for yourself The work and
                        results</p>
                    <p class="margin_bottom_2rem">we’ve achieved for other clients, and meet our highly experienced Team
                        who just love to design.</p>
                    <NavLink
                            class="action-button"
                            :item="actionLink_contact"
                    />
                </div>
            </div>
        </div>
        <Content class="theme-default-content custom"/>
    </main>
</template>

<script>
    import NavLink from '@theme/components/NavLink.vue'
    import * as util from '../util/util'


    export default {
        name: 'Home',

        components: {NavLink},

        computed: {
            data() {
                return this.$page.frontmatter
            },

            actionLink() {
                return {
                    link: this.data.actionLink,
                    text: this.data.actionText
                }
            },
            actionLink_faq() {
                return {
                    link: this.data.actionLink_faq,
                    text: this.data.actionText_faq
                }
            },
            actionLink_contact() {
                return {
                    link: this.data.actionLink_contact,
                    text: this.data.actionText_contact
                }
            }
        },
        data() {
            return {
                bg_1_distance: '',
                bg_2_distance: '',
                bg_3_distance: '',
                serviceArr: [
                    {
                        src: 'img/coffee.png',
                        title: 'BRANDING',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                    },
                    {
                        src: 'img/coffee.png',
                        title: 'WEB DESIGN',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                    },
                    {
                        src: 'img/coffee.png',
                        title: 'APP DESIGN',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                    },
                    {
                        src: 'img/coffee.png',
                        title: 'START UP',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                    }]
            }
        },
        mounted() {
            let clientHeight = util.getClientHeight();
            if (document.getElementById('section_3').offsetTop - document.documentElement.scrollTop < clientHeight) {
                document.getElementsByClassName('bg_1')[0].style.height = document.getElementById('section_3').offsetTop - document.documentElement.scrollTop - parseInt(window.getComputedStyle(document.getElementById('section_2')).height) / 2 + 'px';
                document.getElementsByClassName('bg_1_cover')[0].style.height = document.getElementById('section_3').offsetTop - document.documentElement.scrollTop - parseInt(window.getComputedStyle(document.getElementById('section_2')).height) / 2 + 'px';
            } else {
                document.getElementsByClassName('bg_1')[0].style.height = `${clientHeight}px`;
                document.getElementsByClassName('bg_1_cover')[0].style.height = `${clientHeight}px`
            }
            if (document.getElementById('section_5').offsetTop - document.documentElement.scrollTop < clientHeight) {
                document.getElementsByClassName('bg_2')[0].style.height = document.getElementById('section_5').offsetTop - document.documentElement.scrollTop - parseInt(window.getComputedStyle(document.getElementById('section_4')).height) / 2 + 'px';
            } else {
                document.getElementsByClassName('bg_2')[0].style.height = `${clientHeight}px`;
            }
            document.getElementsByClassName('bg_3')[0].style.height = `${clientHeight}px`;
            document.getElementsByClassName('bg_3_cover')[0].style.height = `${clientHeight}px`;
            window.onscroll = () => {
                if (document.getElementById('section_3').offsetTop - document.documentElement.scrollTop > 0) {
                    if (document.documentElement.clientHeight - document.getElementById('section_3').offsetTop + document.documentElement.scrollTop + parseInt(window.getComputedStyle(document.getElementById('section_2')).height) / 2 > 0) {
                        document.getElementsByClassName('bg_1')[0].style.height = document.getElementById('section_3').offsetTop - document.documentElement.scrollTop - parseInt(window.getComputedStyle(document.getElementById('section_2')).height) / 2 + 'px';
                        document.getElementsByClassName('bg_1_cover')[0].style.height = document.getElementById('section_3').offsetTop - document.documentElement.scrollTop - parseInt(window.getComputedStyle(document.getElementById('section_2')).height) / 2 + 'px';
                    } else {
                        document.getElementsByClassName('bg_1')[0].style.height = document.documentElement.clientHeight + 'px';
                        document.getElementsByClassName('bg_1_cover')[0].style.height = document.documentElement.clientHeight + 'px'
                    }
                }
                if (document.getElementById('section_5').offsetTop - document.documentElement.scrollTop > 0) {
                    if (document.documentElement.clientHeight - document.getElementById('section_5').offsetTop + document.documentElement.scrollTop + parseInt(window.getComputedStyle(document.getElementById('section_4')).height) / 2 > 0) {
                        document.getElementsByClassName('bg_2')[0].style.height = document.getElementById('section_5').offsetTop - document.documentElement.scrollTop - parseInt(window.getComputedStyle(document.getElementById('section_4')).height) / 2 + 'px';
                    } else {
                        document.getElementsByClassName('bg_2')[0].style.height = document.documentElement.clientHeight + 'px'
                    }
                }
            };
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style lang="stylus">
    .home
        //padding-top $navbarHeight
        display block

        .img-coffee
            width 4rem
            height 4rem

        a
            color white

        .flex_space_between
            display flex
            justify-content space-around

            & > div
                width 200px

        button
            padding 1rem

        .white_content_box
            max-width 1200px
            margin 0 auto

        .section
            width 100%
            position relative
            z-index 12

            & > div
                padding 5rem

        #section_1
            color white
            text-align center
            padding 10rem 5rem

            p
                &:nth-of-type(1)
                    font-size 2rem

        #section_2
            background-color white

            & > div
                display flex

            & > div > div:nth-of-type(1)
                width 700px
                margin-right 2rem
                flex-grow 1

            & > div > div:nth-of-type(2) > img
                width 400px

        #section_3
            a
                color black

            & > div
                display flex
                flex-direction row-reverse

                & > div
                    width 500px

        .margin_bottom_2rem
            margin-bottom 2rem

        .bg
            width 100%
            position fixed;
            left 0
            top 0
            background-repeat no-repeat
            background-size cover


        .bg_1_cover
            background rgba(0 0 0 .7)
            z-index 11


        .bg_1
            z-index 10
            background-image url("https://themes.gohugo.io/theme/airspace-hugo/images/slider-bg.jpg")

        .bg_2
            z-index 9
            background-image url("https://themes.gohugo.io/theme/airspace-hugo/images/featue-bg.jpg")

        .bg_3_cover
            background rgba(0 0 0 .7)
            z-index 8

        .bg_3
            z-index 7
            background-image url("https://themes.gohugo.io/theme/airspace-hugo/images/call-to-action-bg.jpg")

        .action-button
            display inline-block
            font-size 1.2rem
            padding 0.8rem 1.6rem
            border-radius 4px
            box-sizing border-box
            border 1px solid darken(white, 50%)

            &:hover
                border 1px solid darken(white, 20%)

        .hero
            text-align center

            img
                max-width: 100%
                max-height 280px
                display block
                margin 3rem auto 1.5rem

            h1
                font-size 3rem

            h1, .description, .action
                margin 1.8rem auto

            .description
                max-width 35rem
                font-size 1.6rem
                line-height 1.3
                color lighten($textColor, 40%)


        .features
            border-top 1px solid $borderColor
            padding 1.2rem 0
            margin-top 2.5rem
            display flex
            flex-wrap wrap
            align-items flex-start
            align-content stretch
            justify-content space-between

        .feature
            flex-grow 1
            flex-basis 30%
            max-width 30%

            h2
                font-size 1.4rem
                font-weight 500
                border-bottom none
                padding-bottom 0
                color lighten($textColor, 10%)

            p
                color lighten($textColor, 25%)


        @media (max-width: $MQMobile)
            .home
                .features
                    flex-direction column

                .feature
                    max-width 100%
                    padding 0 2.5rem

        @media (max-width: $MQMobileNarrow)
            .home
                padding-left 1.5rem
                padding-right 1.5rem

                .action-button
                    font-size 1rem
                    padding 0.6rem 1.2rem

                .hero
                    img
                        max-height 210px
                        margin 2rem auto 1.2rem

                    h1
                        font-size 2rem

                    h1, .description, .action
                        margin 1.2rem auto

                    .description
                        font-size 1.2rem


                .feature
                    h2
                        font-size 1.25rem
</style>
