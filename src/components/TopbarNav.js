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

export default function TopbarNav({ subPages, trackingTime, activePage }) {
  function getLinkToPage(page) {
    const mapping = {
      ViewAll: '/',
      Coding: 'code',
      Sports: 'sport',
      Connect: 'connect',
      Howitworks: 'faq',
      MyGoals: 'goals',
      Settings: 'settings',
    }
    console.log(mapping[page.replace(' ', '')])
    return mapping[page.replace(/ /g, '')]
  }

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : null
  }

  console.log(subPages[activePage].name)

  return (
    <StyledTopbar>
      <TimerClock trackingTime={trackingTime} />
      <StyledTopbarNav>
        <ul>
          {subPages[activePage].name.map(page => (
            <StyledTopbarLink
              to={getLinkToPage(page)}
              getProps={isActive}
              key={page}
            >
              {page}
            </StyledTopbarLink>
          ))}
        </ul>
      </StyledTopbarNav>
    </StyledTopbar>
  )
}
