import React, { useState } from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import kuromoji from 'kuromoji'

const filterAndSortByValue = (map: Map<string, number>): Map<string, number> => {
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]).filter(a => a[1] > 1))
}

const IndexPage = () => {
  const [inputVal, setInputVal] = useState('input')
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
          if (token.pos === '名詞') {
            const word = token.surface_form
            const count = nouns.get(word)
            nouns.set(word, count ? count + 1 : 1)
          }
        })
        setWords(filterAndSortByValue(nouns))
      }
    })
  }
  console.log(words)
  return (
    <IndexLayout>
      <Page>
        <Container>
          <textarea value={inputVal} onChange={e => changeInput(e.target.value)} rows={10} />
          <ul>
            {words &&
              [...words.entries()].map((word, idx) => (
                <li key={idx}>
                  {word[0]} {word[1]}
                </li>
              ))}
          </ul>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
