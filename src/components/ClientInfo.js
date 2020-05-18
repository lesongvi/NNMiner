const decorateClient = (draw, ox, oy, client) => {
  draw.text({
    x: ox,
    y: (oy = oy + 6 + 64 + 20),
    fontSize: 14,
    fill: 'gray',
    textAnchor: 'middle',
    text: `Đang đào `,
    children: [
      draw.tspan({ fill: '#ff9501', text: `tiền ảo` }),
      draw.tspan(` bằng `),
      draw.tspan({ fill: '#ff9295', text: `${client.browser.name} ${client.browser.version}` })
    ]
  })

  draw.text({
    x: ox,
    y: (oy = oy + 14 + 3),
    fontSize: 14,
    fill: 'gray',
    textAnchor: 'middle',
    text: `trên `,
    children: [
      draw.tspan({ fill: '#ff9295', text: `${client.os.name} ${client.os.version}` }),
      draw.tspan(` với `),
      draw.tspan({ fill: '#ff9295', text: client.cpu.architecture }),
      draw.tspan(` từ `),
      draw.tspan({ fill: '#ff9295', text: client.device.vendor })
    ]
  })

  return oy
}
export { decorateClient }
