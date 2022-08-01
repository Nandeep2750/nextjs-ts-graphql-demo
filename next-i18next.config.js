module.exports = {
    // debug: process.env.NODE_ENV === 'development',
    debug: false,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es'],
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};