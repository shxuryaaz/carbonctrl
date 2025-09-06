import Phaser from 'phaser';

export class TreePlantingGame extends Phaser.Scene {
  private score: number = 0;
  private trees: Phaser.GameObjects.Rectangle[] = [];
  private seeds: Phaser.GameObjects.Rectangle[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private instructionsText!: Phaser.GameObjects.Text;
  private gameOver: boolean = false;
  private gameOverText!: Phaser.GameObjects.Text;
  private restartButton!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'TreePlantingGame' });
  }

  preload() {
    // Create simple colored rectangles for seeds and trees
    this.load.image('seed', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    this.load.image('tree', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor('#87CEEB');

    // Create ground
    this.add.rectangle(400, 550, 800, 100, 0x8B4513);

    // Create score text
    this.scoreText = this.add.text(16, 16, 'Trees Planted: 0', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Create instructions
    this.instructionsText = this.add.text(400, 50, 'Click on seeds to plant trees!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Spawn seeds periodically
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnSeed,
      callbackScope: this,
      loop: true
    });

    // Initial seeds
    for (let i = 0; i < 5; i++) {
      this.time.delayedCall(i * 500, this.spawnSeed, [], this);
    }
  }

  private spawnSeed() {
    if (this.gameOver) return;
    
    const seed = this.add.rectangle(
      Phaser.Math.Between(50, 750),
      500,
      20,
      20,
      0x8B4513
    );

    seed.setInteractive();
    seed.setData('type', 'seed');
    seed.setData('growth', 0);

    this.seeds.push(seed);

    // Remove seed after 10 seconds if not planted
    this.time.delayedCall(10000, () => {
      if (seed.active) {
        seed.destroy();
        const index = this.seeds.indexOf(seed);
        if (index > -1) {
          this.seeds.splice(index, 1);
        }
      }
    });
  }

  private plantTree(seed: Phaser.GameObjects.Rectangle) {
    const x = seed.x;
    const y = seed.y;

    // Remove seed
    seed.destroy();
    const seedIndex = this.seeds.indexOf(seed);
    if (seedIndex > -1) {
      this.seeds.splice(seedIndex, 1);
    }

    // Create tree
    const tree = this.add.rectangle(x, y - 20, 30, 60, 0x228B22);
    tree.setData('type', 'tree');
    tree.setData('growth', 0);
    tree.setData('maxGrowth', 100);

    this.trees.push(tree);

    // Start growth animation
    this.time.addEvent({
      delay: 1000,
      callback: () => this.growTree(tree),
      callbackScope: this,
      loop: true
    });

    // Update score
    this.score += 10;
    this.scoreText.setText(`Trees Planted: ${this.score}`);

    // Show feedback
    this.add.text(x, y - 50, '+10', {
      fontSize: '20px',
      color: '#00ff00',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Check win condition
    if (this.score >= 50) {
      this.endGame(true);
    }
  }

  private growTree(tree: Phaser.GameObjects.Rectangle) {
    const currentGrowth = tree.getData('growth');
    const maxGrowth = tree.getData('maxGrowth');

    if (currentGrowth < maxGrowth) {
      const newGrowth = currentGrowth + 10;
      tree.setData('growth', newGrowth);
      
      // Increase tree size
      const scale = 0.5 + (newGrowth / maxGrowth) * 0.5;
      tree.setScale(scale);
      
      // Change color as it grows
      const greenIntensity = Math.floor(34 + (newGrowth / maxGrowth) * 100);
      tree.setFillStyle(Phaser.Display.Color.GetColor(34, greenIntensity, 34));
    }
  }

  private endGame(won: boolean = false) {
    this.gameOver = true;
    
    // Stop spawning seeds
    this.time.removeAllEvents();
    
    // Show game over screen
    const message = won ? `Congratulations!\nYou planted ${this.score} trees!` : `Game Over!\nTrees Planted: ${this.score}`;
    this.gameOverText = this.add.text(400, 300, message, {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5);
    
    // Add restart button
    this.restartButton = this.add.text(400, 400, 'Click to Restart', {
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
    
    // Handle seed clicking
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const clickedObjects = this.input.hitTestPointer(pointer);
      
      clickedObjects.forEach(obj => {
        if (obj.getData('type') === 'seed') {
          this.plantTree(obj as Phaser.GameObjects.Rectangle);
        }
      });
    });
  }
}

export const treePlantingGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'tree-planting-game',
  backgroundColor: '#87CEEB',
  scene: TreePlantingGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};
