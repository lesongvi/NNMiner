import canvg from 'canvg-browser'
import '../lib/canvas-blob'

import Facebook from '../lib/Facebook'
import Twitter from '../lib/Twitter'

const FB_APP_ID = '699003154006089' //nhikeo1919

const onShare = (svg, provider = 'facebook') => {
  svg.setAttribute('width', 640)
  svg.setAttribute('height', 640)
  svg.setAttribute('transform', `scale(2,2)`)

  const canvas = document.getElementById('canvas')

  canvg(canvas, svg.outerHTML, { scaleWidth: 640, scaleHeight: 640 })

  svg.setAttribute('width', 320)
  svg.setAttribute('height', 320)
  svg.setAttribute('transform', 'scale(1,1)')

  setTimeout(
    () =>
      canvas.toBlob(blob => {
        switch (provider) {
          case 'facebook':
            new Facebook().shareBlob(FB_APP_ID, blob)
            break
          case 'twitter':
            new Twitter().shareBlob(blob)
            break
          default:
            console.error('Chưa tích hợp')
            break
        }
      }),
    100
  )
}

export { onShare }
