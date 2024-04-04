class Car2 {
    constructor() {
        this.r = 200;
        this.x = width;
        this.y = 300 - this.r;
        this.img = car2Img;
        this.collisionRadius = this.r;
    }

    move() {
        if (score > 150) {
            this.x -= 25;
        } else if (score > 100) {
            this.x -= 20;
        } else if (score > 50) {
            this.x -= 15;
        } else {
            this.x -= 10;
        }
    }

    show() {
            image(this.img, this.x, this.y, this.r, this.r);
        }
}