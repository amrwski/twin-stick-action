class Replicant {
  constructor() {
    this.width = 70
    this.height = 160
    this.randPositionX = random(0 - this.width, WIDTH + this.width)
    this.randPositionY = random(0 - this.height, HEIGHT + this.height)
    this.sprite = new Sprite(animation, this.randPositionX, this.randPositionY, SPEED)
  }

  render() {
    this.sprite.x = this.randPositionX
    this.sprite.y = this.randPositionY
    this.sprite.scope = 0
    this.sprite.index += 0.1
    this.sprite.show()
  }
}

function spawnReplicant() {
  replicants.push(new Replicant())
}
