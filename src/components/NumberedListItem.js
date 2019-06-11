import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledNumberedListItem = styled.li`
  align-items: center;
  display: flex;
  margin: 10px 0;
  list-style: none;
  padding: 0;
`

const StyledListItemText = styled.h4`
  color: ${props => props.theme.fontColor};
  font-size: 15px;
  margin: 0;
  padding-bottom: 2px;
`

const StyledListItemNumber = styled.div`
  align-items: center;
  border: 1px solid;
  border-color: ${props => props.theme.fontColorHeadline};
  border-radius: 100%;
  color: ${props => props.theme.fontColorHeadline};
  display: flex;
  height: 25px;
  justify-content: center;
  margin-right: 15px;
  font-size: 18px;
  font-weight: bolder;
  width: 25px;
`

export default function NumberedListItem({ children, number }) {
  return (
    <StyledNumberedListItem>
      <StyledListItemNumber>{number}</StyledListItemNumber>
      <StyledListItemText>{children}</StyledListItemText>
    </StyledNumberedListItem>
  )
}

NumberedListItem.propTypes = {
  children: PropTypes.string,
  number: PropTypes.number,
}
