module.exports = {
    extend: '@vuepress/theme-default',
    title: '开源社区帮助文档',// 设置网站标题
    description: '开源社区帮助文档',
    base: '/',   // 设置站点根路径
    dest: './ROOT',  // 设置输出目录
    port: 8086,
    head: [],
    plugins: ['markdown-it-toc-done-right'],
    themeConfig: {
        logo: '/img/logo.jpg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'openeuler', link: '/openeuler/' },
            { text: 'openguass', link: '/openguass/faq' },
            { text: 'openlookeng', link: '/openlookeng/faq' },
            { text: 'mindspore', link: '/mindspore/faq' },
            { text: 'language', items:[
                    {text:'chinese',items:[
                            {text:'one',link: '/language/chinese/'},
                            {text:'two',link: '/language/english/'}
                        ]},
                    {text:'english',link: '/language/english/'}
                ] },
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
}