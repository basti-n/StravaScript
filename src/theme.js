import emptyStateDarkMode from './assets/empty-state-darkMode.svg'
import connectIconDarkMode from './assets/connect-icon-darkMode.svg'
import checkboxIconDarkMode from './assets/checkbox_white-circle-darkMode.svg'
import darkModeIconDarkMode from './assets/darkMode-icon-darkMode.svg'
import notificationIconDarkMode from './assets/notification-icon-darkMode.svg'

import emptyState from './assets/empty-state.svg'
import connectIcon from './assets/connect-icon.svg'
import checkboxIcon from './assets/checkbox_white-circle.svg'
import darkModeIcon from './assets/darkMode-icon.svg'
import notificationIcon from './assets/notification-icon.svg'

//

import bikeDarkMode from './assets/bike-small-darkMode.svg'
import runDarkMode from './assets/run-small-darkMode.svg'
import strengthDarkMode from './assets/weighttraining-small-darkMode.svg'

import bike from './assets/bike-small.svg'
import run from './assets/run-small.svg'
import strength from './assets/weighttraining-small.svg'

//

import home from './assets/home.svg'
import connect from './assets/connect.svg'
import settings from './assets/settings.svg'

import homeActiveDarkMode from './assets/home-active-darkMode.svg'
import connectActiveDarkMode from './assets/connect-active-darkMode.svg'
import settingsActiveDarkMode from './assets/settings-active-darkMode.svg'

import homeActive from './assets/home-active.svg'
import connectActive from './assets/connect-active.svg'
import settingsActive from './assets/settings-active.svg'

export default function getTheme(darkMode) {
  if (darkMode) {
    return {
      name: 'dark',
      background: '#121212',
      borderColorNav: '#BB86FC',
      colorNavBar: '#2c2c2c',
      darkFont: '#000000',
      fontColor: '#FFFFFF',
      fontColorHeadline: '#BB86FC',
      fontColorGrey: '#D8D8D8',
      primaryColor: '#2c2c2c',
      lightFont: '#FFFFFF',
      modalBackground: 'rgba(0, 0, 0, 0.5)',
      secondaryColor1: 'rgba(216, 216, 214, 0.44)',
      secondaryColor2: '#3700B3',
      secondaryColor3: '#03DAC6',
      toggleBorder: '#BB86FC',
      red: '#CD6679',
      rideColor: '#BB86FC',
      runColor: '#985EFF',
      secondaryButtonColor: '#2c2c2c',
      strengthColor: '#7F39FB',
      toastBackground: 'rgba(187, 134, 252, 0.9)',

      checkboxIcon: checkboxIconDarkMode,
      connectIcon: connectIconDarkMode,
      darkModeIcon: darkModeIconDarkMode,
      emptyStateIcon: emptyStateDarkMode,
      notificationIcon: notificationIconDarkMode,

      sportIcons: {
        bike: bikeDarkMode,
        run: runDarkMode,
        strength: strengthDarkMode,
      },

      navIcons: {
        home: {
          page: 'home',
          src: home,
          srcActive: homeActiveDarkMode,
        },
        connect: {
          page: 'connect',
          src: connect,
          srcActive: connectActiveDarkMode,
        },
        goals: {
          page: 'goals',
          src: settings,
          srcActive: settingsActiveDarkMode,
        },
      },
    }
  } else {
    return {
      name: 'light',
      background: '#FFFFFF',
      borderColorNav: '#000000',
      colorNavBar: '#000000',
      darkFont: '#000000',
      fontColor: '#000000',
      fontColorHeadline: '#2E8B57',
      fontColorGrey: '#D8D8D8',
      primaryColor: '#2E8B57',
      lightFont: '#FFFFFF',
      modalBackground: 'rgba(0, 0, 0, 0.5)',
      secondaryColor1: 'rgba(216, 216, 214, 0.44)',
      secondaryColor2: '#FDE100',
      secondaryColor3: '#0072C2',
      toggleBorder: '#B3B3B3',
      red: '#DF4D60',
      rideColor: '#62A881',
      runColor: '#2E8B57',
      secondaryButtonColor: '#fc4c02',
      strengthColor: '#2E7357',
      toastBackground: 'rgba(46, 139, 87, 0.9)',

      checkboxIcon: checkboxIcon,
      connectIcon: connectIcon,
      darkModeIcon: darkModeIcon,
      emptyStateIcon: emptyState,
      notificationIcon: notificationIcon,

      sportIcons: {
        bike: bike,
        run: run,
        strength: strength,
      },

      navIcons: {
        home: {
          page: 'home',
          src: home,
          srcActive: homeActive,
        },
        connect: {
          page: 'connect',
          src: connect,
          srcActive: connectActive,
        },
        goals: {
          page: 'goals',
          src: settings,
          srcActive: settingsActive,
        },
      },
    }
  }
}
