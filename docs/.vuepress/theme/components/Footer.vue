<template>
    <footer class="deep_bg center white-font-color footer">
        <span class="gray-color">{{footerText}}</span><span class="gray-color hover-pointer hover-color-slow" @click="checkIcp">{{icp}}</span>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                footerText: 'MIT Licensed | Copyright © opensourceways infrastructure | ',
                icp: '蜀ICP备20009468号-1',
            }
        },
        methods: {
            checkIcp() {
                open('https://icp.chinaz.com/home/info?host=osinfra.cn')
            },
        },
    }
</script>

<style scoped lang="stylus">
    .footer {
        height $footerHeight
        line-height $footerHeight
        position: relative;
        z-index: 13;
    }
</style>