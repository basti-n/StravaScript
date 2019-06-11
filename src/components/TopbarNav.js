import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from '@reach/router'
import TimerClock from './TimerClock'

const StyledTopbar = styled.header`
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.fontColorNav};
  font-size: 16px;
  display: grid;
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  grid-template-rows: 2fr 1fr;
  align-items: center;
`

const StyledTopbarNav = styled.nav`
  ul {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    a {
      width: 100%;
    }
  }
`

const StyledTopbarLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const TopBarActive = createGlobalStyle`
  .topbar-active {
  border-bottom: 3px solid;
  border-color: ${props => props.theme.borderColorNav};
  color: white;
  text-decoration: none;
  padding-bottom: 5px;
  font-weight: bold;
  }`

export default function TopbarNav({
  subPages,
  startTime,
  activePage,
  setActivePage,
}) {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'topbar-active' } : false
  }

  return (
    <StyledTopbar>
      <TimerClock startTime={startTime} />
      <StyledTopbarNav>
        <TopBarActive />
        <ul>
          {subPages[activePage].name.map((page, index) => (
            <StyledTopbarLink
              to={subPages[activePage].path[index]}
              getProps={isActive}
              key={page}
              onClick={() => {
                setActivePage(subPages[activePage].page)
                window.scroll({ top: 0, left: 0, behavior: 'smooth' })
              }}
            >
              {page}
            </StyledTopbarLink>
          ))}
        </ul>
      </StyledTopbarNav>
    </StyledTopbar>
  )
}
