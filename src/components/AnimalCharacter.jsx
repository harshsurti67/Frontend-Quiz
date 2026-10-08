import React from 'react';
import './AnimalCharacter.css';

// Character sheet dimensions: 1536x1024
// Grid: 8 columns (animals) x 5 rows (expressions)
// Cell size: 192px x 204.8px

const ANIMALS = ['cat', 'dog', 'panda', 'rabbit', 'fox', 'bear', 'lion', 'koala'];
const EXPRESSIONS = ['idle', 'happy', 'excited', 'thinking', 'sad'];

// Sprite sheet position mapping (x, y in pixels)
const CHARACTER_POSITIONS = {
  cat: {
    idle: { x: 0, y: 0 },
    happy: { x: 0, y: 204.8 },
    excited: { x: 0, y: 409.6 },
    thinking: { x: 0, y: 614.4 },
    sad: { x: 0, y: 819.2 },
  },
  dog: {
    idle: { x: 192, y: 0 },
    happy: { x: 192, y: 204.8 },
    excited: { x: 192, y: 409.6 },
    thinking: { x: 192, y: 614.4 },
    sad: { x: 192, y: 819.2 },
  },
  panda: {
    idle: { x: 384, y: 0 },
    happy: { x: 384, y: 204.8 },
    excited: { x: 384, y: 409.6 },
    thinking: { x: 384, y: 614.4 },
    sad: { x: 384, y: 819.2 },
  },
  rabbit: {
    idle: { x: 576, y: 0 },
    happy: { x: 576, y: 204.8 },
    excited: { x: 576, y: 409.6 },
    thinking: { x: 576, y: 614.4 },
    sad: { x: 576, y: 819.2 },
  },
  fox: {
    idle: { x: 768, y: 0 },
    happy: { x: 768, y: 204.8 },
    excited: { x: 768, y: 409.6 },
    thinking: { x: 768, y: 614.4 },
    sad: { x: 768, y: 819.2 },
  },
  bear: {
    idle: { x: 960, y: 0 },
    happy: { x: 960, y: 204.8 },
    excited: { x: 960, y: 409.6 },
    thinking: { x: 960, y: 614.4 },
    sad: { x: 960, y: 819.2 },
  },
  lion: {
    idle: { x: 1152, y: 0 },
    happy: { x: 1152, y: 204.8 },
    excited: { x: 1152, y: 409.6 },
    thinking: { x: 1152, y: 614.4 },
    sad: { x: 1152, y: 819.2 },
  },
  koala: {
    idle: { x: 1344, y: 0 },
    happy: { x: 1344, y: 204.8 },
    excited: { x: 1344, y: 409.6 },
    thinking: { x: 1344, y: 614.4 },
    sad: { x: 1344, y: 819.2 },
  },
};

const CELL_WIDTH = 192;
const CELL_HEIGHT = 204.8;

export default function AnimalCharacter({ animal = 'cat', expression = 'idle', size = 'md' }) {
  const position = CHARACTER_POSITIONS[animal]?.[expression] || CHARACTER_POSITIONS.cat.idle;
  
  // Size presets
  const sizes = {
    xs: { width: 80, height: 85 },
    sm: { width: 120, height: 128 },
    md: { width: 160, height: 170 },
    lg: { width: 200, height: 213 },
    xl: { width: 240, height: 256 },
  };
  
  const { width, height } = sizes[size] || sizes.md;

  return (
    <div
      className="animal-character"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: 'url(/characters/animal-character-sheet.png)',
        backgroundSize: '1536px 1024px',
        backgroundPosition: `-${position.x}px -${position.y}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}

AnimalCharacter.propTypes = {
  animal: React.PropTypes.oneOf(ANIMALS),
  expression: React.PropTypes.oneOf(EXPRESSIONS),
  size: React.PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
