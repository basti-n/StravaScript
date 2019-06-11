import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTagsContainer = styled.div`
  display: flex;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const StyledTags = styled.span`
  background: ${props =>
    props.language === 'backend'
      ? props.theme.fontColorGrey
      : props.language === 'css'
      ? props.theme.secondaryColor3
      : props.theme.secondaryColor2};
  border-radius: 10px;
  color: ${props =>
    props.language === 'backend'
      ? props.theme.darkFont
      : props.theme.lightFont};
  margin-left: 5px;
  padding: 5px 10px;
`

export default function CodingLanguagesTags({ languages }) {
  return (
    <StyledTagsContainer>
      {languages.map(language => (
        <StyledTags key={language} language={language}>
          {language}
        </StyledTags>
      ))}
    </StyledTagsContainer>
  )
}

CodingLanguagesTags.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string),
}
