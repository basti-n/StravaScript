import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import selectedIcon from '../assets/selected-icon-small.svg'

const StyledLanguagePickerContainer = styled.section`
  align-items: center;
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
  padding: 5px;
`

const StyledLanguagePicker = styled.div`
  align-items: center;
  background: ${props =>
    props.active
      ? props.language === 'backend'
        ? props.theme.fontColorGrey
        : props.language === 'css'
        ? props.theme.secondaryColor3
        : props.theme.secondaryColor2
      : props.theme.secondaryColor1};
  border-radius: 6px;
  color: ${props =>
    props.active
      ? props.language === 'backend'
        ? props.theme.darkFont
        : props.theme.lightFont
      : props.theme.darkFont};
  display: flex;
  font-size: ${props => (props.active ? '14px' : '12px')};
  font-weight: ${props => (props.active ? 'bold' : 'light')};
  height: 36px;
  justify-content: center;
  position: relative;
  width: 30%;
  img {
    position: absolute;
    right: -3px;
    top: -8px;
  }
`

export default function LanguagePicker({
  availableLanguages,
  selectedLanguages,
  setSelectedLanguages,
}) {
  const handleSelectLanguage = language => {
    selectedLanguages.includes(language)
      ? setSelectedLanguages(
          selectedLanguages.filter(
            selectedLanguage => selectedLanguage !== language
          )
        )
      : setSelectedLanguages(prevState => [...prevState, language])
  }

  return (
    <StyledLanguagePickerContainer selectedLanguages={selectedLanguages}>
      {availableLanguages.map(language => {
        const active = selectedLanguages.includes(language)
        return (
          <StyledLanguagePicker
            key={language}
            language={language}
            active={active}
            onClick={() => handleSelectLanguage(language)}
          >
            {language}
            {active && <img src={selectedIcon} alt="select icon" />}
          </StyledLanguagePicker>
        )
      })}
    </StyledLanguagePickerContainer>
  )
}

StyledLanguagePicker.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string),
  selectedLanguages: PropTypes.arrayOf(PropTypes.string),
  setSelectedLanguages: PropTypes.func,
}
