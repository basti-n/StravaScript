import React from 'react'
import styled from 'styled-components'

const StyledLineActivity = styled.div`
  display: grid;
  grid-template-rows: auto 6px auto;
  grid-row-gap: 5px;
  align-items: center;
  min-width: fit-content;
  width: ${props => props.width}%;
  color: ${props => props.color};

  h5,
  h6 {
    margin: 0;
    text-align: center;
    white-space: nowrap;
  }

  h5 {
    color: ${props =>
      props.theme.name === 'dark' ? props.color : props.theme.fontColor};
    font-weight: normal;
    font-size: 0.85rem;
  }

  div {
    font-size: 0.9rem;
    background: ${props => props.color};
    border-radius: 15px;
    height: 100%;
  }
  img {
    justify-self: center;
  }
`

export default function ActivityOnLineChart({
  color,
  width,
  title,
  icon,
  duration,
}) {
  return (
    width > 0 && (
      <StyledLineActivity color={color} width={width}>
        <h6>{duration}</h6>
        <div />
        {icon ? <img src={icon} alt={`${title} icon`} /> : <h5>{title}</h5>}
      </StyledLineActivity>
    )
  )
}
