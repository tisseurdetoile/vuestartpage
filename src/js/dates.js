var dates = {
  getWeek (prefix) {
    let date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    let week1 = new Date(date.getFullYear(), 0, 4)
    let weeknumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    let p = (prefix === undefined ? 'S' : prefix)
    return p + weeknumber
  }
}
export default dates
