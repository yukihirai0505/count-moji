import React, { useState } from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
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

interface WordSet {
  word: string
  count: number
}

const IndexPage = () => {
  const [inputVal, setInputVal] = useState('')
  const [words, setWords] = useState<WordSet[]>([])
  const [isLoading, setLoading] = useState(false)
  const changeInput = (value: string) => {
    setInputVal(value)
  }
  const countMoji = async () => {
    setLoading(true)
    const response = await fetch('https://jp-tokenize-api.yukihirai0505.now.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: inputVal })
    })
    setWords(await response.json())
    setLoading(false)
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
                  {console.log(words)}
                  {words &&
                    words.map((w, idx) => (
                      <tr key={idx}>
                        <td>{w.word}</td>
                        <td>{w.count}</td>
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
