import styled from 'styled-components'

/*Add overflow auto if topbar should not be removed after specific scroll position */
export const Grid = styled.main`
  display: grid;
  grid-template-rows: 80px 1fr;
  height: 100vh;
`

export const StyledActivityContainer = styled.section`
  margin: 10px;
`

export const StyledContainer = styled(StyledActivityContainer)`
  padding: 0 10px;
`

export const StyledMainHeadline = styled.h2`
  color: ${props => props.theme.fontColorHeadline};
  font-size: 18.5px;
  font-weight: 600;
  margin: 30px 0 15px;
  text-transform: capitalize;

  span {
    color: #b3b3b3;
    font-size: 13px;
    font-weight: normal;
    margin-left: auto;
    padding-bottom: 2px;
  }
`

export const StyledHeadlineWithIcon = styled.section`
  align-items: center;
  display: flex;
  margin: 34px 0 40px;

  img {
    align-self: center;
    margin-right: 10px;
    padding-top: 10px;
  }
`

export const StyledSummaryHeadline = styled.h3`
  align-items: flex-end;
  color: ${props => props.theme.fontColor};
  display: flex;
  font-size: 24px;
  margin: 0 0 30px;

  span {
    color: #b3b3b3;
    font-size: 13px;
    font-weight: normal;
    margin-left: auto;
    padding-bottom: 3px;
  }
`

const Button = styled.button`
  border: none;
  border-radius: 10px;
  display: block;
  font-weight: bolder;
  font-size: 15px;
  margin: 25px auto;
  outline: none;
  padding: 15px 20px;
  width: 60vw;
  @media screen and (min-width: 600px) {
    width: 200px;
  }
`

export const ButtonPrimary = styled(Button)`
  background: ${props => props.theme.fontColorHeadline};
  color: ${props => props.theme.lightFont};
`

export const StyledRegularText = styled.p`
  color: ${props => props.theme.fontColor};
  font-size: 14px;
  font-weight: lighter;
  letter-spacing: 0.6px;
  padding: 0 4px;
  text-align: justify;
  span:first-child {
    margin-top: 10px;
  }
  span {
    display: inline-block;
    margin: 5px 0;
  }
  @media (min-height: 730px) {
    span {
      margin: 10px 0;
    }
  }
`
export const StyledOrderedList = styled.ol`
  padding-left: 25px;
`
export const StyledTextLink = styled.a`
  appearance: none;
  color: ${props => props.theme.fontColor};
  font-size: 12px;
`
