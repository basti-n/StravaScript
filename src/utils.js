import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

export function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function sortActivitiesByDate(activities) {
  try {
    return activities.sort((a, b) => (b.start_date > a.start_date ? 1 : -1))
  } catch (err) {
    return []
  }
}

export function timeStampLastSevenDays() {
  const today = moment
    .utc()
    .endOf('day')
    .toISOString()

  let dates = []

  for (let i = 0; i <= 7; i++) {
    dates.push(
      moment(today)
        .subtract(i, 'day')
        .toISOString()
    )
  }

  return dates.sort((a, b) => (a > b ? 1 : -1))
}

export function getHoursAndMinutesFromMinutes(minutes) {
  return minutes < 60
    ? `${minutes % 60}m`
    : `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

export const DateLastWeek = moment()
  .subtract(7, 'd')
  .format()

export const DateTwoWeeksAgo = moment()
  .subtract(14, 'd')
  .format()

export function getDayOfWeek(daysBackFromToday) {
  return moment()
    .subtract(daysBackFromToday, 'day')
    .format('dddd')
}
