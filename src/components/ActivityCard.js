/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled from 'styled-components'
import CodingLanguagesTags from './CodingLanguagesTags'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

const activityTypeImg = {
  Ride: { src: '/assets/bike.svg', alt: 'ride icon' },
  Workout: { src: '/assets/dumbbell.svg', alt: 'weight icon' },
  WeightTraining: { src: '/assets/dumbbell.svg', alt: 'weight icon' },
  Run: { src: './assets/run.svg', alt: 'run icon' },
  Walk: { src: '/assets/run.svg', alt: 'run icon' },
  Code: { src: '/assets/code.svg', alt: 'code tag icon' },
}

const StyledCard = styled.article`
  background: ${props => props.theme.secondaryColor1};
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 20px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #000000;
  display: flex;
  height: 30px;
  padding: 0 10px 5px;
  justify-content: space-between;
  margin-bottom: 3px;
  h2,
  p {
    font-size: 15px;
  }
`

const StyledCardBody = styled.section`
  display: grid;
  padding: 0 5px;
  align-items: center;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: fit-content;
  font-size: 15px;

  img {
    grid-row: 1 / 3;
    width: 75px;
    padding-left: 5px;
  }
  p,
  label {
    margin: 5px 0 0 auto;
  }

  label {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-items: end;
    align-self: start;
    color: ${props => props.theme.red};

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
        <img {...activityTypeImg[activity.type]} />
        <p>
          {activity.elapsed_time < 60
            ? `${Math.round(activity.elapsed_time)} sec`
            : `${Math.round(activity.elapsed_time / 60)} min`}
        </p>
        <label>
          {activity.type === 'Code' ? (
            <CodingLanguagesTags languages={activity.languages} />
          ) : activity.average_heartrate ? (
            `Avg. HR ${Math.round(activity.average_heartrate)}`
          ) : (
            `n/a`
          )}

          {activity.type !== 'Code' && (
            <img src="/assets/heart-rate.svg" alt="heartrate monitor" />
          )}
        </label>
      </StyledCardBody>
    </StyledCard>
  )
}
