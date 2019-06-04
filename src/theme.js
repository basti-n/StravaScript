export default function getTheme(darkMode) {
  if (darkMode) {
    return {
      background: '#121212',
      borderColorNav: '#BB86FC',
      colorNavBar: '#2c2c2c',
      fontColor: '#FFFFFF',
      fontColorHeadline: '#BB86FC',
      primaryColor: '#2c2c2c',
      secondaryColor1: 'rgba(216, 216, 214, 0.44)',
      secondaryColor2: '#3700B3',
      secondaryColor3: '#03DAC6',
      toggleBorder: '#BB86FC',
      red: '#CD6679',
      rideColor: '#BB86FC',
      runColor: '#985EFF',
      strengthColor: '#7F39FB',
      toastBackground: 'rgba(187, 134, 252, 0.9)',
    }
  } else {
    return {
      background: '#FFFFFF',
      borderColorNav: '#000000',
      colorNavBar: '#000000',
      fontColor: '#000000',
      fontColorHeadline: '#2E8B57',
      primaryColor: '#2E8B57',
      secondaryColor1: 'rgba(216, 216, 214, 0.44)',
      secondaryColor2: '#FDE100',
      secondaryColor3: '#0072C2',
      toggleBorder: '#D8D8D8',
      red: '#DF4D60',
      rideColor: '#62A881',
      runColor: '#2E8B57',
      strengthColor: '#2E7357',
      toastBackground: 'rgba(46, 139, 87, 0.9)',
    }
  }
}
