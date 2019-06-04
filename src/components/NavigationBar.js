import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

const StyledNavigationBar = styled.nav`
  display: flex;
  background: ${props => props.theme.colorNavBar};
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 70px;
  z-index: 2;

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
              window.scroll({ top: 0, left: 0, behavior: 'smooth' })
              setActivePage(subPages[page].page)
            }}
            suppressClassNameWarning
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
