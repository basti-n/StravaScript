import React from 'react'
import Switch from '@material-ui/core/Switch'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

const StyledSettingsForm = styled.form`
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

export default function SettingsItem({ icon, label, isChecked, setValue }) {
  function handleChange() {
    setValue(!isChecked)
  }

  const SettingsSwitch = withStyles({
    switchBase: {
      color: 'var(--light-font)',
      '&$checked': {
        color: 'var(--highlight-color)',
      },
      '&$checked + $track': {
        backgroundColor: 'var(--highlight-color)',
      },
    },
    track: {
      backgroundColor: 'lightgray',
    },
    checked: {},
  })(Switch)

  return (
    <StyledSettingsForm>
      <label>
        <img src={icon} alt="settings icon" />
        {label}
        <SettingsSwitch
          value={isChecked}
          checked={isChecked}
          onChange={handleChange}
        />
      </label>
    </StyledSettingsForm>
  )
}
