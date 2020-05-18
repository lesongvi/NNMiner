import SVG from '../lib/svg-jsx'

import { decorateMiniConsole } from './MiniConsole'
import { decorateGimmick } from './Gimmick'
import { decorateClient } from './ClientInfo'
import { decorateRanking } from './Ranking'

const Stage = ({ clientInfo, topuser }) => {
  const hps = '0.000'
  let y = 32
  const height = 380

  const draw = new SVG('320', `${height}`)

  draw.rect({ x: 0, y: 0, width: 320, height, fill: '#FFFFFF' })

  decorateMiniConsole(draw, 320 / 2 + 56, 80)

  decorateGimmick(draw, 320 / 2, 320 / 2)

  draw.text({
    x: 320 / 2,
    y: (y = y + 32),
    id: 'hps',
    fontSize: 42,
    fill: '#EA6B66',
    textAnchor: 'end',
    text: hps
  })

  draw.text({
    x: 320 / 2,
    y: (y = y + 18),
    fontSize: 14,
    fill: 'gray',
    textAnchor: 'end',
    text: 'hashes / giây'
  })

  draw.line({
    x1: 320 / 2 + 6,
    y1: y + 6,
    x2: 320 / 2 + 16,
    y2: y + 16,
    stroke: 'gray'
  })

  draw.image({
    x: 320 / 2 + 8,
    y: (y = y + 6),
    width: 80,
    height: 80,
    href: './nnminer.png'
  })

  y = decorateClient(draw, 320 / 2, y, clientInfo)

  y = decorateRanking(draw, 320 / 2, (y = y + 20), topuser)

  console.log(topuser);

  draw.text({
    x: 320 / 2,
    y: height - 24,
    fontSize: 9,
    fill: 'gray',
    textAnchor: 'middle',
    text: 'MADE WITH ❤ NHIKEO1919 (ngocthupy)'
  })

  return draw.jsx()
}

export default Stage
