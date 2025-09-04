import Phaser from 'phaser';

export class RecyclingGame extends Phaser.Scene {
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private items: Phaser.GameObjects.Rectangle[] = [];
  private bins: { [key: string]: Phaser.GameObjects.Rectangle } = {};

  constructor() {
    super({ key: 'RecyclingGame' });
  }

  preload() {
    // Create simple colored rectangles for items
    this.load.image('plastic', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    this.load.image('paper', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    this.load.image('glass', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor('#2c5530');

    // Create bins
    this.createBins();

    // Create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Create instructions
    this.add.text(400, 50, 'Drag items to the correct recycling bins!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Spawn items periodically
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnItem,
      callbackScope: this,
      loop: true
    });

    // Initial items
    for (let i = 0; i < 3; i++) {
      this.time.delayedCall(i * 1000, this.spawnItem, [], this);
    }
  }

  private createBins() {
    const binTypes = ['plastic', 'paper', 'glass'];
    const binColors = [0x0066cc, 0x8B4513, 0x00ff00];
    const binPositions = [200, 400, 600];

    binTypes.forEach((type, index) => {
      const bin = this.add.rectangle(binPositions[index], 500, 100, 150, binColors[index]);
      bin.setInteractive();
      bin.setData('type', type);
      
      // Add label
      this.add.text(binPositions[index], 580, type.toUpperCase(), {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5);

      this.bins[type] = bin;
    });
  }

  private spawnItem() {
    const itemTypes = ['plastic', 'paper', 'glass'];
    const itemColors = [0x0066cc, 0x8B4513, 0x00ff00];
    const randomType = Phaser.Utils.Array.GetRandom(itemTypes);
    const typeIndex = itemTypes.indexOf(randomType);

    const item = this.add.rectangle(
      Phaser.Math.Between(50, 750),
      Phaser.Math.Between(100, 200),
      30,
      30,
      itemColors[typeIndex]
    );

    item.setInteractive();
    item.setData('type', randomType);

    // Make item draggable
    this.input.setDraggable(item);

    this.items.push(item);

    // Remove item after 10 seconds if not used
    this.time.delayedCall(10000, () => {
      if (item.active) {
        item.destroy();
        const index = this.items.indexOf(item);
        if (index > -1) {
          this.items.splice(index, 1);
        }
      }
    });
  }

  update() {
    // Handle drag and drop
    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Rectangle) => {
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;
    });

    this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Rectangle) => {
      const itemType = gameObject.getData('type');
      const bin = this.bins[itemType];

      if (bin && Phaser.Geom.Rectangle.Contains(bin.getBounds(), pointer.x, pointer.y)) {
        // Correct bin!
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        
        // Add particle effect
        this.add.particles(pointer.x, pointer.y, 'plastic', {
          speed: { min: 50, max: 100 },
          scale: { start: 0.5, end: 0 },
          lifespan: 500
        });

        gameObject.destroy();
        const index = this.items.indexOf(gameObject);
        if (index > -1) {
          this.items.splice(index, 1);
        }
      }
    });
  }
}

export const recyclingGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'recycling-game',
  backgroundColor: '#2c5530',
  scene: RecyclingGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};
