import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const activityTypeIcon = {
  Ride: '/assets/bike.svg',
  Workout: '/assets/dumbbell.svg',
  WeightTraining: '/assets/dumbbell.svg',
  Run: '/assets/run.svg',
  Code: '/assets/vectorpaint.svg'
}

const StyledCard = styled.article`
  background: var(--grey);
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 20px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--dark-font);
  display: flex;
  height: 30px;
  padding: 0 10px 5px;
  justify-content: space-between;

  h2 {
    font-size: 0.7em;
  }

  p {
    font-size: 0.7em;
  }
`

const StyledCardBody = styled.div`
  display: grid;
  padding: 0 5px;
  align-items: center;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: min-content;

  img {
    grid-row: 1 / 3;
    width: 50%;
  }
  p,
  label {
    font-size: 0.7em;
    margin: 5px 0 0 auto;
  }

  label {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-items: end;
    align-self: start;
    color: var(--red-font);

    img {
      grid-column: 2 / -1;
      margin-top: -5px;
      margin-left: 5px;
      width: 25px;
    }
  }
`

export default function ActivityCard({ activity }) {
  return (
    <StyledCard>
      <StyledCardHeader>
        <h2>{activity.name}</h2>
        <p>{moment(activity.start_date).format('Do MMM YYYY')}</p>
      </StyledCardHeader>
      <StyledCardBody>
        <img src={activityTypeIcon[activity.type]} alt='' />
        <p>{Math.round(activity.elapsed_time / 60)} min</p>
        <label>
          {activity.type === 'Code'
            ? 'HTML, CSS, JS'
            : activity.average_heartrate
            ? `Avg. HR ${Math.round(activity.average_heartrate)}`
            : `n/a`}

          {activity.type !== 'Code' && (
            <img src='/assets/heart-rate.svg' alt='heartrate monitor' />
          )}
        </label>
      </StyledCardBody>
    </StyledCard>
  )
}
