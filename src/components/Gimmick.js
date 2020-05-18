const decorateGimmick = (draw, ox, oy, data) => {
  draw.rect({ x: 0, y: oy - 50, width: 320, height: 50, fill: '#ffdedf' })

  return [0, 1, 2].map(index =>
    draw.image({
      x: 0,
      y: 0,
      id: `faceMT${index}`,
      width: 70,
      height: 70,
      href: './cute.png'
    })
  )
}

export { decorateGimmick }
