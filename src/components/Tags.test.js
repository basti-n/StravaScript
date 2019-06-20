import React from 'react'
import Tags from './Tags'
import { mount } from 'enzyme'
const languages = ['js', 'css']

it('accepts language props', () => {
  const wrapper = mount(<Tags languages={languages} />)
  expect(wrapper.props().languages).toEqual(languages)
  wrapper.unmount()
})

it('renders all language props', () => {
  const wrapper = mount(<Tags languages={languages} />)
  const tag = wrapper
    .find('span')
    .first()
    .text()
  expect(tag).toEqual('js')
  wrapper.unmount()
})
