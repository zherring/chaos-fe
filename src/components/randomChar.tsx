import React, { useState, useEffect, useCallback } from 'react';
import styles from '../app/css/RandomChar.module.css'

interface RandomCharProps {
  char: string;
  width?: string;
  refreshInterval?: number; // in milliseconds
}

const RandomChar: React.FC<RandomCharProps> = ({ char, width = '100%', refreshInterval = 500 }) => {
  const [randomPath, setRandomPath] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const fetchSVG = useCallback(async () => {
    try {
      const newRandomNumber = Math.floor(Math.random() * 8) + 1;
      setRandomNumber(newRandomNumber);
      const response = await fetch(`/svg/${char}/${newRandomNumber}.svg`);
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
      }
      const text = await response.text();
      const cleanedSvg = text.replace(/(width|height)="[^"]*"/g, '');
      setRandomPath(cleanedSvg);
    } catch (error) {
      console.error(error);
    }
  }, [char]);

  useEffect(() => {
    fetchSVG(); // Initial fetch

    const intervalId = setInterval(fetchSVG, refreshInterval);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchSVG, refreshInterval]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.debug}>Random Number: {randomNumber}</div>
      <div className={styles.aspectRatioBox}>
        <svg
          className={styles.svg}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          dangerouslySetInnerHTML={{ __html: randomPath || '' }}
        />
      </div>
    </div>
  );
};

export default RandomChar;