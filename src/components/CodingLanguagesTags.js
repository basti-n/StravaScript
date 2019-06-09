import React from 'react'
import styled from 'styled-components'

const StyledLanguageTagsContainer = styled.div`
  display: flex;
  font-size: 0.7rem;
  letter-spacing: 1px;
  font-weight: 700;
  text-transform: uppercase;
`

const StyledLanguageTags = styled.span`
  background: ${props =>
    props.language === 'backend'
      ? props.theme.fontColorGrey
      : props.language === 'css'
      ? props.theme.secondaryColor3
      : props.theme.secondaryColor2};
  color: ${props =>
    props.language === 'backend' ? 'var(--dark-font)' : 'var(--light-font)'};
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 10px;
`

export default function CodingLanguagesTags({ languages }) {
  return (
    <StyledLanguageTagsContainer>
      {languages.map(language => (
        <StyledLanguageTags key={language} language={language}>
          {language}
        </StyledLanguageTags>
      ))}
    </StyledLanguageTagsContainer>
  )
}
