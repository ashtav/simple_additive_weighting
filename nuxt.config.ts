import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    components: {
        global: true,
        dirs: [
            '~/components',
        ]
    },

    meta: {
        title: 'Rate Us',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://preview.tabler.io/dist/css/tabler.min.css?1656285031'
            },
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/@tabler/icons@latest/iconfont/tabler-icons.min.css'
            }
        ]
    },

    plugins: [
        {
            src: '@/plugins/simple_additive_weighting.ts',
            ssr: true
        },

        { src : '@/plugins/apexcharts.client.js', ssr: false, mode: 'client' },
    ],

    // buildDir: 'nuxt-dist'

})
