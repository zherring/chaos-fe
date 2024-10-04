'use client'

import { useState, useEffect } from 'react'
import { baseSepolia } from 'wagmi/chains'
import { useContractRead } from 'wagmi'
import { useSavedNumbers } from '../app/context/SavedNumbersContext'

const ABI = [
  {
    "inputs": [],
    "name": "nextTokenId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "getRandomNumbers",
    "outputs": [{ "internalType": "uint256[5]", "name": "", "type": "uint256[5]" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const CONTRACT_ADDRESS = '0xc9b51757c31eFaE5ac46bd63Bb25db86386F55a0'

export default function Numbers() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  const [refreshKey, setRefreshKey] = useState(0)
  const { savedSets, addSavedSet } = useSavedNumbers()  // Use the context here

  const { data: nextTokenId, refetch: refetchTokenId } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'nextTokenId',
    chainId: baseSepolia.id,
  })

  const { data: numbersData, refetch: refetchNumbers } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getRandomNumbers',
    args: nextTokenId ? [nextTokenId] : undefined,
    enabled: !!nextTokenId,
    chainId: baseSepolia.id,
  })

  useEffect(() => {
    if (numbersData) {
      setRandomNumbers(numbersData.map(n => Number(n)))
    }
  }, [numbersData])

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1)
      refetchTokenId()
      refetchNumbers()
    }, 1000)

    return () => clearInterval(timer)
  }, [refetchTokenId, refetchNumbers])

  const handleSave = () => {
    addSavedSet(randomNumbers)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="text-lg flex space-x-4 mb-8">
        <span className='text-gray-600'>[</span>
        {randomNumbers.map((number, index) => (
          <span key={index}>
            {number.toString()}
            {index < randomNumbers.length - 1 && ','}
          </span>
        ))}
        <span className='text-gray-600'>]</span>
      </div>
      
      <button 
        onClick={handleSave}
        className="bg-white text-black px-4 py-2 rounded-md mb-8 hover:bg-gray-200 transition-colors"
      >
        Save Current Set
      </button>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Saved Sets:</h2>
        <div className="space-y-2">
          {savedSets.map((set, index) => (
            <div key={index} className="bg-gray-800 p-2 rounded-md">
              [
              {set.map((number, idx) => (
                <span key={idx}>
                  {number.toString()}
                  {idx < set.length - 1 && ', '}
                </span>
              ))}
              ]
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
