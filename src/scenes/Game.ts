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

        this.ball = this.add.circle(512, 20, 20, 0xff0000);
        this.ballVelocity = new Phaser.Math.Vector2(200, 150);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update (time: number, delta: number)
    {
        if (this.cursors.left.isDown)
        {
            this.rectangle.x -= 5;
        }
        else if (this.cursors.right.isDown)
        {
            this.rectangle.x += 5;
        }

        if (this.cursors.up.isDown)
        {
            this.rectangle.y -= 5;
        }
        else if (this.cursors.down.isDown)
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
        }
        else
        {
            this.rectangle.setFillStyle(0xffa500);
        }
    }
}
