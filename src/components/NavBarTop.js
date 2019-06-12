import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from '@reach/router'
import Timer from './Timer'

const StyledTopBar = styled.header`
  align-items: center;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.fontColorNav};
  display: grid;
  font-size: 16px;
  grid-template-rows: 2fr 1fr;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`

const StyledNavBarTop = styled.nav`
  ul {
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    margin: 0;
    padding: 0;
    text-align: center;
    a {
      width: 100%;
    }
  }
`

const StyledNavBarTopLink = styled(Link)`
  color: ${props => props.theme.lightFont};
  text-decoration: none;
`

const NavBarTopActive = createGlobalStyle`
  .topbar-active {
  border-bottom: 3px solid;
  border-color: ${props => props.theme.borderColorNav};
  color: ${props => props.theme.lightFont};
  font-weight: bold;
  padding-bottom: 5px;
  text-decoration: none;
  }`

export default function NavBarTop({
  activePage,
  handlePageChange,
  pages,
  startTime,
}) {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'topbar-active' } : false
  }

  return (
    <StyledTopBar>
      <Timer startTime={startTime} />
      <StyledNavBarTop>
        <NavBarTopActive />
        <ul>
          {pages[activePage].name.map((page, index) => (
            <StyledNavBarTopLink
              to={pages[activePage].path[index]}
              getProps={isActive}
              key={page}
              onClick={() => handlePageChange(pages[activePage].page)}
            >
              {page}
            </StyledNavBarTopLink>
          ))}
        </ul>
      </StyledNavBarTop>
    </StyledTopBar>
  )
}

NavBarTop.propTypes = {
  activePage: PropTypes.string,
  handlePageChange: PropTypes.func,
  pages: PropTypes.objectOf(
    PropTypes.shape({
      page: PropTypes.string,
      name: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
      srcActive: PropTypes.string,
    })
  ),
  startTime: PropTypes.number,
}
