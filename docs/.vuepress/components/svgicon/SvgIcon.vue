<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>
<script>
    export default {
        name: "SvgIcon",
        props: {
            iconClass: { type: String, required: true }, //用户传的svg图片名字
            className: { type: String } //用户svg图片自定义样式
        },
        data() {
            return {
                // svgClass:'svg-icon'
            };
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`;
            },
            svgClass() {
                return this.className ? `svg-icon ${this.className}` : "svg-icon"; //用户如果传了就保留两者
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        margin-right: 5px;
    }
</style>