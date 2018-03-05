const docEl = document.documentElement
const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
const isResize = () => {
  const {clientWidth} = docEl
  if (!clientWidth) {
    return
  }
  docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
}
document.addEventListener(resizeEvent, isResize, false)
document.addEventListener('DOMContentLoaded', isResize, false)

// 判断是是否是ios的webview
let {standalone, userAgent} = window.navigator
userAgent = userAgent.toLocaleLowerCase()
const isSafari = /safari/.test(userAgent)
const isIos = /iphone|ipod|ipad/.test(userAgent)
const isUc = /ucbrowser/.test(userAgent)
const isQihoo = /qihoobrowser/.test(userAgent)
const isSogoumobilebrowser = /sogoumobilebrowser/.test(userAgent)

window.isIosWebview = false
if (isIos) {
  if (!standalone && isSafari) {
    // browser
  } else if (standalone && !isSafari) {
    // standalone
  } else if (!standalone && !isSafari) {
    // uiwebview  【不是uc也不是360也不是搜狗】
    if (!isUc && !isQihoo && !isSogoumobilebrowser) {
      window.isIosWebview = true
    }
  }
}
