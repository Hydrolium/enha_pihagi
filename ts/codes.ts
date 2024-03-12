const start_window = <HTMLDivElement>document.querySelector('#start_window')
start_window.querySelector('#start')?.addEventListener('click', event => {

    (<HTMLButtonElement> event.target).disabled = true

    console.log(start_window.querySelector(".border-right"))
    start_window.querySelector(".border")?.animate(
        [
            {opacity: '1', transform: 'scale(1)'}, 
            {opacity: '0', transform: 'scale(1.5)'}
        ]
        ,
        { duration: 250, fill: 'both' }
    )


    start_window.querySelector(".subtitle")?.animate(
        [
            { opacity: '1', transform: 'translateX(0)'}, 
            { opacity: '0', transform: 'translateX(-200%)'}
        ],
        { duration: 250, fill: 'both' }
    )

    start_window.querySelector(".title")?.animate(
        [
            { opacity: '1', transform: 'translateX(0)'}, 
            { opacity: '0', transform: 'translateX(100%)'}
        ],
        { duration: 250, fill: 'both' }
    )

    start_window.animate(
        [{ opacity: '1' }, { opacity: '0' }],
        { duration: 500, fill: 'both', delay: 100 }
    ).onfinish = () => {
        start_window.style.display = 'none'
    }


    start()

})

const stop_window = <HTMLDivElement>document.querySelector('#stop_window')
stop_window.querySelector('#stop')?.addEventListener('click', () => {
    window.close()
})
stop_window.querySelector('#replay')?.addEventListener('click', () => {
    stop_window.style.display = 'none'
    Game.restart()
})
class Game {

    public static isRunning = true

    private static game: Game | null = null

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;

    public static width = 1600
    public static height = 900

    private constructor() {

        this.canvas = <HTMLCanvasElement> document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = Game.width
        this.canvas.height = Game.height        

        this.canvas.id = 'canvas'

        document.body.appendChild(this.canvas)
    }

    public static restart() {
        document.body.removeChild(this.getCanvas())
        this.game = new Game()
        this.isRunning = true

        start()
    }

    public static readonly fps = 60
    private static readonly interval = 1000 / 60
    private static then: number = Date.now()

    public static canGoToNextFrame(): boolean {
        
        const now = Date.now()
        const delta = now - this.then
        if(delta <= this.interval) {
            return false
        }
        this.then = now - (delta % this.interval)
        return true
    }

    private static getGame(): Game {
        if(!this.game) this.game = new Game()
        return this.game
    }

    public static getCtx(): CanvasRenderingContext2D | null {
        return this.getGame().ctx
    }

    public static getCanvas(): HTMLCanvasElement {
        return this.getGame().canvas
    }

    public static clearCanvas() {
        const canvas = this.getCanvas()
        this.getCtx()?.clearRect(0, 0, canvas.width, canvas.height)
    }

    public static stop(score: number) {
        this.isRunning = false

        const title = stop_window.querySelector(".title")
        if(title) title.textContent = score + "점"

        stop_window.style.display = 'flex'
        stop_window.animate(
            [{ opacity: '0' }, { opacity: '1' }],
            { duration: 800, fill: 'both' }
        )
    }
}


class Obstacle {

    private static images = [
        'data/obstacle/1.png',
        'data/obstacle/2.png'
    ]


    public x: number
    public y: number
    public width: number
    public height: number
    public imagePath: string

    constructor(type: 0|1) {
        this.width = 375 / 4.5
        this.height = 666 / 4.5
        this.x = Game.width
        this.y = Game.height - this.height

        this.imagePath = Obstacle.images[type]
    }

    public draw() {
        const image = new Image()
        image.src = this.imagePath
        image.width = this.width

        const ctx = Game.getCtx()
        if(!ctx) return

        ctx.fillStyle = 'rgb(0, 223, 71)'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }
}

class HorizontalObstacle extends Obstacle{

    constructor() {
        super(0)
        this.width = 400 / 3
        this.height = 275 / 3
        this.x = Game.width
        this.y = Game.height - this.height

        this.imagePath = 'data/obstacle/3.png'
    }
}


class Enha {

    public x: number
    public y: number
    private width: number = 150
    private height: number = 300

    private readonly jumpingPower = 220
    private readonly jumpingTime = 35
    private jumpingGenerator: Generator<number, number, number> | null = null

    private readonly collisionWidth = 80

    private then = 0
    private *jumping() {
        this.then = 0
        for(let i=0;i<=this.jumpingTime;i++) {
            const cur = Math.sin((1/this.jumpingTime) * Math.PI * i) * this.jumpingPower
            yield cur - this.then
            this.then = cur
        }
        this.y = 0
        this.jumpingGenerator = null
        return 0
    }

    public startJump() {
        if(this.jumpingGenerator != null) return
        this.jumpingGenerator = this.jumping()
    }

    public getYDelta(): number {
        if(this.jumpingGenerator) return this.jumpingGenerator.next().value
        else return 0
    }

    private imageIdx = 0
    private images = [
        'data/action/action_throw_2/throw_bottom_left.png',
        'data/action/action_throw_1/throw_top_left.png',
        'data/action/action_throw_1/throw_bottom_right.png',
        'data/action/action_throw_2/throw_top_right.png',
    ]
    
    constructor() {
        this.x = 0
        this.y = Game.height - this.height
    }

    public draw() {
        const image = new Image()
        image.src = this.images[this.imageIdx]
        image.width = this.width
        
        // Game.getCtx()?.fillRect(this.x, this.y, this.width, this.height)
        Game.getCtx()?.drawImage(image, this.x, this.y, this.width, this.height)
    }

    public nextImage() {
        this.imageIdx++
        this.imageIdx %= this.images.length
    }

    public detectCollision(obstacle: Obstacle): boolean {
        const colX = (this.width - this.collisionWidth)/2

        return (obstacle.x > this.x + colX && obstacle.x < this.x + this.width - colX)
                && obstacle.y < this.y + this.height
    }
}

let enha: Enha;

function start() {

    enha = new Enha()
    const obstacles: Obstacle[] = []

    let score = 0

    let timer = 0
    let speed = 10

    let nextObTime = 1

    function update() {
        if(Game.isRunning) requestAnimationFrame(update)
    
        if(!Game.canGoToNextFrame()) return
        timer ++
        Game.clearCanvas()
        enha.y -= enha.getYDelta()
        enha.draw()
    
        obstacles.forEach((obstacle, idx, list) => {
            if(obstacle.x < 0) {
                list.splice(idx, 1)
                score++
                speed += 2
            }
            
            obstacle.x -= speed
            if(enha.detectCollision(obstacle)) {
                Game.stop(score)
            }
            obstacle.draw()
        })


        const ctx = Game.getCtx()
        if(ctx != null) {
            ctx.font = 'bold 50px beaufort';

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center'
            ctx.fillText(score + '점', Game.width /2, 70);
        }
    
        if(timer % (Game.fps * 0.25) == 0) {
            enha.nextImage()
        }


        if(timer == nextObTime) {
            const shape = Math.floor(Math.random() * 3)
            if(shape == 0 || shape == 1) {
                obstacles.push(new Obstacle(shape))
            } else {
                obstacles.push(new HorizontalObstacle())
            }

            nextObTime += Game.fps * 0.6 + Math.floor(Math.random() * Game.fps)
        } 
    }
    update()
}

document.addEventListener('keydown', event => {
    if(event.code == 'Space') {
        enha.startJump()
    }
})

document.addEventListener('touchend', () => {
    enha.startJump()
})

document.addEventListener('click', () => {
    enha.startJump()
})