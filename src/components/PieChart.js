import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import 'chartjs-plugin-labels'
import styled from 'styled-components'
import { hexToRgb } from '../utils'

defaults.global.defaultFontFamily =
  '-apple-system, BlinkMacSystemFont, sans-serif;'

const StyledDonutContainer = styled.section`
  height: 200px;
  display: flex;
  justify-content: center;
`

const StyledTag = styled.img`
  width: 100px;
  position: absolute;
`
const StyledTagOpen = styled(StyledTag)`
  left: 5px;
  top: 105px;
`
const StyledTagClose = styled(StyledTag)`
  right: 5px;
  top: 105px;
`

export default function PieChart({ codingData, stravaData, labels }) {
  const [activePie, setActivePie] = useState(codingData)
  const options = {
    cutoutPercentage: 75,
    animation: { animateScale: true },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    maintainAspectRation: false,
    plugins: {
      labels: {
        render: 'label',
        position: 'default',
        fontColor: function(pie) {
          var rgb = hexToRgb(pie.dataset.backgroundColor[pie.index])
          var threshold = 140
          var luminance = 0 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b
          return luminance > threshold ? '#000000' : '#FFFFFF'
        },
        fontSize: '12',
        fontStyle: 'bold',
        arc: true,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      },
    },
  }

  const view = {
    labels: activePie === stravaData ? labels.stravaData : labels.codingData,
    datasets: [
      {
        data: activePie,
        backgroundColor: ['#D8D8D8', '#0072C2', '#FDE100'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }

  function handleFilterChange() {
    setActivePie(prevState =>
      prevState === stravaData ? codingData : stravaData
    )
  }

  return (
    <StyledDonutContainer>
      <StyledTagOpen
        src="/assets/openTag.svg"
        alt="html tag open"
        onClick={handleFilterChange}
      />
      <Doughnut data={view} options={options} />
      <StyledTagClose
        src="/assets/closeTag.svg"
        alt="html tag close"
        onClick={handleFilterChange}
      />
    </StyledDonutContainer>
  )
}
