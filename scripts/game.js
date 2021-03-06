let replicants = []
let slugs = []
let splats = []
let splatsArr = []
let spritesheet
let spritedata
let animation = []
let shakey
let deathSound
let gun
let defcon
let score = 0

function preload() {
  shakey = loadSound("assets/audio/cyber-tunez.mp3")
  deathSound = loadSound("assets/audio/death.ogg")
  gun = loadSound("assets/audio/gunshot.wav")
  spritedata = loadJSON("assets/spritesheets/sprites.json")
  spritesheet = loadImage("assets/spritesheets/sheet.png")
  defcon = loadFont("assets/fonts/defconzero.ttf")
}

function setup() {
  mapFloor = loadImage("assets/background/carbon-floor.png")
  bulletSprite = loadImage("assets/bullets/bullet1.png")
  ghostSprite = loadImage("assets/cutouts/ghost/front1.png")
  splatsArr = [
    (bloodSplat1 = loadImage("assets/splats/bloodsplats-0001.png")),
    (bloodSplat2 = loadImage("assets/splats/bloodsplats-0002.png")),
    (bloodSplat3 = loadImage("assets/splats/bloodsplats-0003.png")),
    (bloodSplat4 = loadImage("assets/splats/bloodsplats-0004.png")),
    (bloodSplat5 = loadImage("assets/splats/bloodsplats-0005.png")),
    (bloodSplat6 = loadImage("assets/splats/bloodsplats-0006.png")),
    (bloodSplat7 = loadImage("assets/splats/bloodsplats-0007.png"))
  ]
  randSplat = random(splatsArr)
  createCanvas(WIDTH, HEIGHT)
  shakey.setVolume(0.5)
  shakey.play()

  let frames = spritedata.frames
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].frame
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h)
    animation.push(img)
  }
  ghost = new Ghost()
}

function draw() {
  background(mapFloor)
  splats.forEach(splat => {
    image(
      splat.randSplat,
      splat.replicPosX,
      splat.replicPosY,
      splat.randSplat.width * 0.25,
      splat.randSplat.height * 0.25
    )
  })
  frameRate(60)

  ghost.render()
  replicants.forEach(rep => rep.render())
  slugs.forEach(el => el.draw())
  slugs.forEach(el => el.update())

  // score display
  text(score, 10, 30)
  textFont(defcon)
  textSize(30)

  // bullet collision
  replicants.forEach(function(replic, replicIndex) {
    const replicPosX = replic.randPositionX
    const replicPosY = replic.randPositionY
    const width = replic.width
    const height = replic.height
    slugs.forEach(function(slug, slugIndex) {
      const slugPosX = slug.bullX
      const slugPosY = slug.bullY
      const radius = 5
      if (
        collideRectCircle(
          replicPosX,
          replicPosY,
          width * 0.25,
          height * 0.25,
          slugPosX,
          slugPosY,
          radius
        )
      ) {
        splats.push({
          randSplat,
          replicPosX,
          replicPosY
        })

        replicants.splice(replicIndex, 1) // remove replicant on hit
        slugs.splice(slugIndex, 1) // remove bullet on hit
        randSplat = random(splatsArr)

        score += 1000
      }
    })
  })

  // pos diff vector & repli move
  replicants.forEach(function(replic) {
    let dx = ghost.pos.x - replic.randPositionX
    let dy = ghost.pos.y - replic.randPositionY

    // speed adjustment to prevent slow down near ghost
    while (Math.abs(dy) < 100 && Math.abs(dx) < 100) {
      dx *= 2
      dy *= 2
    }

    replic.randPositionX += dx / 75 // speed x
    replic.randPositionY += dy / 75 // speed y
  })

  // ghost-repli collision
  replicants.forEach(function(replic) {
    const replicPosX = replic.randPositionX
    const replicPosY = replic.randPositionY
    ghostPos = {
      positionX: ghost.pos.x,
      positionY: ghost.pos.y
    }

    if (collidePointPoint(replicPosX, replicPosY, ghost.pos.x, ghost.pos.y, 20)) {
      ghost.health -= 5
    }
  })
}

setTimeout(() => {
  spawnReplicant()
}, 500)
