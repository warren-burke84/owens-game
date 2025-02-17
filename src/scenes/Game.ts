import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    rectangle: Phaser.GameObjects.Rectangle;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    ball: Phaser.GameObjects.Arc;
    ballVelocity: Phaser.Math.Vector2;
    score: number;
    scoreText: Phaser.GameObjects.Text;
    healthBar: Phaser.GameObjects.Rectangle;
    playerHealth: number;
    star: Phaser.GameObjects.Image;
    starVelocity: Phaser.Math.Vector2;
    wasdKeys: { [key: string]: Phaser.Input.Keyboard.Key };
    presents: Phaser.GameObjects.Polygon[];
    triangleSpawnTimer: Phaser.Time.TimerEvent;
    triangleTimers: Map<Phaser.GameObjects.Polygon, Phaser.Time.TimerEvent>;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xffa500);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.rectangle = this.add.rectangle(512, this.cameras.main.height - 50, 200, 100, 0xffa500);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasdKeys = {
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        this.ball = this.add.circle(512, 20, 20, 0xffff00);
        this.ball.setStrokeStyle(2, 0x00ffff);
        this.ballVelocity = new Phaser.Math.Vector2(200, 150);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        this.healthBar = this.add.rectangle(512, 10, 800, 20, 0x00ff00);
        this.playerHealth = 100;

        this.star = this.add.image(100, 100, 'star');
        this.starVelocity = new Phaser.Math.Vector2(300, 300);

        this.presents = [];
        this.triangleTimers = new Map();
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, this.cameras.main.width - 50);
            const y = Phaser.Math.Between(50, this.cameras.main.height - 50);
            const present = this.add.polygon(x, y, [0, 0, 20, 40, 40, 0], 0x00ff00);
            this.presents.push(present);
            const timer = this.time.addEvent({
                delay: 2500,
                callback: () => {
                    present.destroy();
                    this.triangleTimers.delete(present);
                },
                callbackScope: this
            });
            this.triangleTimers.set(present, timer);
        }

        this.triangleSpawnTimer = this.time.addEvent({
            delay: 2500,
            callback: this.spawnTriangle,
            callbackScope: this,
            loop: true
        });

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update (time: number, delta: number)
    {
        if (this.cursors.left.isDown || this.wasdKeys.A.isDown)
        {
            this.rectangle.x -= 5;
        }
        else if (this.cursors.right.isDown || this.wasdKeys.D.isDown)
        {
            this.rectangle.x += 5;
        }

        if (this.cursors.up.isDown || this.wasdKeys.W.isDown)
        {
            this.rectangle.y -= 5;
        }
        else if (this.cursors.down.isDown || this.wasdKeys.S.isDown)
        {
            this.rectangle.y += 5;
        }

        // Prevent the rectangle from moving off screen
        if (this.rectangle.x < this.rectangle.width / 2)
        {
            this.rectangle.x = this.rectangle.width / 2;
        }
        else if (this.rectangle.x > this.cameras.main.width - this.rectangle.width / 2)
        {
            this.rectangle.x = this.cameras.main.width - this.rectangle.width / 2;
        }

        if (this.rectangle.y < this.rectangle.height / 2)
        {
            this.rectangle.y = this.rectangle.height / 2;
        }
        else if (this.rectangle.y > this.cameras.main.height - this.rectangle.height / 2)
        {
            this.rectangle.y = this.cameras.main.height - this.rectangle.height / 2;
        }

        // Update ball position
        this.ball.x += this.ballVelocity.x * (delta / 1000);
        this.ball.y += this.ballVelocity.y * (delta / 1000);

        // Bounce the ball off the screen edges
        if (this.ball.x < this.ball.radius || this.ball.x > this.cameras.main.width - this.ball.radius)
        {
            this.ballVelocity.x *= -1;
        }

        if (this.ball.y < this.ball.radius || this.ball.y > this.cameras.main.height - this.ball.radius)
        {
            this.ballVelocity.y *= -1;
        }

        // Change rectangle color to blue if the ball collides with the rectangle
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.ball.getBounds(), this.rectangle.getBounds()))
        {
            this.rectangle.setFillStyle(0x0000ff);
            // Make the ball bounce off the rectangle
            this.ballVelocity.y *= -1;
            // Update score
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            // Increase ball speed as score increases
            this.ballVelocity.scale(1.05);
            // Cap the ball speed
            this.ballVelocity.x = Phaser.Math.Clamp(this.ballVelocity.x, -500, 500);
            this.ballVelocity.y = Phaser.Math.Clamp(this.ballVelocity.y, -500, 500);
        }
        else
        {
            this.rectangle.setFillStyle(0xffa500);
        }

        // Update star position
        this.star.x += this.starVelocity.x * (delta / 1000);
        this.star.y += this.starVelocity.y * (delta / 1000);

        // Bounce the star off the screen edges
        if (this.star.x < this.star.width / 2 || this.star.x > this.cameras.main.width - this.star.width / 2)
        {
            this.starVelocity.x *= -1;
        }

        if (this.star.y < this.star.height / 2 || this.star.y > this.cameras.main.height - this.star.height / 2)
        {
            this.starVelocity.y *= -1;
        }

        // Decrease player health if the rectangle collides with the star
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.rectangle.getBounds(), this.star.getBounds()))
        {
            this.playerHealth -= 20;
            this.healthBar.width = 8 * this.playerHealth;
            // Make the star bounce off the rectangle
            this.starVelocity.y *= -1;
        }

        // Change the screen to game over if health reaches 0
        if (this.playerHealth <= 0)
        {
            this.scene.start('GameOver');
        }

        // Check if the rectangle and triangles are at 2000
        if (this.score >= 2000) {
            // Trigger a special event
            console.log("Special event triggered!");
        }

        // Check for collision between rectangle and presents
        for (let i = 0; i < this.presents.length; i++) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.rectangle.getBounds(), this.presents[i].getBounds())) {
                this.score += 2000;
                this.scoreText.setText('Score: ' + this.score);
                this.presents[i].destroy();
                this.presents.splice(i, 1);
                i--; // Adjust index after removal
            }
        }
    }

    spawnTriangle() {
        let x, y;
        do {
            x = Phaser.Math.Between(50, this.cameras.main.width - 50);
            y = Phaser.Math.Between(50, this.cameras.main.height - 50);
        } while (Phaser.Geom.Intersects.RectangleToRectangle(this.rectangle.getBounds(), new Phaser.Geom.Rectangle(x, y, 40, 40)));

        const present = this.add.polygon(x, y, [0, 0, 20, 40, 40, 0], 0x00ff00);
        this.presents.push(present);
        const timer = this.time.addEvent({
            delay: 2500,
            callback: () => {
                present.destroy();
                this.triangleTimers.delete(present);
            },
            callbackScope: this
        });
        this.triangleTimers.set(present, timer);
    }
}
