import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import kuromoji from 'kuromoji'

const IndexPage = () => {
  const text = `おはよう世界`
  kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
    if (err) {
      console.log(err)
    } else {
      const tokens = tokenizer.tokenize(text)
      console.log(tokens)
    }
  })
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <Link to="/page-2/">Go to page 2</Link>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
