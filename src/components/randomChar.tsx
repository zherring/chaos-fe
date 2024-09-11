import React, { useState, useEffect, useCallback } from 'react';

interface RandomCharProps {
  char: string;
  width?: string;
  refreshInterval?: number;
  onStateChange: (number: number) => void;
}

const RandomChar: React.FC<RandomCharProps> = ({ char, width = '100%', refreshInterval = 5000, onStateChange }) => {
  const [randomPath, setRandomPath] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const fetchSVG = useCallback(async () => {
    try {
      const newRandomNumber = Math.floor(Math.random() * 15) + 1;
      setRandomNumber(newRandomNumber);
      onStateChange(newRandomNumber);
      console.log(`RandomChar ${char}: New number ${newRandomNumber}`); // Debug log
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
  }, [char, onStateChange]);

  useEffect(() => {
    fetchSVG();
    const intervalId = setInterval(fetchSVG, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchSVG, refreshInterval]);

  return (
    <div className="w-full bg-slate-400 p-2 rounded" style={{ width }}>
      <div className="text-xs text-white mb-1">Random Number: {randomNumber}</div>
      <div className="relative w-full pt-[100%]">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          dangerouslySetInnerHTML={{ __html: randomPath || '' }}
        />
      </div>
    </div>
  );
};

export default RandomChar;