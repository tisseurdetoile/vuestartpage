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
  save () {
    console.log('writeConfig')
    localStorage.setItem('CONFIG', JSON.stringify(config.current))
  },
  addToTail () {
    config.current.shrCut.push({shrt: '', name: 'name', url: 'ne pas oublier ::%s::'})
  },
  removeItem (index) {
    // this.current.$remove(item).
    config.current.shrCut.splice(index, 1)
  },
  getDefault () {
    return config.defconf
  }
}
export default config
