'use client'

import { useState, useEffect } from 'react'
import { baseSepolia } from 'wagmi/chains'
import { useContractRead, useBlockNumber } from 'wagmi'

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

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-white text-9xl font-bold flex space-x-4">
        [
        {randomNumbers.map((number, index) => (
          <div key={index} className="flex items-center justify-center">
            {number.toString()},
          </div>
        ))}
        ]
      </div>
    </div>
  )
}
