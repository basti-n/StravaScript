import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

const StyledNavigationBar = styled.nav`
  display: flex;
  background: black;
  color: white;
  bottom: 0;
  position: sticky;
  width: 100%;
  height: 70px;

  ul {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    justify-content: space-around;
    align-items: center;
    color: var(--light-font);
  }

  img {
    width: 35px;
  }
`

const StyledNavLink = styled(Link)`
  color: var(--light-font);
  text-decoration: none;
`

export default function NavigationBar({ subPages, activePage, setActivePage }) {
  const names = Object.keys(subPages)

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'nav-active' } : null
  }

  return (
    <StyledNavigationBar>
      <ul>
        {names.map(page => (
          <StyledNavLink
            to={page === 'home' ? `/` : `/${page}`}
            getProps={isActive}
            key={page}
            onClick={() => {
              window.scrollTo(0, 0)
              setActivePage(subPages[page].page)
            }}
          >
            <img
              src={
                subPages[page].page === activePage
                  ? subPages[page].srcActive
                  : subPages[page].src
              }
              alt={`${subPages[page].page} icon`}
            />
          </StyledNavLink>
        ))}
      </ul>
    </StyledNavigationBar>
  )
}
