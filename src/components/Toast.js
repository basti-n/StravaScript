import React from 'react'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { css } from 'glamor'

export default function Toast({
  timeLeftDailyGoal,
  setTimeGoalReminderLastSeen,
}) {
  const duration = 5000
  toast(<ToastText timeLeftDailyGoal={timeLeftDailyGoal} />, {
    toastId: 'goal',
    onOpen: () => {
      setTimeout(() => setTimeGoalReminderLastSeen(Date.now()), duration)
    },
    className: css({
      position: 'absolute',
      top: '80px',
      boxShadow: 'none',
      left: '0px',
      background: 'var(--toast-background)',
      width: '100vw',
    }),
    bodyClassName: css({
      color: 'white',
      fontSize: '30px',
    }),
    progressClassName: css({
      background: 'white',
      height: '2px',
    }),
  })

  return (
    toast.isActive('goal') || (
      <ToastContainer
        autoClose={duration}
        transition={Flip}
        position={toast.POSITION.TOP_LEFT}
      />
    )
  )
}

function ToastText({ timeLeftDailyGoal }) {
  return (
    <>
      <h6
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 'bold',
          paddingBottom: '5px',
        }}
      >
        {timeLeftDailyGoal < 0
          ? `Daily Goal Achieved!`
          : `Your daily goal reminder`}
      </h6>
      <p style={{ margin: 0, fontSize: '12px' }}>
        {timeLeftDailyGoal < 0
          ? `Congrats, you have already achieved your daily coding goal`
          : `${timeLeftDailyGoal} min left to achieve your daily coding goal. Go for it!`}{' '}
      </p>
    </>
  )
}
