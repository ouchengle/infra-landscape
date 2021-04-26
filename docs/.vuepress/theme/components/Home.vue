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
                    <p class="margin_bottom_2rem">Open Source Infrastructure</p>
                    <p class="margin_bottom_2rem">We love open source and we believe we can utilize open source projects
                        to construct our open source community infrastructure.</p>
                </div>

            </div>
            <div id="section_2">
                <div class="white_content_box">
                    <div>
                        <h2>ABOUT US</h2>
                        <p>
                            Open source Infrastructure team started along with openEuler, MindSpore, openGauss and
                            openLookeng
                            communities.</p>
                        <p> We are responsible for the common infrastructure of these communities, including
                            Community Portal, Communication, Accounts, Developing, Testing, Distribution，License and
                            Community Health Analytics tools.
                        </p>
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
                        <p>Most of our services started from open source projects</p>
                        <p>which are fully accessible and can be easily configured with our guidance in one minute</p>
                    </div>
                    <div class="margin_top_2rem">
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
                <div id="mountNode" class="white_content_box center white-font-color">

                </div>
            </div>
        </div>
        <Content class="theme-default-content custom"/>
    </main>
</template>

<script>
    import NavLink from '@theme/components/NavLink.vue'
    import * as util from '../util/util'
    import G6 from '@antv/g6'

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
                nodesData: {
                    nodes: [
                        {
                            id: 'openeuler',
                            x: 200,
                            y: 200,
                            label: 'openeuler',
                            size: 100,
                            description: 'openEuler通过社区合作，打造创新平台，构建支持多处理架构、统一和开放的操作系统，推动软硬件应用生态繁荣发展。',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 16,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#002FA7',
                                stroke: null,
                            }
                        },
                        {
                            id: 'prow',
                            x: 300,
                            y: 300,
                            label: 'prow',
                            size: 60,
                            description: 'prow description',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 14,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#FCA94B',
                                stroke: null,
                            }
                        },
                        {
                            id: 'cla',
                            x: 100,
                            y: 350,
                            label: 'cla',
                            size: 60,
                            description: 'cla description',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 14,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#FCA94B',
                                stroke: null,
                            }
                        },
                        {
                            id: 'mail-list',
                            x: 100,
                            y: 100,
                            label: 'mail-list',
                            size: 60,
                            description: 'mail-list description',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 14,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#FCA94B',
                                stroke: null,
                            }
                        },
                        {
                            id: 'Yabot',
                            x: 280,
                            y: 130,
                            label: 'Yabot',
                            size: 60,
                            description: 'Yabot description',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 14,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#FCA94B',
                                stroke: null,
                            }
                        },
                        {
                            id: 'openguass',
                            x: 700,
                            y: 200,
                            label: 'openguass',
                            size: 100,
                            description: 'openEuler通过社区合作，打造创新平台，构建支持多处理架构、统一和开放的操作系统，推动软硬件应用生态繁荣发展。',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 16,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#8503ED',
                                stroke: null,
                            }
                        },
                        {
                            id: 'openguass-prow',
                            x: 800,
                            y: 300,
                            label: 'prow',
                            size: 60,
                            description: 'prow description',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 14,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#FCA94B',
                                stroke: null,
                            }
                        },
                        {
                            id: 'openguass-cla',
                            x: 500,
                            y: 300,
                            label: 'cla',
                            size: 60,
                            description: 'cla description',
                            labelCfg: {
                                positions: 'center',
                                style: {
                                    fontSize: 14,
                                    fill: '#fff',
                                }
                            },
                            style: {
                                fill: '#FCA94B',
                                stroke: null,
                            }
                        },
                    ],
                    edges: [
                        {
                            source: 'openeuler',
                            target: 'prow',
                        },
                        {
                            source: 'openeuler',
                            target: 'cla',
                        },
                        {
                            source: 'openeuler',
                            target: 'mail-list',
                        },
                        {
                            source: 'openeuler',
                            target: 'Yabot',
                        },
                        {
                            source: 'openguass',
                            target: 'openguass-prow',
                        },
                        {
                            source: 'openguass',
                            target: 'openguass-cla',
                        },
                    ],
                },
                bg_1_distance: '',
                bg_2_distance: '',
                bg_3_distance: '',
                serviceArr: [
                    {
                        src: 'img/pen.png',
                        title: 'CLA',
                        description: 'Easily handle Contributor License Agreements (CLAs), both for individual and cooperation licenses, multiple languages are supported'
                    },
                    {
                        src: 'img/email.png',
                        title: 'Maillist',
                        description: 'Based on mailman, new host can be added within 5 steps'
                    },
                    {
                        src: 'img/account.png',
                        title: 'Accounts',
                        description: 'Unified account center for different communities.'
                    },
                    {
                        src: 'img/robot.png',
                        title: 'Yabot',
                        description: 'Start from test infra project more features are added including support gitee, weekly report, CLA check, etc.'
                    }],
                openeuler_countX: true,
                openeuler_countY: true,
                openguass_countX: true,
                openguass_countY: true,
            }
        },
        methods: {
            pause() {

            },
            resume() {

            },
            createGraph() {
                let tooltip = new G6.Tooltip({
                    offsetX: 10,
                    offsetY: 10,
                    itemTypes: ['node'],
                    getContent: (e) => {
                        const outDiv = document.createElement('div');
                        outDiv.style.width = 'fit-content';
                        //outDiv.style.padding = '0px 0px 20px 0px';
                        outDiv.innerHTML = `<h4>${e.item.getModel().description}</h4>`;
                        return outDiv;
                    },
                });

                let graph = new G6.Graph({
                        container: 'mountNode',
                        width: 1500,
                        height: 600,
                        plugins: [tooltip],
                        nodeStateStyles: {
                            hover: {
                                fill: 'green'
                            }
                        },
                        animate: true,
                        animateCfg: {
                            duration: 2000,
                            pauseCallback: this.pause(),
                            resumeCallback: this.resume(),
                        },
                        modes: {}

                    })
                ;
                graph.data(this.nodesData);
                graph.render();
                let animation = () => {
                    let openeuler_x = Math.round(Math.random() * 10);
                    let openeuler_y = Math.round(Math.random() * 10);
                    let openeuler_speed = Math.round(Math.random() * 20) + 30;
                    openeuler_x > 5 ? this.openeuler_countX = true : this.openeuler_countX = false;
                    openeuler_y > 5 ? this.openeuler_countY = true : this.openeuler_countY = false;
                    let openguass_x = Math.round(Math.random() * 10);
                    let openguass_y = Math.round(Math.random() * 10);
                    let openguass_speed = Math.round(Math.random() * 20) + 30;
                    openguass_x > 5 ? this.openguass_countX = true : this.openguass_countX = false;
                    openguass_y > 5 ? this.openguass_countY = true : this.openguass_countY = false;
                    return setInterval(() => {
                        console.log('setInterval');
                        this.nodesData.nodes.forEach((node, index) => {
                            if (index < 5) {
                                if (this.openeuler_countX) {
                                    node.x += openeuler_speed
                                } else {
                                    node.x -= openeuler_speed
                                }
                                if (this.openeuler_countY) {
                                    node.y += openeuler_speed
                                } else {
                                    node.y -= openeuler_speed
                                }
                            }
                            if (index >= 5) {
                                if (this.openguass_countX) {
                                    node.x += openguass_speed
                                } else {
                                    node.x -= openguass_speed
                                }
                                if (this.openguass_countY) {
                                    node.y += openguass_speed
                                } else {
                                    node.y -= openguass_speed
                                }
                            }
                        });

                        if (this.nodesData.nodes[1].x > graph.getWidth() - 100) {
                            this.openeuler_countX = false
                        } else if (this.nodesData.nodes[3].x < 100)
                            this.openeuler_countX = true;
                        if (this.nodesData.nodes[2].y > graph.getHeight() - 100) {
                            this.openeuler_countY = false
                        } else if (this.nodesData.nodes[3].y < 100)
                            this.openeuler_countY = true;

                        if (this.nodesData.nodes[6].x > graph.getWidth()) {
                            this.openguass_countX = false
                        } else if (this.nodesData.nodes[7].x < 100)
                            this.openguass_countX = true;
                        if (this.nodesData.nodes[7].y > graph.getHeight()) {
                            this.openguass_countY = false
                        } else if (this.nodesData.nodes[5].y < 100)
                            this.openguass_countY = true;
                        graph.refresh();
                    }, 2000);
                };

                let interval = animation();
                graph.on('node:mouseenter', (e) => {
                    graph.setItemState(e.item, 'hover', true);
                    graph.changeData(this.nodesData)
                    graph.stopAnimate()
                    clearInterval(interval)
                });
                graph.on('node:mouseleave', (e) => {
                    graph.setItemState(e.item, 'hover', false);
                    interval = animation();
                });
                // setInterval(() => {
                //     console.log('crushInterval');
                //
                // for (let i = 0; i < 5; i++) {
                //     for (let j = 5; j < 8; j++) {
                //         console.log(this.nodesData.nodes[i].x, this.nodesData.nodes[j].x);
                //         if (this.computedDistance(this.nodesData.nodes[i].x, this.nodesData.nodes[j].x, this.nodesData.nodes[i].y, this.nodesData.nodes[j].y, this.nodesData.nodes[i].size / 2, this.nodesData.nodes[j].size / 2)) {
                //             console.log('openeuler_countX==', this.openeuler_countX);
                //             this.openeuler_countX = !this.openeuler_countX;
                //             this.openeuler_countY = !this.openeuler_countY;
                //             this.openguass_countX = !this.openguass_countX;
                //             this.openguass_countY = !this.openguass_countY;
                //             console.log('openeuler_countX', this.openeuler_countX);
                //         }
                //     }
                // }
                //     }, 50);
                },
                // computedDistance(x1, x2, y1, y2, r1, r2)
                // {
                //     console.log((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) - (r1 + r2) * (r1 + r2));
                //     return (Math.abs((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) - (r1 + r2) * (r1 + r2)) < 20);
                // },
            },
            mounted() {
                this.createGraph();
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
<style src="../styles/theme.styl" lang="stylus"></style>
<style lang="stylus">
    .home
        //padding-top $navbarHeight
        display block

        .img-coffee
            width 3rem
            height 3rem

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
            max-width 1500px
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

        .margin_top_1rem
            margin-top 1rem

        .margin_top_2rem
            margin-top 2rem

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
            background-image url("../images/home-bg.jpg")

        .bg_2
            z-index 9
            background-image url("../images/feature-bg.jpg")

        .bg_3_cover
            background rgba(0 0 0 .7)
            z-index 8

        .bg_3
            z-index 7
            background-image url("../images/call-to-action-bg.jpg")

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
