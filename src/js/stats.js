var stats = {
  chooseColor (arr) {
    const colors = ['#6B5B95', '#ECDB54', '#E94B3C', '#6F9FD8', '#944743', '#DBB1CD', '#EC9787', '#00A591', '#6B5B95', '#6C4F3D', '#EADEDB', '#BC70A4', '#BFD641', '#2E4A62', '#B4B7BA', '#C0AB8E', '#F0EDE5', '#92B558', '#DC4C46', '#672E3B', '#F3D6E4', '#C48F65', '#223A5E', '#898E8C', '#005960', '#9C9A40', '#4F84C4', '#D2691E', '#578CA9', '#F6D155', '#004B8D', '#F2552C', '#95DEE3', '#EDCDC2', '#CE3175', '#5A7247', '#CFB095', '#4C6A92', '#92B6D5', '#838487', '#B93A32', '#AF9483', '#AD5D5D', '#006E51', '#D8AE47', '#9E4624', '#B76BA3', '#F7CAC9', '#F7786B', '#91A8D0', '#034F84', '#98DDDE', '#9896A4', '#B18F6A', '#DD4132', '#FAE03C', '#79C753']
    let ret = {}
    let flat = []
    let obj = []
    let ln = arr.length
    let ni = 0
    while (ln--) {
      obj.push({'color': colors[ni], 'name': arr[ni]})
      flat.push(colors[ni])
      ni++
    }
    ret['flat'] = flat
    ret['obj'] = obj

    return ret
  },
  /**
   * convertie une chaine en code hexa pour simplifier les code couleurs
   * @param str
   * @returns {string}
   */
  stringToColour (str) {
    var hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    var colour = '#'
    for (let i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF
      colour += ('00' + value.toString(16)).substr(-2)
    }
    return colour
  },
  /**
   * fonction qui permet de classer les entrée des nom dans le localstorage
   */
  sortIdx (val1, val2) {
    let match = /idx_(\d{4})(\d*)/
    let aRes1 = val1.match(match)
    let aRes2 = val2.match(match)
    let year1 = parseInt(aRes1[1])
    let year2 = parseInt(aRes2[1])
    let month1 = parseInt(aRes1[2])
    let month2 = parseInt(aRes2[2])
    if (year1 < year2) {
      return -1
    }
    if (year1 === year2) {
      if (month1 < month2) {
        return -1
      }
    }
    return 1
  },
  /**
   * retourne la liste des entrée des indexs de recherche.
   */
  listIdx () {
    var returnArray = []

    for (var i = 0, len = localStorage.length; i < len; ++i) {
      let read = localStorage.key(i)
      console.log(read)
      if (read.startsWith('idx_')) {
        returnArray.push(read)
      }
    }

    return returnArray
  },
  /**
   * retourne les derniere recherche.
   * @param num nombre de requete a retouner
   */
  last (num = 100) {
    var ni = 0
    let idx = this.listIdx().sort(this.sortIdx)
    var ret = []

    let size = idx.length

    while (size--) {
      let readIdx = idx[size]
      let readData = JSON.parse(localStorage.getItem(readIdx))
      let datasize = readData.length

      while (datasize--) {
        if (ni >= num) {
          return ret
        }

        ret.push(readData[datasize])
        ni++
      }
    }
    return ret
  },
  /**
   * retourne toutes les recherche depuis un timestamp.
   * @param ts timestamp
   */
  fromTS (ts) {
    let idx = this.listIdx().sort(this.sortIdx)
    var ret = []
    let size = idx.length

    while (size--) {
      let readIdx = idx[size]
      let readData = JSON.parse(localStorage.getItem(readIdx))
      let datasize = readData.length

      while (datasize--) {
        let readSrch = readData[datasize]

        if (readSrch.t >= ts) {
          ret.push(readSrch)
        } else {
          return ret
        }
      }
    }
    return ret
  },
  /**
   * retourne les recherche des dernieres jours.
   * @param num nombre de jours.
   * @returns {*} un tableau contenant les recherches.
   */
  lastNDays (num = 15) {
    let current = new Date().getTime()
    var start = current - (24 * 3600 * 1000 * num)
    return this.fromTS(start)
  },
  /**
   * retourne les recherche des dernieres semaines.
   * @param num nombre de semaine.
   * @returns {*} un tableau contenant les recherches.
   */
  getLastWeeks (num = 5) {
    let devMonday = [6, 0, 1, 2, 3, 4, 5]
    let today = new Date()
    let sureDays = (num - 1) * 7
    let days = sureDays + devMonday[today.getUTCDay()] + 1
    return (this.lastNDays(days))
  },
  getStrDate (datems) {
    const date = new Date()
    date.setTime(datems)
    const strDate = 'Ymd'
      .replace('Y', date.getFullYear())
      .replace('m', (date.getMonth()) < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      .replace('d', (date.getDate()) < 10 ? '0' + date.getDate() : date.getDate())
    return strDate
  },
  extractTag (arr) {
    let ret = {}
    var tagsData = {}
    var tagsData2 = {}
    var tagsData3 = {}
    var shrData = {}
    var scoreTags = []
    var tags = []
    var srchByDate = {}

    let ln = arr.length
    while (ln--) {
      let read = arr[ln]

      // traite les recherche par shrCut
      shrData[read.s] = shrData[read.s] ? shrData[read.s] + 1 : 1

      // traite les jours
      srchByDate[this.getStrDate(read.t)] = srchByDate[this.getStrDate(read.t)] ? srchByDate[this.getStrDate(read.t)] + 1 : 1

      // traite les tags.
      let lt = read.p.length
      while (lt--) {
        let tag = read.p[lt].toUpperCase()
        tagsData[tag] = tagsData[tag] ? tagsData[tag] + 1 : 1
      }
    }
    // START format search engine data for chart
    var pieChartShrt = {}
    pieChartShrt['series'] = []
    pieChartShrt['labels'] = []
    pieChartShrt['colors'] = []
    for (let property in shrData) {
      if (shrData.hasOwnProperty(property)) {
        pieChartShrt['labels'].push(property)
        // pieChartShrt['colors'].push(this.stringToColour(property))
        pieChartShrt['series'].push(shrData[property])
      }
    }
    pieChartShrt['colors'] = this.chooseColor(pieChartShrt['labels'])
    // END format search engine data for chart

    // ff.
    for (let property in tagsData) {
      if (tagsData.hasOwnProperty(property)) {
        if (tagsData[property] > 1) {
          tagsData2[property] = tagsData[property]
          if (tagsData3[tagsData[property]] === undefined) {
            tagsData3[tagsData[property]] = []
          }
          tagsData3[tagsData[property]].push(property)
        }
      }
    }
    // scoring.
    for (var property1 in tagsData3) {
      if (tagsData3.hasOwnProperty(property1)) {
        scoreTags.push(parseInt(property1))
      }
    }
    // START : tagcloud
    let tagcloud = []
    let lst2 = scoreTags.length
    while (lst2--) {
      let readScore = scoreTags[lst2]
      let tagForScore = tagsData3[readScore]
      let lng = tagForScore.length
      while (lng--) {
        tagcloud.push({'name': tagForScore[lng], 'score': readScore})
      }
    }
    // END : tagcloud
    let lst = scoreTags.length
    // reorganisation des tags
    while (lst--) {
      let readScore = scoreTags[lst]
      tags.push({'name': tagsData3[readScore][0], 'score': readScore, 'all': tagsData3[readScore]})
    }
    // START par jours
    let srchByDateDays = []
    let srchByDateDaysHit = []
    for (let property in srchByDate) {
      if (srchByDate.hasOwnProperty(property)) {
        srchByDateDays.push(property)
        srchByDateDaysHit.push(srchByDate[property])
      }
    }
    let retSearchByDate = {'srchByDateDays': srchByDateDays, 'srchByDateDaysHit': srchByDateDaysHit}
    // FIN par jours

    // results.
    ret['tagsData'] = tagsData
    ret['tagsData2'] = tagsData2
    ret['tagsData3'] = tagsData3
    ret['shrData'] = shrData
    ret['scoreTags'] = scoreTags
    ret['tags'] = tags
    ret['pieChartShrt'] = pieChartShrt
    ret['tagcloud'] = tagcloud
    ret['retSearchByDate'] = retSearchByDate

    return ret
  }
}
export default stats
