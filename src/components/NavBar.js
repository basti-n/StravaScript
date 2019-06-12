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
  color: ${props => props.theme.lightFont};
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
  color: ${props => props.theme.lightFont};
`

const NavLinkActive = createGlobalStyle`
  .nav-active {
    transform: rotateY(360deg);
    transition: all 0.7s ease-in;
  }
`

function NavBar({ activePage, handlePageChange, pages, theme }) {
  const pageNames = Object.keys(pages)

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'nav-active' } : null
  }

  function getPageName(page) {
    return pages[page].page
  }

  function getNavIcon(page) {
    return theme.navIcons[page]
  }

  return (
    <StyledNavBar>
      <NavLinkActive />
      <StyledNavItem>
        {pageNames.map(page => (
          <StyledNavLink
            getProps={isActive}
            key={page}
            onClick={() => handlePageChange(getPageName(page))}
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
  pages: PropTypes.objectOf(
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
