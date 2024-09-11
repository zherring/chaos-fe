'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import RandomChar from '@/components/RandomChar'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [savedConfigurations, setSavedConfigurations] = useState<number[][]>([])
  const currentConfigurationRef = useRef<number[]>([0, 0, 0, 0, 0])

  const handleStateChange = useCallback((index: number, number: number) => {
    if (currentConfigurationRef.current) {
      currentConfigurationRef.current[index] = number
      console.log(`App: Updated index ${index} to ${number}`); // Debug log
      console.log(`Current configuration: ${currentConfigurationRef.current}`); // Debug log
    } else {
      console.error('currentConfigurationRef.current is undefined');
    }
  }, [])

  const saveConfiguration = () => {
    if (currentConfigurationRef.current) {
      console.log(`Saving configuration: ${currentConfigurationRef.current}`); // Debug log
      setSavedConfigurations(prev => [...prev, [...currentConfigurationRef.current]])
    } else {
      console.error('Unable to save configuration: currentConfigurationRef.current is undefined');
    }
  }

  useEffect(() => {
    console.log('App mounted');
    return () => {
      console.log('App unmounted');
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
          {completionStatus.map((status, index) => (
            <div key={index} className="bg-slate-400 p-2 rounded text-white">
              {index + 1}: {status}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">Saved Configurations:</h2>
        <div className="space-y-2">
          {savedConfigurations.map((config, index) => (
            <div key={index} className="bg-slate-400 p-2 rounded text-white">
              {config.join(', ')}
            </div>
          ))}
        </div>
      </div>
      {checkForWin() && (
        <div className="mt-4 text-green-500 font-bold">
          Congratulations! You've won!
        </div>
      )}
    </div>
  )
}

export default App
