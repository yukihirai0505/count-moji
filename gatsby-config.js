'use strict'

module.exports = {
  siteMetadata: {
    title: 'カウント文字',
    description: '文章中の単語を頻出順に表示します。',
    keywords: '文章, コピペ, 頻出順, 頻出単語順, 頻出単語, カウント',
    siteUrl: 'https://count-moji.yabaiwebyasan.com',
    author: {
      name: 'Yuki Hirai',
      url: 'https://twitter.com/iamseninja',
      email: 'yukihirai0505@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
