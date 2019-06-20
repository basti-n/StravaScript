import React from 'react'
import EmptyState from './EmptyState'
import { mount } from 'enzyme'

it('renders props', () => {
  const wrapper = mount(<EmptyState headline="headline" text="text" />)
  const headline = wrapper.find('h2').text()
  expect(headline).toEqual(headline)

  const text = wrapper.find('p').text()
  expect(text).toEqual(text)

  wrapper.unmount()
})
