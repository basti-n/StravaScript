import home from './assets/home.svg'
import connect from './assets/connect.svg'
import settings from './assets/settings.svg'

import homeActive from './assets/home-active.svg'
import connectActive from './assets/connect-active.svg'
import settingsActive from './assets/settings-active.svg'

export const pages = {
  home: {
    page: 'home',
    name: ['View All', 'Coding', 'Sports'],
    path: ['/', '/code', 'sport'],
    src: home,
    srcActive: homeActive,
  },
  connect: {
    page: 'connect',
    name: ['Connect', 'How it works'],
    path: ['/connect', '/faq'],
    src: connect,
    srcActive: connectActive,
  },
  goals: {
    page: 'goals',
    name: ['My Goals', 'Settings'],
    path: ['/goals', '/settings'],
    src: settings,
    srcActive: settingsActive,
  },
}
