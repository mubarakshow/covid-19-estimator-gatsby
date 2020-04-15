module.exports = {
  siteMetadata: {
    title: `Covid-19 Estimator`,
    description: `Estimate the impact and severe impact of Covid-19 around the world`,
    author: `@gatsbyjs`,
  },
  plugins: [
    { 
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        whitelist: [
          "body",
          "html",
          "fa",
          "form-control",
          "form-group", 
          "row",
          "col",
          "btn",
          "col-xl-8", 
          'col-xl-6', 
          "col-xl-4",
          "col-lg-6",
          "col-sm-6",
          "col-sm-4",
          "col-6",
          "text-center"
        ],
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders 
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-no-javascript`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
