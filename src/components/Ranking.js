const colors = {
  chrome: ['#9b59b6', '#8e44ad'],
  firefox: ['#e67e22', '#d35400'],
  edge: ['#3498db', '#2980b9'],
  safari: ['#2ecc71', '#27ae60'],
  any: ['#e74c3c', '#c0392b']
}

const decorateRanking = (draw, ox, oy, data2) => {
  try {
    var maximum = Object.values(data2).sort((a, b) => b.total - a.total)[0].total;
  } catch (e) {}


  let y = oy;
  setTimeout(
    Object.keys(data2).forEach((item, index) => {
    const widthMin = 100 * 60 / maximum
    const widthMax = 100 * data2[item].total / maximum
    y = oy + index * 6 * 2
    const fills = colors.any

    const text = `${data2[item].name} x ${data2[item].total}`
    const max = Number(data2[item].total).toPrecision(4)
    draw.rect({ x: ox - widthMax, y, width: widthMax, height: 6, fill: fills[1] })
    draw.rect({ x: ox - widthMin, y, width: widthMin, height: 6, fill: fills[0] })
    draw.text({ x: ox - widthMax - 5 * String(max).length, y: y + 6, text: max, fill: 'gray' })
    draw.text({ x: ox + 3 + 3 + 3, y: y + 6, text, fill: 'gray' })
  }), 5000)

  return y
}

export { decorateRanking }
