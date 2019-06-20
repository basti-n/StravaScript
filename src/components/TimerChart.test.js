import React from 'react'
import { StyledTimerButton } from './TimerChart'
import { mount } from 'enzyme'

it('should be possible to start coding timer', () => {
  const callback = jest.fn()
  const button = mount(<StyledTimerButton onClick={callback} />)

  button.simulate('click')
  expect(callback).toHaveBeenCalled()
  button.unmount()
})
