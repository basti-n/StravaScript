import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import 'chartjs-plugin-labels'
import styled from 'styled-components'
import { hexToRgb } from '../utils'

defaults.global.defaultFontFamily =
  '-apple-system, BlinkMacSystemFont, sans-serif;'

const StyledDonutContainer = styled.section`
  display: flex;
  justify-content: center;
`

const StyledTag = styled.img`
  width: 100px;
  position: absolute;
`
const StyledTagOpen = styled(StyledTag)`
  left: 5px;
  top: 53px;
`
const StyledTagClose = styled(StyledTag)`
  right: 5px;
  top: 53px;
`

export default function PieChart({
  codingData,
  stravaData,
  labels,
  totalData,
}) {
  const [activeFilter, setActiveFilter] = useState('totalData')
  function getLabel(activeFilter) {
    return activeFilter === 'stravaData'
      ? labels.stravaData
      : activeFilter === 'codingData'
      ? labels.codingData
      : labels.totalData
  }

  function getChartData(activeFilter) {
    return activeFilter === 'stravaData'
      ? stravaData
      : activeFilter === 'codingData'
      ? codingData
      : totalData
  }

  function getBgColor(activeFilter) {
    return activeFilter === 'stravaData'
      ? ['#F8F8F8', '#E8E8E8', '#D8D8D8']
      : activeFilter === 'codingData'
      ? ['#D8D8D8', '#0072C2', '#FDE100']
      : ['#2E8B57', '#E8E8E8']
  }

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
        position: 'default',
        fontColor: function(pie) {
          var rgb = hexToRgb(pie.dataset.backgroundColor[pie.index])
          var threshold = 140
          var luminance = 0 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b
          return luminance > threshold ? '#000000' : '#FFFFFF'
        },
        fontSize: '12',
        fontStyle: 'bold',
        arc: activeFilter === 'stravaData' ? false : true,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        render: activeFilter === 'stravaData' ? 'image' : 'label',
        images: [
          { src: '/assets/bike-small.svg', width: 18, height: 18 },
          { src: '/assets/run-small.svg', width: 18, height: 18 },
          { src: '/assets/weighttraining-small.svg', width: 18, height: 18 },
        ],
      },
    },
  }

  const view = {
    labels: getLabel(activeFilter),
    datasets: [
      {
        data: getChartData(activeFilter),
        backgroundColor: getBgColor(activeFilter),
      },
    ],
  }

  function handleFilterChange(direction) {
    setActiveFilter(prevState => {
      if (prevState === 'codingData') {
        return direction === 'right' ? 'stravaData' : 'totalData'
      }
      if (prevState === 'stravaData') {
        return direction === 'right' ? 'totalData' : 'codingData'
      } else {
        return direction === 'right' ? 'codingData' : 'stravaData'
      }
    })
  }

  return (
    <StyledDonutContainer>
      <StyledTagOpen
        src="/assets/openTag.svg"
        alt="html tag open"
        onClick={() => handleFilterChange('left')}
      />
      <Doughnut data={view} options={options} />
      <StyledTagClose
        src="/assets/closeTag.svg"
        alt="html tag close"
        onClick={() => handleFilterChange('right')}
      />
    </StyledDonutContainer>
  )
}
