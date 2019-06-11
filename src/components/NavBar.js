import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme, createGlobalStyle } from 'styled-components'
import { Link } from '@reach/router'

const StyledNavBar = styled.nav`
  background: ${props => props.theme.colorNavBar};
  bottom: 0;
  display: flex;
  height: 70px;
  position: sticky;
  width: 100%;
  z-index: 2;
`

const StyledNavItem = styled.ul`
  align-items: center;
  color: var(--light-font);
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  width: 100%;

  img {
    width: 35px;
  }
`

const StyledNavLink = styled(Link)`
  color: var(--light-font);
`

const NavLinkActive = createGlobalStyle`
  .nav-active {
    transform: rotateY(360deg);
    transition: all 0.7s ease-in;
  }
`

function NavBar({ activePage, setActivePage, subPages, theme }) {
  const pages = Object.keys(subPages)

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'nav-active' } : null
  }

  function getPageName(page) {
    return subPages[page].page
  }

  function getNavIcon(page) {
    return theme.navIcons[page]
  }

  function handleClick(page) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    setActivePage(getPageName(page))
  }

  return (
    <StyledNavBar>
      <NavLinkActive />
      <StyledNavItem>
        {pages.map(page => (
          <StyledNavLink
            getProps={isActive}
            key={page}
            onClick={() => handleClick(page)}
            to={page === 'home' ? `/` : `/${page}`}
          >
            <img
              src={
                page === activePage
                  ? getNavIcon(page).srcActive
                  : getNavIcon(page).src
              }
              alt={`${getPageName(page)} icon`}
            />
          </StyledNavLink>
        ))}
      </StyledNavItem>
    </StyledNavBar>
  )
}

export default withTheme(NavBar)

NavBar.propTypes = {
  activePage: PropTypes.string,
  setActivePage: PropTypes.func,
  subPages: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.arrayOf(PropTypes.string),
      page: PropTypes.string,
      path: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
      srcActive: PropTypes.string,
    })
  ),
  theme: PropTypes.object,
}
