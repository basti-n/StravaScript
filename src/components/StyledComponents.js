import styled from 'styled-components'

export const StyledActivityContainer = styled.section`
  margin: 10px;
`

export const StyledContainer = styled(StyledActivityContainer)`
  padding: 0 10px;
`

export const StyledMainHeadline = styled.h2`
  margin: 30px 0 15px 0;
  font-size: 1.15rem;
  color: var(--primary-color);
  font-weight: 600;
  text-transform: capitalize;
`

export const StyledHeadlineWithIcon = styled.section`
  display: flex;
  align-items: center;
  margin: 34px 0 40px 0;

  img {
    align-self: center;
    margin-right: 10px;
    padding-top: 10px;
  }
`

export const StyledSummaryHeadline = styled.h3`
  font-size: 24px;
  margin: 0 0 30px;
  display: flex;
  align-items: flex-end;

  span {
    color: #b3b3b3;
    font-size: 0.8rem;
    font-weight: normal;
    display: inline-block;
    margin-left: auto;
    padding-bottom: 3px;
  }
`

const Button = styled.button`
  border-radius: 10px;
  padding: 15px 20px;
  width: 60vw;
  outline: none;
  border: none;
  font-weight: bolder;
  font-size: 15px;
  display: block;
  margin: 25px auto;
`

export const ButtonPrimary = styled(Button)`
  background: var(--primary-color);
  color: var(--light-font);
`

export const StyledRegularText = styled.p`
  color: var(--dark-font);
  letter-spacing: 0.6px;
  font-size: 14px;
  font-weight: lighter;
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
