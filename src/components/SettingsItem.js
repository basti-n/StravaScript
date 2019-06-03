import React from 'react'
import Switch from '@material-ui/core/Switch'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

const StyledSettingsForm = styled.form`
  margin: 18px 0;
  display: flex;
  font-size: 15px;
  padding: 0 15px;

  label {
    display: grid;
    width: 100%;
    grid-template-columns: 50px 1fr 60px;
    align-items: center;
    padding-bottom: 3px;
    border-bottom: 1px solid var(--bg-grey);
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
        color: 'var(--primary-color)',
      },
      '&$checked + $track': {
        backgroundColor: 'var(--primary-color)',
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
