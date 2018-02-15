var SearchStats = {

  normalize (str) {
    if (str == null) {
      return ''
    }
    return str.toLowerCase().replace(/ +(?= )/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  },

  getKeyword (query) {
    let arr = query.split(' ')
    var res = []
    var ret = []

    for (let ni = 0; ni < arr.length; ni++) {
      var txt = arr[ni]

      if (txt != null && txt.length > 2) {
        res.push(this.normalize(txt))
      }
    }

    if (res.length > 0) {
      ret = res.filter(function (elem, pos, arr) {
        return arr.indexOf(elem) === pos
      })
    }

    return ret
  },

  putStat (query, confshrt, url) {
    const today = new Date()
    const strDate = 'Ym'
      .replace('Y', today.getFullYear())
      .replace('m', today.getMonth() + 1)
      .replace('d', today.getDate())

    const index = 'idx_' + strDate

    var readstat
    if (localStorage[index] == null || localStorage[index] === undefined) {
      readstat = JSON.parse('[]')
    } else {
      readstat = JSON.parse(localStorage[index])
    }

    let tags = this.getKeyword(this.normalize(query))

    let data = {}
    data.t = Date.now()
    data.s = confshrt.shrt
    data.p = tags
    data.n = confshrt.name
    data.u = url

    readstat.push(data)
    localStorage[index] = JSON.stringify(readstat)
  }
}
export default SearchStats
