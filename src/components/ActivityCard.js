import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tags from './Tags'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const activityTypeImg = {
  Code: { src: '/assets/code.svg', alt: 'code tag icon' },
  Ride: { src: '/assets/bike.svg', alt: 'ride icon' },
  Run: { src: './assets/run.svg', alt: 'run icon' },
  Walk: { src: '/assets/run.svg', alt: 'run icon' },
  WeightTraining: { src: '/assets/dumbbell.svg', alt: 'weight icon' },
  Workout: { src: '/assets/dumbbell.svg', alt: 'weight icon' },
}

const StyledCard = styled.article`
  background: ${props => props.theme.secondaryColor1};
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px 15px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #000000;
  display: flex;
  height: 30px;
  margin-bottom: 3px;
  padding: 0 10px 5px;
  justify-content: space-between;
  h2,
  p {
    font-size: 15px;
  }
`

const StyledCardBody = styled.section`
  align-items: center;
  display: grid;
  font-size: 15px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: fit-content;
  padding: 0 5px;

  img {
    grid-row: 1 / 3;
    padding-left: 5px;
    width: 75px;
  }
  p,
  label {
    margin: 5px 0 0 auto;
  }

  label {
    align-self: start;
    color: ${props => props.theme.red};
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-items: end;

    img {
      grid-column: 2 / -1;
      margin-top: -5px;
      margin-left: 5px;
      width: 25px;
    }
  }
`

export default function ActivityCard({ activity }) {
  const activityStartDate = moment(activity.start_date).format('Do MMM YYYY')
  const activityImage = activityTypeImg[activity.type]
  const activityTime =
    activity.elapsed_time < 60
      ? `${Math.round(activity.elapsed_time)} sec`
      : `${Math.round(activity.elapsed_time / 60)} min`
  const activitySportInformation = activity.average_heartrate
    ? `Avg. HR ${Math.round(activity.average_heartrate)}`
    : `n/a`
  const activityLabel =
    activity.type === 'Code' ? (
      <Tags languages={activity.languages} />
    ) : (
      <>
        {activitySportInformation}
        <img src="/assets/heart-rate.svg" alt="heartrate monitor" />
      </>
    )

  return (
    <StyledCard>
      <StyledCardHeader>
        <h2>{activity.name}</h2>
        <p>{activityStartDate}</p>
      </StyledCardHeader>
      <StyledCardBody>
        <img {...activityImage} alt="activity" />
        <p>{activityTime}</p>
        <label>{activityLabel}</label>
      </StyledCardBody>
    </StyledCard>
  )
}

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    elapsed_time: PropTypes.number,
    languages: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    start_date: PropTypes.string,
    type: PropTypes.string,
  }),
}

ActivityCard.defaultProps = {
  elapsed_time: 0,
  languages: ['backend', 'css', 'js'],
  name: 'Coding Activity',
  startDate: moment().toISOString(),
  type: 'Code',
}
