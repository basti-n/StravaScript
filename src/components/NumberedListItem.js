import React from 'react'
import styled from 'styled-components'

const StyledNumberedListItem = styled.li`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 10px 0;
  align-items: center;

  h4 {
    font-size: 15px;
    margin: 0;
    padding-bottom: 2px;
  }
`

const StyledListItemNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 25px;
  height: 25px;
  margin-right: 15px;
  border: 1px solid var(--primary-color);
  border-radius: 100%;
  color: var(--primary-color);
  font-weight: bolder;
`

export default function NumberedListItem({ number, children }) {
  return (
    <StyledNumberedListItem>
      <StyledListItemNumber>{number}</StyledListItemNumber>
      <h4>{children}</h4>
    </StyledNumberedListItem>
  )
}