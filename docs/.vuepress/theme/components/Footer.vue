<template>
    <footer class="deep_bg center white-font-color footer">
        <span>{{text}}</span>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        props: ['text'],
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