import React from 'react'
import styled from 'styled-components'

const StyledLanguagePickerContainer = styled.section`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  flex-wrap: none;
`

const StyledLanguagePicker = styled.div`
  align-self: center;
  background: ${props =>
    props.active
      ? props.language === 'backend'
        ? 'var(--bg-grey)'
        : props.language === 'css'
        ? 'var(--blue)'
        : 'var(--yellow)'
      : 'var(--grey)'};
  color: ${props =>
    props.active
      ? props.language === 'backend'
        ? 'var(--dark-font)'
        : 'var(--light-font)'
      : 'var(--dark-font)'};
  height: 36px;
  width: 30%;
  font-size: ${props => (props.active ? '14px' : '12px')};
  font-weight: ${props => (props.active ? 'bold' : 'light')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  position: relative;
  img {
    position: absolute;
    top: -8px;
    right: -3px;
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
        let active = selectedLanguages.includes(language)
        return (
          <StyledLanguagePicker
            key={language}
            language={language}
            active={active}
            onClick={() => handleSelectLanguage(language)}
          >
            {language}
            {active && (
              <img src="/assets/selected-icon-small.svg" alt="select icon" />
            )}
          </StyledLanguagePicker>
        )
      })}
    </StyledLanguagePickerContainer>
  )
}
