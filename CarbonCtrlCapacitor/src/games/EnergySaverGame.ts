import Phaser from 'phaser';

export class EnergySaverGame extends Phaser.Scene {
  private score: number = 0;
  private energySaved: number = 0;
  private lightObjects: Phaser.GameObjects.Rectangle[] = [];
  private appliances: Phaser.GameObjects.Rectangle[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private energyText!: Phaser.GameObjects.Text;
  private instructionsText!: Phaser.GameObjects.Text;
  private gameOver: boolean = false;
  private gameOverText!: Phaser.GameObjects.Text;
  private restartButton!: Phaser.GameObjects.Text;
  private timeLeft: number = 60;

  constructor() {
    super({ key: 'EnergySaverGame' });
  }

  preload() {
    // Create simple colored rectangles for lights and appliances
    this.load.image('light', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    this.load.image('appliance', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Create energy saved text
    this.energyText = this.add.text(16, 60, 'Energy Saved: 0 kWh', {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'Arial'
    });

    // Create time text
    this.add.text(16, 100, 'Time: 60', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Create instructions
    this.instructionsText = this.add.text(400, 50, 'Turn off lights and appliances to save energy!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Create lights and appliances
    this.createLights();
    this.createAppliances();

    // Start timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Randomly turn on/off devices
    this.time.addEvent({
      delay: 2000,
      callback: this.randomizeDevices,
      callbackScope: this,
      loop: true
    });
  }

  private createLights() {
    const lightPositions = [
      { x: 150, y: 200 },
      { x: 300, y: 200 },
      { x: 450, y: 200 },
      { x: 600, y: 200 },
      { x: 200, y: 350 },
      { x: 400, y: 350 },
      { x: 600, y: 350 }
    ];

    lightPositions.forEach((pos, index) => {
      const light = this.add.rectangle(pos.x, pos.y, 40, 40, 0xffff00);
      light.setInteractive();
      light.setData('type', 'light');
      light.setData('on', true);
      light.setData('index', index);
      
      this.lightObjects.push(light);
    });
  }

  private createAppliances() {
    const appliancePositions = [
      { x: 200, y: 450, type: 'tv' },
      { x: 400, y: 450, type: 'computer' },
      { x: 600, y: 450, type: 'heater' }
    ];

    appliancePositions.forEach((pos, index) => {
      const appliance = this.add.rectangle(pos.x, pos.y, 60, 40, 0xff6b6b);
      appliance.setInteractive();
      appliance.setData('type', 'appliance');
      appliance.setData('applianceType', pos.type);
      appliance.setData('on', true);
      appliance.setData('index', index);
      
      this.appliances.push(appliance);
    });
  }

  private updateTimer() {
    if (this.gameOver) return;
    
    this.timeLeft--;
    
    if (this.timeLeft <= 0) {
      this.endGame();
    }
  }

  private randomizeDevices() {
    if (this.gameOver) return;
    
    // Randomly turn on some devices
    this.lightObjects.forEach(light => {
      if (Math.random() < 0.3) {
        this.turnOnDevice(light);
      }
    });
    
    this.appliances.forEach(appliance => {
      if (Math.random() < 0.2) {
        this.turnOnDevice(appliance);
      }
    });
  }

  private turnOnDevice(device: Phaser.GameObjects.Rectangle) {
    device.setData('on', true);
    
    if (device.getData('type') === 'light') {
      device.setFillStyle(0xffff00);
    } else {
      device.setFillStyle(0xff6b6b);
    }
  }

  private turnOffDevice(device: Phaser.GameObjects.Rectangle) {
    device.setData('on', false);
    device.setFillStyle(0x666666);
    
    // Calculate energy saved
    let energyValue = 0;
    if (device.getData('type') === 'light') {
      energyValue = 0.1; // 0.1 kWh per light
    } else {
      energyValue = 0.5; // 0.5 kWh per appliance
    }
    
    this.energySaved += energyValue;
    this.score += Math.floor(energyValue * 100);
    
    this.scoreText.setText(`Score: ${this.score}`);
    this.energyText.setText(`Energy Saved: ${this.energySaved.toFixed(1)} kWh`);
    
    // Show feedback
    this.add.text(device.x, device.y - 30, `+${Math.floor(energyValue * 100)}`, {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
  }

  private endGame() {
    this.gameOver = true;
    
    // Stop all events
    this.time.removeAllEvents();
    
    // Show game over screen
    this.gameOverText = this.add.text(400, 300, `Time's Up!\nEnergy Saved: ${this.energySaved.toFixed(1)} kWh\nScore: ${this.score}`, {
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
    
    // Handle device clicking
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const clickedObjects = this.input.hitTestPointer(pointer);
      
      clickedObjects.forEach(obj => {
        if ((obj.getData('type') === 'light' || obj.getData('type') === 'appliance') && obj.getData('on')) {
          this.turnOffDevice(obj as Phaser.GameObjects.Rectangle);
        }
      });
    });
  }
}

export const energySaverGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'energy-saver-game',
  backgroundColor: '#1a1a2e',
  scene: EnergySaverGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};
