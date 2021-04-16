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
                    }]
            }
        },
        methods: {
            createGraph() {
                let graph = new G6.Graph({
                        container: 'mountNode',
                        width: 1200,
                        height: 600,
                        nodeStateStyles: {
                            hover: {
                                // fill: 'green'
                            }
                        },
                        animate: true,
                        animateCfg: {
                            duration: 2000,
                        },
                        // modes: {
                        //     default: [
                        //         {
                        //             type: 'tooltip',
                        //             formatText(model) {
                        //                 console.log(model.description);
                        //                 return model.description;
                        //             },
                        //             offset: 10,
                        //             shouldBegin: function shouldBegin() {
                        //                 return true
                        //             },
                        //             shouldUpdate: function shouldUpdate() {
                        //                 return true;
                        //             },
                        //         },
                        //     ]
                        // }

                    })
                ;
                graph.data(this.nodesData);
                graph.render();
                let animation = () => {
                    let x = Math.round(Math.random() * 10);
                    let y = Math.round(Math.random() * 10);
                    let countX = 1;
                    let countY = 1;
                    x > 5 ? countX = 1 : countX = 0;
                    y > 5 ? countY = 1 : countY = 0;
                    let interval = setInterval(() => {
                        if (countX) {
                            this.nodesData.nodes.forEach(node => {
                                node.x += 50
                            });
                        } else {
                            this.nodesData.nodes.forEach(node => {
                                node.x -= 50
                            });
                        }
                        if (countY) {
                            this.nodesData.nodes.forEach(node => {
                                node.y += 50
                            });
                        } else {
                            this.nodesData.nodes.forEach(node => {
                                node.y -= 50
                            });
                        }
                        if (this.nodesData.nodes[1].x > 1100) {
                            countX = 0
                        } else if (this.nodesData.nodes[3].x < 100)
                            countX = 1;
                        if (this.nodesData.nodes[2].y > 500) {
                            countY = 0
                        } else if (this.nodesData.nodes[3].y < 100)
                            countY = 1;
                        graph.refresh();
                    }, 2000);
                };

                animation();
                graph.on('node:mouseenter', (ev) => {

                    console.log('mouseenter', ev);
                    let node = ev.item;
                    const model = node.getModel();
                    graph.setItemState(node, 'hover', true);
                    let size = 0;
                    switch (model.id) {
                        case 'openeuler':
                            this.nodesData.nodes[0].label = this.nodesData.nodes[0].description
                            this.nodesData.nodes[0].size = 200;

                            break;

                        case 'prow':
                            this.nodesData.nodes[1].label = this.nodesData.nodes[1].description;
                            this.nodesData.nodes[1].size = 120;

                            break;

                        case 'mail-list':

                        case 'cla':

                        case 'Yabot':
                            size = 120

                            break;

                    }
                    graph.refreshItem(node);

                });
                graph.on('node:mouseleave', (ev) => {
                    console.log('mouseleave,', ev);
                    let
                        node = ev.item;
                    const model = node.getModel();
                    model.oriLabel = model.label;
                    graph.setItemState(node, 'hover', false);
                    let size = 0;

                    switch (model.id) {
                        case 'openeuler':
                            this.nodesData.nodes[0].label = this.nodesData.nodes[0].id;
                            this.nodesData.nodes[0].size = 100;
                            break;

                        case 'prow':
                            this.nodesData.nodes[1].label = this.nodesData.nodes[1].id;
                            this.nodesData.nodes[1].size = 60;

                            break;

                        case 'mail-list':

                        case 'cla':

                        case 'Yabot':
                            size = 60;

                            break;

                    }
                    graph.refreshItem(node);


                });

            },

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
