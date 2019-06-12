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

      checkboxIcon: '/assets/checkbox_white-circle-darkMode.svg',
      connectIcon: '/assets/connect-icon-darkMode.svg',
      darkModeIcon: '/assets/darkMode-icon-darkMode.svg',
      notificationIcon: '/assets/notification-icon-darkMode.svg',

      sportIcons: {
        bike: '/assets/bike-small-darkMode.svg',
        run: '/assets/run-small-darkMode.svg',
        strength: '/assets/weighttraining-small-darkMode.svg',
      },

      navIcons: {
        home: {
          page: 'home',
          src: '/assets/home.svg',
          srcActive: '/assets/home-active-darkMode.svg',
        },
        connect: {
          page: 'connect',
          src: '/assets/connect.svg',
          srcActive: '/assets/connect-active-darkMode.svg',
        },
        goals: {
          page: 'goals',
          src: '/assets/settings.svg',
          srcActive: '/assets/settings-active-darkMode.svg',
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

      checkboxIcon: '/assets/checkbox_white-circle.svg',
      connectIcon: '/assets/connect-icon.svg',
      darkModeIcon: '/assets/darkMode-icon.svg',
      notificationIcon: '/assets/notification-icon.svg',

      sportIcons: {
        bike: '/assets/bike-small.svg',
        run: '/assets/run-small.svg',
        strength: '/assets/weighttraining-small.svg',
      },

      navIcons: {
        home: {
          page: 'home',
          src: '/assets/home.svg',
          srcActive: '/assets/home-active.svg',
        },
        connect: {
          page: 'connect',
          src: '/assets/connect.svg',
          srcActive: '/assets/connect-active.svg',
        },
        goals: {
          page: 'goals',
          src: '/assets/settings.svg',
          srcActive: '/assets/settings-active.svg',
        },
      },
    }
  }
}
