var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
var start_window = document.querySelector('#start_window');
(_a = start_window.querySelector('#start')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
    var _a, _b, _c;
    event.target.disabled = true;
    console.log(start_window.querySelector(".border-right"));
    (_a = start_window.querySelector(".border")) === null || _a === void 0 ? void 0 : _a.animate([
        { opacity: '1', transform: 'scale(1)' },
        { opacity: '0', transform: 'scale(1.5)' }
    ], { duration: 250, fill: 'both' });
    (_b = start_window.querySelector(".subtitle")) === null || _b === void 0 ? void 0 : _b.animate([
        { opacity: '1', transform: 'translateX(0)' },
        { opacity: '0', transform: 'translateX(-200%)' }
    ], { duration: 250, fill: 'both' });
    (_c = start_window.querySelector(".title")) === null || _c === void 0 ? void 0 : _c.animate([
        { opacity: '1', transform: 'translateX(0)' },
        { opacity: '0', transform: 'translateX(100%)' }
    ], { duration: 250, fill: 'both' });
    start_window.animate([{ opacity: '1' }, { opacity: '0' }], { duration: 500, fill: 'both', delay: 100 }).onfinish = function () {
        start_window.style.display = 'none';
    };
    start();
});
var stop_window = document.querySelector('#stop_window');
(_b = stop_window.querySelector('#stop')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    window.close();
});
(_c = stop_window.querySelector('#replay')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    stop_window.style.display = 'none';
    Game.restart();
});
if (window.innerWidth < 900) {
    start_window.style.transform = 'rotate(90deg)';
    stop_window.style.transform = 'rotate(90deg)';
}
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = Game.width;
        this.canvas.height = Game.height;
        if (window.innerWidth < 900) {
            this.canvas.style.transform = 'rotate(90deg)';
        }
        this.canvas.id = 'canvas';
        document.body.appendChild(this.canvas);
    }
    Game.restart = function () {
        document.body.removeChild(this.getCanvas());
        this.game = new Game();
        this.isRunning = true;
        start();
    };
    Game.canGoToNextFrame = function () {
        var now = Date.now();
        var delta = now - this.then;
        if (delta <= this.interval) {
            return false;
        }
        this.then = now - (delta % this.interval);
        return true;
    };
    Game.getGame = function () {
        if (!this.game)
            this.game = new Game();
        return this.game;
    };
    Game.getCtx = function () {
        return this.getGame().ctx;
    };
    Game.getCanvas = function () {
        return this.getGame().canvas;
    };
    Game.clearCanvas = function () {
        var _a;
        var canvas = this.getCanvas();
        (_a = this.getCtx()) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, canvas.width, canvas.height);
    };
    Game.stop = function (score) {
        this.isRunning = false;
        var title = stop_window.querySelector(".title");
        if (title)
            title.textContent = score + "점";
        stop_window.style.display = 'flex';
        stop_window.animate([{ opacity: '0' }, { opacity: '1' }], { duration: 800, fill: 'both' });
    };
    Game.isRunning = true;
    Game.game = null;
    Game.width = 1600;
    Game.height = 900;
    Game.fps = 60;
    Game.interval = 1000 / 60;
    Game.then = Date.now();
    return Game;
}());
var Obstacle = /** @class */ (function () {
    function Obstacle(type) {
        this.width = 375 / 4.5;
        this.height = 666 / 4.5;
        this.x = Game.width;
        this.y = Game.height - this.height;
        this.imagePath = Obstacle.images[type];
    }
    Obstacle.prototype.draw = function () {
        var image = new Image();
        image.src = this.imagePath;
        image.width = this.width;
        var ctx = Game.getCtx();
        if (!ctx)
            return;
        ctx.fillStyle = 'rgb(0, 223, 71)';
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    };
    Obstacle.images = [
        'data/obstacle/1.png',
        'data/obstacle/2.png'
    ];
    return Obstacle;
}());
var HorizontalObstacle = /** @class */ (function (_super) {
    __extends(HorizontalObstacle, _super);
    function HorizontalObstacle() {
        var _this = _super.call(this, 0) || this;
        _this.width = 400 / 3;
        _this.height = 275 / 3;
        _this.x = Game.width;
        _this.y = Game.height - _this.height;
        _this.imagePath = 'data/obstacle/3.png';
        return _this;
    }
    return HorizontalObstacle;
}(Obstacle));
var Enha = /** @class */ (function () {
    function Enha() {
        this.width = 150;
        this.height = 300;
        this.jumpingPower = 220;
        this.jumpingTime = 35;
        this.jumpingGenerator = null;
        this.collisionWidth = 80;
        this.then = 0;
        this.imageIdx = 0;
        this.images = [
            'data/action/action_throw_2/throw_bottom_left.png',
            'data/action/action_throw_1/throw_top_left.png',
            'data/action/action_throw_1/throw_bottom_right.png',
            'data/action/action_throw_2/throw_top_right.png',
        ];
        this.x = 0;
        this.y = Game.height - this.height;
    }
    Enha.prototype.jumping = function () {
        var i, cur;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.then = 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i <= this.jumpingTime)) return [3 /*break*/, 4];
                    cur = Math.sin((1 / this.jumpingTime) * Math.PI * i) * this.jumpingPower;
                    return [4 /*yield*/, cur - this.then];
                case 2:
                    _a.sent();
                    this.then = cur;
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    this.y = 0;
                    this.jumpingGenerator = null;
                    return [2 /*return*/, 0];
            }
        });
    };
    Enha.prototype.startJump = function () {
        if (this.jumpingGenerator != null)
            return;
        this.jumpingGenerator = this.jumping();
    };
    Enha.prototype.getYDelta = function () {
        if (this.jumpingGenerator)
            return this.jumpingGenerator.next().value;
        else
            return 0;
    };
    Enha.prototype.draw = function () {
        var _a;
        var image = new Image();
        image.src = this.images[this.imageIdx];
        image.width = this.width;
        // Game.getCtx()?.fillRect(this.x, this.y, this.width, this.height)
        (_a = Game.getCtx()) === null || _a === void 0 ? void 0 : _a.drawImage(image, this.x, this.y, this.width, this.height);
    };
    Enha.prototype.nextImage = function () {
        this.imageIdx++;
        this.imageIdx %= this.images.length;
    };
    Enha.prototype.detectCollision = function (obstacle) {
        var colX = (this.width - this.collisionWidth) / 2;
        return (obstacle.x > this.x + colX && obstacle.x < this.x + this.width - colX)
            && obstacle.y < this.y + this.height;
    };
    return Enha;
}());
var enha;
function start() {
    enha = new Enha();
    var obstacles = [];
    var score = 0;
    var timer = 0;
    var speed = 10;
    var nextObTime = 1;
    function update() {
        if (Game.isRunning)
            requestAnimationFrame(update);
        if (!Game.canGoToNextFrame())
            return;
        timer++;
        Game.clearCanvas();
        enha.y -= enha.getYDelta();
        enha.draw();
        obstacles.forEach(function (obstacle, idx, list) {
            if (obstacle.x < 0) {
                list.splice(idx, 1);
                score++;
                speed += 2;
            }
            obstacle.x -= speed;
            if (enha.detectCollision(obstacle)) {
                Game.stop(score);
            }
            obstacle.draw();
        });
        var ctx = Game.getCtx();
        if (ctx != null) {
            ctx.font = 'bold 50px beaufort';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(score + '점', Game.width / 2, 70);
        }
        if (timer % (Game.fps * 0.25) == 0) {
            enha.nextImage();
        }
        if (timer == nextObTime) {
            var shape = Math.floor(Math.random() * 3);
            if (shape == 0 || shape == 1) {
                obstacles.push(new Obstacle(shape));
            }
            else {
                obstacles.push(new HorizontalObstacle());
            }
            nextObTime += Game.fps * 0.6 + Math.floor(Math.random() * Game.fps);
        }
    }
    update();
}
document.addEventListener('keydown', function (event) {
    if (event.code == 'Space') {
        enha.startJump();
    }
});
document.addEventListener('touchend', function () {
    enha.startJump();
});
document.addEventListener('click', function () {
    enha.startJump();
});
