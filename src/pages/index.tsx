import React, { useState } from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import kuromoji from 'kuromoji'
import styled from '@emotion/styled'

const StyledTable = styled.table`
  width: 100%;
  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 40px;
  }
`

const mapSortByValue = (map: Map<string, number>): Map<string, number> => {
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]))
}

const IndexPage = () => {
  const [inputVal, setInputVal] = useState('')
  const [words, setWords] = useState<Map<string, number>>(() => new Map())
  const changeInput = (value: string) => {
    setInputVal(value)
    kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
      if (err) {
        console.log(err)
      } else {
        const tokens = tokenizer.tokenize(value)
        const nouns = new Map<string, number>()
        tokens.forEach(token => {
          const word = token.surface_form
          if (token.pos === '名詞' && !word.match(/[^ぁ-んァ-ンーa-zA-Z0-9一-龠０-９\-\r]+/u)) {
            const count = nouns.get(word)
            nouns.set(word, count ? count + 1 : 1)
          }
        })
        setWords(mapSortByValue(nouns))
      }
    })
  }
  return (
    <IndexLayout>
      <Page>
        <Container>
          <div style={{ width: '100%' }}>
            <textarea style={{ height: '364px', width: '100%' }} value={inputVal} onChange={e => changeInput(e.target.value)} />
          </div>
          <div style={{ width: '100%' }}>
            <StyledTable>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {words &&
                  [...words.entries()].map((word, idx) => (
                    <tr key={idx}>
                      <td>{word[0]}</td>
                      <td>{word[1]}</td>
                    </tr>
                  ))}
              </tbody>
            </StyledTable>
          </div>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
