import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.brand};
  color: ${transparentize(0.5, colors.white)};
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const Description = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 400;
`

interface HeaderProps {
  title: string
  description: string
}

const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">
        {title}
        <Description>{description}</Description>
      </HomepageLink>
    </HeaderInner>
  </StyledHeader>
)

export default Header
