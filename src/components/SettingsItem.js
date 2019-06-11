import React from 'react'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import styled, { withTheme } from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

const StyledSettingsItem = styled.form`
  display: flex;
  font-size: 15px;
  margin: 18px 0;
  padding: 0 15px;

  label {
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    color: ${props => props.theme.fontColor};
    display: grid;
    grid-template-columns: 50px 1fr 60px;
    padding-bottom: 3px;
    width: 100%;
  }

  img {
    margin-top: -3px;
  }
`

function SettingsItem({ icon, isChecked, label, setValue, theme }) {
  function handleChange() {
    setValue(!isChecked)
  }

  const SettingsToggle = withStyles({
    switchBase: {
      color: theme.lightFont,
      '&$checked': {
        color: theme.fontColorHeadline,
      },
      '&$checked + $track': {
        backgroundColor: theme.fontColorHeadline,
      },
    },
    track: {
      backgroundColor: 'lightgray',
    },
    checked: {},
  })(Switch)

  return (
    <StyledSettingsItem>
      <label>
        <img src={icon} alt="settings icon" />
        {label}
        <SettingsToggle checked={isChecked} onChange={handleChange} />
      </label>
    </StyledSettingsItem>
  )
}

export default withTheme(SettingsItem)

SettingsItem.propTypes = {
  icon: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  setValue: PropTypes.func,
  theme: PropTypes.object,
}
