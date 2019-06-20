import React from 'react'
import ActivityCard from './ActivityCard'
import { shallow } from 'enzyme'

describe('ActivityCard', () => {
  it('should render correctly with test activity', () => {
    const activity = {
      elapsed_time: 1230,
      languages: ['js'],
      name: 'Coding Activity',
      startDate: '2019-06-19T08:48:17.177Z',
      type: 'Code',
    }
    const component = shallow(<ActivityCard activity={activity} />)

    expect(component).toMatchSnapshot()
  })
})
