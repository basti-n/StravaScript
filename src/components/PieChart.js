import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Doughnut, defaults } from 'react-chartjs-2'
import 'chartjs-plugin-labels'
import styled, { withTheme } from 'styled-components'
import { hexToRgb } from '../utils'

defaults.global.defaultFontFamily = 'Libre Franklin, sans-serif;'

const StyledPieChart = styled.section`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: center;
  width: 100%;
`

const StyledTag = styled.img`
  position: absolute;
  width: 100px;
`
const StyledTagOpen = styled(StyledTag)`
  left: 5px;
`
const StyledTagClose = styled(StyledTag)`
  right: 5px;
`

function PieChart({
  backgroundColor,
  codingData,
  labels,
  stravaData,
  theme,
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
    return backgroundColor[activeFilter]
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
          return luminance > threshold ? theme.darkFont : theme.lightFont
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

  const data = {
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
      const filters = Object.keys(labels)
      const index = filters.indexOf(prevState)
      switch (direction) {
        case 'right':
          return index < filters.length - 1 ? filters[index + 1] : filters[0]
        case 'left':
          return index < 1 ? filters[filters.length - 1] : filters[index - 1]
        default:
          return filters[index]
      }
    })
  }

  return (
    <StyledPieChart>
      <StyledTagOpen
        src="/assets/openTag.svg"
        alt="html tag open"
        onClick={() => handleFilterChange('left')}
      />
      <Doughnut data={data} options={options} />
      <StyledTagClose
        src="/assets/closeTag.svg"
        alt="html tag close"
        onClick={() => handleFilterChange('right')}
      />
    </StyledPieChart>
  )
}

export default withTheme(PieChart)

PieChart.propTypes = {
  backgroundColor: PropTypes.shape({
    stravaData: PropTypes.arrayOf(PropTypes.string),
    codingData: PropTypes.arrayOf(PropTypes.string),
    totalData: PropTypes.arrayOf(PropTypes.string),
  }),
  codingData: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.shape({
    stravaData: PropTypes.arrayOf(PropTypes.string),
    codingData: PropTypes.arrayOf(PropTypes.string),
    totalData: PropTypes.arrayOf(PropTypes.string),
  }),
  stravaData: PropTypes.arrayOf(PropTypes.number),
  theme: PropTypes.object,
  totalData: PropTypes.arrayOf(PropTypes.number),
}
