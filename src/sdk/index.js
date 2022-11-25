/* global C4DWarranty  */
import App from './App'

;((w, d) => {

  const init = async () => {
    C4DWarranty.root = new App({
      target: document.body,
    })

    C4DWarranty.showWidget = C4DWarranty.root.showWidget
    C4DWarranty.closeWidget = C4DWarranty.root.closeWidget
    C4DWarranty.VERSION = '1.0.0'
  }

  d.readyState === 'complete' ?
    init() :
    w.addEventListener('load', init)

})(window, document)
