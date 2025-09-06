import Phaser from 'phaser';

export class WaterConservationGame extends Phaser.Scene {
  private score: number = 0;
  private waterSaved: number = 0;
  private leaks: Phaser.GameObjects.Rectangle[] = [];
  private faucets: Phaser.GameObjects.Rectangle[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private waterText!: Phaser.GameObjects.Text;
  private instructionsText!: Phaser.GameObjects.Text;
  private gameOver: boolean = false;
  private gameOverText!: Phaser.GameObjects.Text;
  private restartButton!: Phaser.GameObjects.Text;
  private timeLeft: number = 90;

  constructor() {
    super({ key: 'WaterConservationGame' });
  }

  preload() {
    // Create simple colored rectangles for leaks and faucets
    this.load.image('leak', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    this.load.image('faucet', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor('#4682B4');

    // Create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Create water saved text
    this.waterText = this.add.text(16, 60, 'Water Saved: 0 L', {
      fontSize: '24px',
      color: '#00ffff',
      fontFamily: 'Arial'
    });

    // Create time text
    this.add.text(16, 100, 'Time: 90', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Create instructions
    this.instructionsText = this.add.text(400, 50, 'Fix leaks and turn off faucets to save water!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Create faucets
    this.createFaucets();

    // Start timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Spawn leaks periodically
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnLeak,
      callbackScope: this,
      loop: true
    });

    // Randomly turn on faucets
    this.time.addEvent({
      delay: 4000,
      callback: this.randomizeFaucets,
      callbackScope: this,
      loop: true
    });

    // Initial leaks
    for (let i = 0; i < 3; i++) {
      this.time.delayedCall(i * 1000, this.spawnLeak, [], this);
    }
  }

  private createFaucets() {
    const faucetPositions = [
      { x: 200, y: 200 },
      { x: 400, y: 200 },
      { x: 600, y: 200 },
      { x: 150, y: 400 },
      { x: 350, y: 400 },
      { x: 550, y: 400 }
    ];

    faucetPositions.forEach((pos, index) => {
      const faucet = this.add.rectangle(pos.x, pos.y, 50, 30, 0x00ffff);
      faucet.setInteractive();
      faucet.setData('type', 'faucet');
      faucet.setData('on', true);
      faucet.setData('index', index);
      
      this.faucets.push(faucet);
    });
  }

  private spawnLeak() {
    if (this.gameOver) return;
    
    const leak = this.add.rectangle(
      Phaser.Math.Between(100, 700),
      Phaser.Math.Between(300, 500),
      30,
      30,
      0xff0000
    );

    leak.setInteractive();
    leak.setData('type', 'leak');
    leak.setData('severity', Phaser.Math.Between(1, 3));

    this.leaks.push(leak);

    // Remove leak after 15 seconds if not fixed
    this.time.delayedCall(15000, () => {
      if (leak.active) {
        leak.destroy();
        const index = this.leaks.indexOf(leak);
        if (index > -1) {
          this.leaks.splice(index, 1);
        }
      }
    });
  }

  private updateTimer() {
    if (this.gameOver) return;
    
    this.timeLeft--;
    
    if (this.timeLeft <= 0) {
      this.endGame();
    }
  }

  private randomizeFaucets() {
    if (this.gameOver) return;
    
    // Randomly turn on some faucets
    this.faucets.forEach(faucet => {
      if (Math.random() < 0.4) {
        this.turnOnFaucet(faucet);
      }
    });
  }

  private turnOnFaucet(faucet: Phaser.GameObjects.Rectangle) {
    faucet.setData('on', true);
    faucet.setFillStyle(0x00ffff);
  }

  private turnOffFaucet(faucet: Phaser.GameObjects.Rectangle) {
    faucet.setData('on', false);
    faucet.setFillStyle(0x666666);
    
    // Calculate water saved
    const waterValue = 2; // 2 liters per faucet
    this.waterSaved += waterValue;
    this.score += waterValue * 10;
    
    this.scoreText.setText(`Score: ${this.score}`);
    this.waterText.setText(`Water Saved: ${this.waterSaved.toFixed(0)} L`);
    
    // Show feedback
    this.add.text(faucet.x, faucet.y - 30, `+${waterValue * 10}`, {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
  }

  private fixLeak(leak: Phaser.GameObjects.Rectangle) {
    const severity = leak.getData('severity');
    const waterValue = severity * 5; // 5, 10, or 15 liters based on severity
    
    this.waterSaved += waterValue;
    this.score += waterValue * 10;
    
    this.scoreText.setText(`Score: ${this.score}`);
    this.waterText.setText(`Water Saved: ${this.waterSaved.toFixed(0)} L`);
    
    // Show feedback
    this.add.text(leak.x, leak.y - 30, `+${waterValue * 10}`, {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    // Remove leak
    leak.destroy();
    const index = this.leaks.indexOf(leak);
    if (index > -1) {
      this.leaks.splice(index, 1);
    }
  }

  private endGame() {
    this.gameOver = true;
    
    // Stop all events
    this.time.removeAllEvents();
    
    // Show game over screen
    this.gameOverText = this.add.text(400, 300, `Time's Up!\nWater Saved: ${this.waterSaved.toFixed(0)} L\nScore: ${this.score}`, {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5);
    
    // Add restart button
    this.restartButton = this.add.text(400, 450, 'Click to Restart', {
      fontSize: '24px',
      color: '#ffff00',
      fontFamily: 'Arial'
    }).setOrigin(0.5).setInteractive();
    
    this.restartButton.on('pointerdown', () => {
      this.scene.restart();
    });
  }

  update() {
    if (this.gameOver) return;
    
    // Handle clicking
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const clickedObjects = this.input.hitTestPointer(pointer);
      
      clickedObjects.forEach(obj => {
        if (obj.getData('type') === 'faucet' && obj.getData('on')) {
          this.turnOffFaucet(obj as Phaser.GameObjects.Rectangle);
        } else if (obj.getData('type') === 'leak') {
          this.fixLeak(obj as Phaser.GameObjects.Rectangle);
        }
      });
    });
  }
}

export const waterConservationGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'water-conservation-game',
  backgroundColor: '#4682B4',
  scene: WaterConservationGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};
