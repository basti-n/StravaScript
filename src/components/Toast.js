import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { css } from 'glamor'

const StyledToastHeadline = styled.h6`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 5px;
`

const StyledToastText = styled.p`
  margin: 0;
  font-size: 12px;
`

function Toast({
  duration,
  setGoalReminderLastSeen,
  timeLeftToDailyCodingGoal,
  theme,
  type,
}) {
  const timeToastActive = duration * 1000
  let timeout

  useEffect(
    () =>
      function earlyToastClose() {
        clearTimeout(timeout)
        setGoalReminderLastSeen(Date.now())
      },
    [setGoalReminderLastSeen, timeout]
  )

  toast(
    <ToastContent timeLeftToDailyCodingGoal={timeLeftToDailyCodingGoal} />,
    {
      toastId: type,
      onOpen: () => {
        timeout = setTimeout(
          () => setGoalReminderLastSeen(Date.now()),
          timeToastActive
        )
      },
      className: css({
        background: `${theme.toastBackground}`,
        boxShadow: 'none',
        position: 'absolute',
        top: '80px',
        width: '100%',
      }),
      bodyClassName: css({
        color: `${theme.lightFont}`,
        fontSize: '30px',
      }),
      progressClassName: css({
        background: `${theme.lightFont}`,
        height: '2px',
      }),
    }
  )

  return (
    toast.isActive(type) || (
      <ToastContainer
        autoClose={timeToastActive}
        transition={Flip}
        position={toast.POSITION.TOP_LEFT}
      />
    )
  )
}

function ToastContent({ timeLeftToDailyCodingGoal }) {
  return (
    <>
      <StyledToastHeadline>
        {timeLeftToDailyCodingGoal < 0
          ? `Daily Goal Achieved!`
          : `Your daily goal reminder`}
      </StyledToastHeadline>
      <StyledToastText>
        {timeLeftToDailyCodingGoal < 0
          ? `Congrats, you have already achieved your daily coding goal`
          : `${timeLeftToDailyCodingGoal} min left to achieve your daily coding goal. Go for it!`}{' '}
      </StyledToastText>
    </>
  )
}

export default withTheme(Toast)

Toast.propTypes = {
  duration: PropTypes.number,
  setGoalReminderLastSeen: PropTypes.func,
  timeLeftToDailyCodingGoal: PropTypes.number,
  theme: PropTypes.object,
  type: PropTypes.string,
}

ToastContent.propTypes = {
  timeLeftToDailyCodingGoal: PropTypes.number,
}
