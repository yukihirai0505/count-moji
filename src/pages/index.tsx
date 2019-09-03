import React, { useState } from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import kuromoji from 'kuromoji'
import styled from '@emotion/styled'

const Item = styled.div`
  width: 100%;
`

const StyledSkeleton = styled.div`
  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 40px;
  }
`

const StyledTable = styled.table`
  width: 100%;
  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 40px;
  }
`

const StyledTextarea = styled.textarea`
  height: 364px;
  width: 100%;
`

const mapSortByValue = (map: Map<string, number>): Map<string, number> => {
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]))
}

const IndexPage = () => {
  const [inputVal, setInputVal] = useState('')
  const [words, setWords] = useState<Map<string, number>>(() => new Map())
  const [isLoading, setLoading] = useState(false)
  const changeInput = (value: string) => {
    setInputVal(value)
  }
  const countMoji = () => {
    setLoading(true)
    kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
      console.log('start kuromoji')
      if (err) {
        console.log(err)
      } else {
        const tokens = tokenizer.tokenize(inputVal)
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
      setLoading(false)
      console.log('finish kuromoji')
    })
  }
  return (
    <IndexLayout>
      <Page>
        <Container>
          <Item>
            <StyledTextarea value={inputVal} onChange={e => changeInput(e.target.value)} />
            <button onClick={countMoji}>カウントする</button>
          </Item>
          <Item>
            {isLoading ? (
              <StyledSkeleton>
                <p>カウント中...</p>
              </StyledSkeleton>
            ) : (
              <StyledTable>
                <thead>
                  <tr>
                    <th>単語</th>
                    <th>カウント</th>
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
            )}
          </Item>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
