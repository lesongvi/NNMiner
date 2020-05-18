class NKFace {
  faceSpeeds = [1, 2, 3]
  faceTargetSpeeds = [3, 2, 1]

  constructor (svg) {
    this.face = [0, 1, 2].map(index => {
      const faceMT = svg.querySelector(`g image#faceMT${index}`)
      const faceY = this.getRandomfaceY(index)
      faceMT.setAttribute('y', faceY)
      this.faceSpeeds[index] = this.getRandomSpeed()
      this.faceTargetSpeeds[index] = this.getRandomSpeed()
      return faceMT
    })
  }

  getRandomSpeed = () => 2 + 3 * Math.random()
  getRandomfaceY = index => 320 / 2 - 36 - 10 * (3 - index) - Math.random() * 6 + Math.random() * 6

  update = () => {
    this.face.forEach((faceMT, index) => {
      this.faceSpeeds[index] += (this.faceTargetSpeeds[index] - this.faceSpeeds[index]) / 10
      const _faceX = Number(faceMT.getAttribute('x'))
      const faceX = _faceX + this.faceSpeeds[index]
      faceMT.setAttribute('x', faceX)

      // Random start Y
      if (faceX > 320) {
        faceMT.setAttribute('x', 0)
        const faceY = this.getRandomfaceY(index)
        faceMT.setAttribute('y', faceY)
        this.faceTargetSpeeds[index] = this.getRandomSpeed()
      }
    })
  }
}

export default NKFace
