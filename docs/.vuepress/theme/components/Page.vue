<template>
    <main class="page">
        <slot name="top"/>

        <Content class="theme-default-content"/>
        <PageEdit/>

        <PageNav v-bind="{ sidebarItems }"/>

        <slot name="bottom"/>
    </main>
</template>

<script>
    import PageEdit from '@theme/components/PageEdit.vue'
    import PageNav from '@theme/components/PageNav.vue'

    export default {
        components: {PageEdit, PageNav},
        props: ['sidebarItems'],
        data(){
            return{
              footerHeight:100,
            }
        },
        mounted() {
            if (parseInt(window.getComputedStyle(document.getElementsByClassName('page')[0]).height) < document.documentElement.clientHeight - this.footerHeight) {
                document.getElementsByClassName('page')[0].style.height = document.documentElement.clientHeight - this.footerHeight + 'px'
            }
        }
    }

</script>

<style lang="stylus">
    @require '../styles/wrapper.styl'

    .page
        box-sizing border-box
        padding-bottom 2rem
        display block

</style>
