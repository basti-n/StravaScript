import React from 'react'
import TrackingConfirmationModal, {
  StyledModalButton,
} from './TrackingConfirmationModal'
import { mount } from 'enzyme'

it('new card is created', () => {
  const callback = jest.fn()
  const selectedLanguages = ['css']
  const callbackBtnClick = jest.fn(
    () => selectedLanguages.length > 0 && callback()
  )
  const availableLanguages = ['backend', 'css']

  mount(
    <TrackingConfirmationModal
      availableLanguages={availableLanguages}
      handleTrackingCompleted={callback}
    />
  )
  const button = mount(
    <StyledModalButton activeLanguages={'css'} onClick={callbackBtnClick} />
  )
  button.simulate('click')
  expect(callback).toHaveBeenCalled()
})

it('No coding activity is created unless a language is selected', () => {
  const callback = jest.fn()
  const selectedLanguages = []
  const callbackBtnClick = jest.fn(
    () => selectedLanguages.length > 0 && callback()
  )
  const availableLanguages = ['backend', 'css']

  const modal = mount(
    <TrackingConfirmationModal
      availableLanguages={availableLanguages}
      handleTrackingCompleted={callback}
    />
  )
  const button = mount(
    <StyledModalButton activeLanguages={'css'} onClick={callbackBtnClick} />
  )
  button.simulate('click')
  expect(callback).not.toHaveBeenCalled()

  modal.unmount()
  button.unmount()
})

it('No coding activity is created unless a language is selected', () => {
  const callback = jest.fn()
  const selectedLanguages = []
  const callbackBtnClick = jest.fn(
    () => selectedLanguages.length > 0 && callback()
  )
  const availableLanguages = ['backend', 'css']

  const modal = mount(
    <TrackingConfirmationModal
      availableLanguages={availableLanguages}
      handleTrackingCompleted={callback}
    />
  )

  const button = mount(
    <StyledModalButton activeLanguages={'css'} onClick={callbackBtnClick} />
  )
  button.simulate('click')
  expect(callback).not.toHaveBeenCalled()

  modal.unmount()
  button.unmount()
})
