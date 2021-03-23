<template>
    <div
            class="theme-container"
            :class="pageClasses"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
    >
        <Navbar
                v-if="shouldShowNavbar"
                @toggle-sidebar="toggleSidebar"
        />

        <div
                class="sidebar-mask"
                @click="toggleSidebar(false)"
        />

        <Sidebar
                :items="sidebarItems"
                @toggle-sidebar="toggleSidebar"
        >
            <template #top>
                <slot name="sidebar-top"/>
            </template>
            <template #bottom>
                <slot name="sidebar-bottom"/>
            </template>
        </Sidebar>

        <Home v-if="$page.frontmatter.home"/>

        <Page
                v-else
                :sidebar-items="sidebarItems"
                :change-route="currentRoute"
        >
            <template #top>
                <slot name="page-top"/>
            </template>
            <template #bottom>
                <slot name="page-bottom"/>
            </template>
        </Page>
        <Footer v-if="shouldShowFooter"></Footer>
    </div>
</template>

<script>
    import Home from '@theme/components/Home.vue'
    import Navbar from '@theme/components/Navbar.vue'
    import Page from '@theme/components/Page.vue'
    import Sidebar from '@theme/components/Sidebar.vue'
    import Footer from '@theme/components/Footer.vue'
    import {resolveSidebarItems} from '../util'

    export default {
        name: 'Layout',

        components: {
            Home,
            Page,
            Sidebar,
            Navbar,
            Footer,
        },
        data() {
            return {
                isSidebarOpen: false
            }
        },

        computed: {
            currentRoute() {
                this.changePageHeight()
                return this.$route.fullPath
            },
            shouldShowFooter() {
                const {themeConfig} = this.$site
                if (themeConfig.footer) {
                    return themeConfig.footer
                } else {
                    return false
                }
            },
            shouldShowNavbar() {
                const {themeConfig} = this.$site
                const {frontmatter} = this.$page
                if (
                    frontmatter.navbar === false
                    || themeConfig.navbar === false) {
                    return false
                }
                return (
                    this.$title
                    || themeConfig.logo
                    || themeConfig.repo
                    || themeConfig.nav
                    || this.$themeLocaleConfig.nav
                )
            },

            shouldShowSidebar() {
                const {frontmatter} = this.$page
                return (
                    !frontmatter.home
                    && frontmatter.sidebar !== false
                    && this.sidebarItems.length
                )
            },

            sidebarItems() {
                return resolveSidebarItems(
                    this.$page,
                    this.$page.regularPath,
                    this.$site,
                    this.$localePath
                )
            },

            pageClasses() {
                const userPageClass = this.$page.frontmatter.pageClass
                return [
                    {
                        'no-navbar': !this.shouldShowNavbar,
                        'sidebar-open': this.isSidebarOpen,
                        'no-sidebar': !this.shouldShowSidebar
                    },
                    userPageClass
                ]
            }
        },
        mounted() {
            this.$router.afterEach(() => {
                this.isSidebarOpen = false
            })
            this.changePageHeight()
        },
        updated() {
            this.changePageHeight()
        },

        methods: {
            changePageHeight() {
                this.$nextTick(() => {
                    document.getElementsByTagName('main')[0].style.minHeight = 0 + 'px';
                    if (parseInt(window.getComputedStyle(document.getElementsByTagName('main')[0]).height) < document.documentElement.clientHeight - parseInt(window.getComputedStyle(document.getElementsByClassName('footer')[0]).height)) {
                        document.getElementsByTagName('main')[0].style.minHeight = document.documentElement.clientHeight - parseInt(window.getComputedStyle(document.getElementsByClassName('footer')[0]).height) + 'px'
                    }
                })
            },
            toggleSidebar(to) {
                this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
                this.$emit('toggle-sidebar', this.isSidebarOpen)
            },

            // side swipe
            onTouchStart(e) {
                this.touchStart = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            },

            onTouchEnd(e) {
                const dx = e.changedTouches[0].clientX - this.touchStart.x
                const dy = e.changedTouches[0].clientY - this.touchStart.y
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    if (dx > 0 && this.touchStart.x <= 80) {
                        this.toggleSidebar(true)
                    } else {
                        this.toggleSidebar(false)
                    }
                }
            }
        }
    }
</script>
<style lang="stylus">
    html
        font-weight lighter
    @media screen and (min-width: 1200px)
        body
            font-size 16px

        @media screen and (min-width: 800px) and (max-width: 1200px)
            body
                font-size 14px

        @media screen and (max-width: 800px)
            body
                font-size 12px
</style>

