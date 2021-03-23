module.exports = {
    title: 'opensourceway',
    description: 'official website for opensourceway',
    base: '/',
    dest: './dest',
    markdown: {
        lineNumbers: true
    },
    port: 8086,
    head: [['link',
        {rel: 'icon', href: 'img/logo.jpg'}]],
    plugins: [['markdown-it-toc-done-right'], ['@goy/svg-icons']],
    themeConfig: {
        logo: '/img/logo.png',
        nav: [
            {text: 'Landscape', link: '/'},
            {text: 'Service Guides', link: '/service/'},
            {text: 'FAQ', link: '/faq/'},
            {text: 'Contact us', link: '/contact/faq'},
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
        search: false,
        footer: true,
    },
}