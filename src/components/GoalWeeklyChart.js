import React from 'react'
import styled from 'styled-components'

const StyledWeeklyChart = styled.section`
  display: flex;
  padding: 0 15px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`

const StyledDailyChart = styled.div`
  width: 10px;
  height: 100px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background: var(--bg-grey);
  position: relative;

  > div {
    border-radius: 10px;
    background: var(--primary-color);
    height: ${props => props.height}%;
    width: 10px;
    position: absolute;
    bottom: 0;
  }

  p {
    position: absolute;
    bottom: -15px;
    font-size: 12px;
    font-weight: lighter;
    margin: 0;
  }
`

export default function GoalWeeklyChart({ height }) {
  return (
    <StyledWeeklyChart>
      <StyledDailyChart height={70}>
        <div />
        <p>Mo</p>
      </StyledDailyChart>
      <StyledDailyChart height={30}>
        <div />
        <p>Di</p>
      </StyledDailyChart>
      <StyledDailyChart height={10}>
        <div />
        <p>MI</p>
      </StyledDailyChart>
      <StyledDailyChart height={100}>
        <div />
        <p>Do</p>
      </StyledDailyChart>
      <StyledDailyChart height={90}>
        <div />
        <p>Fr</p>
      </StyledDailyChart>
      <StyledDailyChart height={90}>
        <div />
        <p>Sa</p>
      </StyledDailyChart>
      <StyledDailyChart height={20}>
        <div />
        <p>So</p>
      </StyledDailyChart>
    </StyledWeeklyChart>
  )
}
