var stats = {
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
    let sureDays = (num - 1) * 7
    let days = sureDays + devMonday[new Date().getUTCDay() + 1] + 1
    return (this.lastNDays(days))
  },
  extractTag (arr) {
    let ret = {}
    var tagsData = {}
    var tagsData2 = {}
    var tagsData3 = {}
    var shrData = {}
    var scoreTags = []
    var tags = []

    let ln = arr.length
    while (ln--) {
      let read = arr[ln]

      // traite les recherche par shrCut
      shrData[read.s] = shrData[read.s] ? shrData[read.s] + 1 : 1

      // traite les tags.
      let lt = read.p.length
      while (lt--) {
        let tag = read.p[lt].toUpperCase()
        tagsData[tag] = tagsData[tag] ? tagsData[tag] + 1 : 1
      }
    }
    // ff.
    for (var property in tagsData) {
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

    let lst = scoreTags.length

    while (lst--) {
      let readScore = scoreTags[lst]
      tags.push(tagsData3[readScore])
    }

    // results.
    ret['tagsData'] = tagsData
    ret['tagsData2'] = tagsData2
    ret['tagsData3'] = tagsData3
    ret['shrData'] = shrData
    ret['scoreTags'] = scoreTags
    ret['tags'] = tags  

    return ret
  }
}
export default stats
