import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import TimerClock from './TimerClock'

const StyledTopbar = styled.header`
  background: var(--primary-color);
  color: var(--light-font);
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

export default function TopbarNav({
  subPages,
  startTime,
  activePage,
  setActivePage,
  getLinkToPage,
}) {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : null
  }

  return (
    <StyledTopbar>
      <TimerClock startTime={startTime} />
      <StyledTopbarNav>
        <ul>
          {subPages[activePage].name.map((page, index) => (
            <StyledTopbarLink
              to={subPages[activePage].path[index]}
              getProps={isActive}
              key={page}
              suppressClassNameWarning
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
