module.exports = {
    title: 'opensourceway',// 设置网站标题
    description: 'official website for opensourceway',
    base: '/',   // 设置站点根路径
    dest: './ROOT',  // 设置输出目录theme
    port: 8086,
    head: [],
    plugins: ['markdown-it-toc-done-right'],
    themeConfig: {
        logo: '/img/logo.png',
        nav: [
            { text: 'Landscape', link: '/' },
            { text: 'Service Guides', link: '/service/' },
            { text: 'FAQ', link: '/faq/' },          
            { text: 'Contact us', link: '/contact/' },          
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
};