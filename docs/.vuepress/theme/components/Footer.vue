<template>
    <div class="deep_bg center white-font-color footer">
        <span>{{footer}}</span>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        computed:{
            data() {
                return this.$page.frontmatter
            },
            footer(){
                return this.data.footer
            },

        },
    }
</script>

<style scoped lang="stylus">
.footer{
    height $footerHeight
    line-height $footerHeight
    position: relative;
    z-index: 13;
}
</style>