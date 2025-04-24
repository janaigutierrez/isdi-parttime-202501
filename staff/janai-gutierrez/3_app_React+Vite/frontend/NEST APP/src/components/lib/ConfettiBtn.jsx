import React from 'react';
import confetti from 'canvas-confetti';

const CelebrationButton = () => {
  const confettiClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <button onClick={confettiClick}>Celebra!</button>
  );
};

export default CelebrationButton;
