import React from 'react';
import './AnimalCharacter.css';

// Supported animals and expressions
const ANIMALS = ['cat', 'dog', 'panda', 'fox', 'lion'];
const EXPRESSIONS = ['idle', 'happy', 'excited'];

export default function AnimalCharacter({ animal = 'cat', expression = 'idle', size = 'md', className = '' }) {
  // Safe fallback for invalid props
  const safeAnimal = ANIMALS.includes(animal) ? animal : 'cat';
  const safeExpression = EXPRESSIONS.includes(expression) ? expression : 'idle';

  // Build image path: /characters/{animal}/{animal}_{expression}.png
  const imagePath = `/characters/${safeAnimal}/${safeAnimal}_${safeExpression}.png`;

  // Size presets
  const sizes = {
    xs: { width: 80, height: 80 },
    sm: { width: 120, height: 120 },
    md: { width: 160, height: 160 },
    lg: { width: 200, height: 200 },
    xl: { width: 240, height: 240 },
  };

  const { width, height } = sizes[size] || sizes.md;

  return (
    <img
      src={imagePath}
      alt={`${safeAnimal} ${safeExpression}`}
      className={`animal-character ${className || ''}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain',
      }}
      onError={(e) => {
        // Fallback to cat idle if image fails to load
        if (e.target.src !== '/characters/cat/cat_idle.png') {
          e.target.src = '/characters/cat/cat_idle.png';
        }
      }}
    />
  );
}
