import Config from './config.js'

var Redirect = {
  /**
   * retourne l'url à utiliser
   * @param query
   * @param shrtcut
   */
  getUrl (query, shrtcut) {
    if (query === undefined && shrtcut === undefined) {
      return null
    }

    let readConfig = Config.getShrCut(shrtcut)

    if (readConfig != null) {
      console.log(readConfig)
      let url = readConfig.url.replace('::%s::', query)
      if (url != null) {
        window.location.href = url
      }
    }

    return null
  }
}
export default Redirect
