/**
 * Element de configuration de la page.
 */
var config = {
  /**
   * configuration par defaut de la page.
   */
  defconf: {
    shrCut: [
      {
        shrt: 'g',
        name: 'google',
        url: 'http://www.google.fr/search?source=ig&hl=fr&rlz=&=&q=::%s::&btnG=Recherche+Google&meta=lr%3D&aq=f&oq='
      },
      {shrt: 'w', name: 'wikipedia', url: 'http://fr.wikipedia.org/w/index.php?search=::%s::&go=Lire'},
      {shrt: 'we', name: 'wikipedia', url: 'http://en.wikipedia.org/w/index.php?search=::%s::&go=Lire'},
      {shrt: 'd', name: 'duckduck', url: 'https://duckduckgo.com/?q=::%s::&t=h_&ia=web'},
      {shrt: 'gi', name: 'google', url: 'http://www.google.fr/images?source=imghp&q=::%s::'}
    ],
    debug: false,
    stat: true,
    noredirect: false
  },
  /**
   * Configuration courante.
   */
  current: {},
  /**
   * retourne la configuration associé au raccourcis.
   * @param shrt le raccourcis.
   * @returns {*} la configuration ou null.
   */
  getShrCut (shrt) {
    let len = config.current.shrCut.length

    while (len--) {
      let readData = config.current.shrCut[len]
      if (readData.shrt === shrt) {
        return readData
      }
    }
    return null
  },
  fetch () {
    console.log('fetch')
    let read = localStorage.getItem('CONFIG')
    if (read == null) {
      console.log('no save')
      config.current = config.defconf
    } else {
      console.log('from save')
      config.current = JSON.parse(read)
    }
    return config.current
  },
  /**
   * Sauvegarde de la configuration dans le loca storage.
   */
  save () {
    localStorage.setItem('CONFIG', JSON.stringify(config.current))
  },
  /**
   * Ajoute un element de configuration.
   */
  addToTail () {
    config.current.shrCut.push({shrt: '', name: 'name', url: 'ne pas oublier ::%s::'})
  },
  /**
   * retire un élément de la configuration.
   * @param index
   */
  removeItem (index) {
    config.current.shrCut.splice(index, 1)
  },
  /**
   * Export les données sous forme de fichier.
   */
  exportData () {
    const fileName = 'export.json'
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(config.current)))
    element.setAttribute('download', fileName)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  },
  /**
   * Importe le flux json dans la configuration courante.
   * @param txtJson
   */
  importData (txtJson) {
    localStorage.setItem('CONFIG', txtJson)
  },
  /**
   * retourne la configuration par defaut
   * @returns {{shrCut: *[], debug: boolean, stat: boolean, noredirect: boolean}|config.defconf|{shrCut, debug, stat, noredirect}}
   */
  getDefault () {
    return config.defconf
  }
}
export default config
