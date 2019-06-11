import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from '@material-ui/lab/Slider'
import { StyledContainer } from './StyledComponents'

const StyledSliderHeadline = styled.h5`
  align-items: center;
  color: ${props => props.theme.fontColor};
  display: flex;
  font-size: 18px;
  font-weight: 100;
  justify-content: center;
  margin-bottom: 35px;

  span {
    font-weight: 600;
    padding-left: 5px;
  }
`

export default function GoalSlider({ page, setWeeklyGoal, weeklyGoal }) {
  function handleGoalChange(event, value) {
    setWeeklyGoal(weeklyGoal => ({ ...weeklyGoal, [page]: value }))
  }

  return (
    <StyledContainer>
      <StyledSliderHeadline>
        weekly goal: <span> {weeklyGoal[page]}h</span>
      </StyledSliderHeadline>

      <Slider
        style={{ touchAction: 'none' }}
        type="range"
        min={0}
        max={20}
        step={1}
        value={weeklyGoal[page]}
        onChange={handleGoalChange}
      />
    </StyledContainer>
  )
}

GoalSlider.propTypes = {
  page: PropTypes.string,
  setWeeklyGoal: PropTypes.func,
  weeklyGoal: PropTypes.objectOf(PropTypes.number),
}
