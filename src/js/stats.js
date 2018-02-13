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
  }
}
export default stats
