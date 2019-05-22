import React from 'react'
import styled from 'styled-components'

const StyledLanguageTagsContainer = styled.div`
  display: flex;
  color: var(--light-font);
`
const StyledLanguageTags = styled.span`
  background: var(--yellow);
  padding: 5px;
  margin-left: 5px;
`

export default function CodingLanguagesTags({ languages }) {
  return (
    <StyledLanguageTagsContainer>
      {languages.map(language => (
        <StyledLanguageTags>{language}</StyledLanguageTags>
      ))}
    </StyledLanguageTagsContainer>
  )
}
