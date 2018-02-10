/**
 * @TODO implement localStorage for save/Store Data.
 * @type {{shrCut: *[], debug: boolean, stat: boolean, noredirect: boolean}}
 */
var config = {
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
  debug: true,
  stat: true,
  noredirect: false,
  /**
   * retourne la configuration associé au raccourcis.
   * @param shrt le raccourcis.
   * @returns {*} la configuration ou null.
   */
  getShrCut (shrt) {
    let len = config.shrCut.length

    while (len--) {
      let readData = config.shrCut[len]
      if (readData.shrt === shrt) {
        return readData
      }
    }
    return null
  }
}
export default config
