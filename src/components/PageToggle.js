import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPageToggle = styled.ul`
  border-bottom: 1px solid;
  border-color: ${props => props.theme.toggleBorder};
  display: grid;
  font-size: 15px;
  grid-auto-rows: 35px;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  margin: 30px 20px;
  padding: 0;
`

const StyledToggle = styled.li`
  align-items: center;
  background: ${props =>
    props.active ? props.theme.fontColorHeadline : 'transparent'};
  border-radius: ${props => (props.active ? '5px' : '0')};
  color: ${props =>
    props.active ? props.theme.lightFont : props.theme.toggleBorder};
  cursor: pointer;
  display: flex;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  justify-content: center;
  margin: ${props => (props.active ? '0 -2px' : '0')};
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.3s ease-in-out;
`

export default function PageToggle({ activePage, pages, setActivePage }) {
  return (
    <StyledPageToggle>
      {pages.map(page => (
        <StyledToggle
          active={activePage === page}
          key={page}
          onClick={() => setActivePage(page)}
        >
          {page}
        </StyledToggle>
      ))}
    </StyledPageToggle>
  )
}

PageToggle.propTypes = {
  activePage: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.string),
  setActivePage: PropTypes.func,
}
