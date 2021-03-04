module.exports = {
    title: 'opensourceway',// 设置网站标题
    description: 'official website for opensourceway',
    base: '/',   // 设置站点根路径
    dest: './dest',  // 设置输出目录theme
    port: 8086,
    head: [['link',
        {rel: 'icon', href: 'img/logo.jpg'}]],
    plugins: [['markdown-it-toc-done-right'], ['@goy/svg-icons']],
    themeConfig: {
        logo: '/img/logo.png',
        nav: [
            { text: 'Landscape', link: '/' },
            { text: 'Service Guides', link: '/service/' },
            { text: 'FAQ', link: '/faq/' },          
            { text: 'Contact us', link: '/contact/faq' },
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
        search: false,
    }
};