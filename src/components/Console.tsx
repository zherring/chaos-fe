'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import RandomChar from '@/components/randomChar'

export default function Console() {
  const [savedConfigurations, setSavedConfigurations] = useState<number[][]>([])
  const currentConfigurationRef = useRef<number[]>([0, 0, 0, 0, 0])

  const handleStateChange = useCallback((index: number, number: number) => {
    if (currentConfigurationRef.current) {
      currentConfigurationRef.current[index] = number
      console.log(`Console: Updated index ${index} to ${number}`);
      console.log(`Current configuration: ${currentConfigurationRef.current}`);
    } else {
      console.error('currentConfigurationRef.current is undefined');
    }
  }, [])

  const saveConfiguration = () => {
    if (currentConfigurationRef.current) {
      console.log(`Saving configuration: ${currentConfigurationRef.current}`);
      setSavedConfigurations(prev => [...prev, [...currentConfigurationRef.current]])
    } else {
      console.error('Unable to save configuration: currentConfigurationRef.current is undefined');
    }
  }

  useEffect(() => {
    console.log('Console mounted');
    return () => {
      console.log('Console unmounted');
    }
  }, []);

  const checkForWin = () => {
    return savedConfigurations.some(config => 
      config.every(num => num === config[0] && num !== 0)
    )
  }

  const completionStatus = savedConfigurations.reduce((status, config) => {
    config.forEach(num => {
      if (num > 0 && num <= 8) {
        status[num - 1]++
      }
    })
    return status
  }, Array(8).fill(0)).map(count => `${count}/5`)

  return (
    <div className='flex flex-col w-full p-4'>
      <h1 className="text-2xl font-bold mb-4 text-white">Random Character</h1>
      <div className='flex flex-row justify-between items-center content-center mb-4'>
        {['c', 'h', 'a', 'o', 's'].map((char, index) => (
          <RandomChar 
            key={char} 
            char={char} 
            onStateChange={(number) => handleStateChange(index, number)}
          />
        ))}
      </div>
      <button onClick={saveConfiguration} className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Save Configuration
      </button>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">Completion Status:</h2>
        <div className="grid grid-cols-4 gap-2">
          {completionStatus.