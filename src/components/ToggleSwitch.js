import React from 'react'
import styled from 'styled-components'

const StyledToggleSwitch = styled.ul`
  list-style: none;
  margin: 30px 20px;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 35px;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.toggleBorder};
  font-size: 15px;
`

const StyledToggle = styled.li`
  align-items: center;
  background: ${props =>
    props.active ? props.theme.fontColorHeadline : 'transparent'};
  border-radius: ${props => (props.active ? '5px' : '0')};
  color: ${props => (props.active ? '#FFFFFF' : '#D8D8D8')};
  cursor: pointer;
  display: flex;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  justify-content: center;
  margin: ${props => (props.active ? '0 -2px' : '0')};
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.3s ease-in-out;
`

export default function ToggleSwitch({ pages, activePage, setActivePage }) {
  return (
    <StyledToggleSwitch>
      {pages.map(page => (
        <StyledToggle
          key={page}
          active={activePage === page}
          onClick={() => setActivePage(page)}
        >
          {page}
        </StyledToggle>
      ))}
    </StyledToggleSwitch>
  )
}
