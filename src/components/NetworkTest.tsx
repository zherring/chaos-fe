'use client'

import { useBlockNumber, useContractRead } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'

// ABI for the contract functions
const ABI = [
  {
    "inputs": [],
    "name": "ARRAY_LENGTH",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextTokenId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }],
    "name": "getRandomNumbers",
    "outputs": [{ "internalType": "uint256[5]", "name": "", "type": "uint256[5]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "prizePool",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract address
const CONTRACT_ADDRESS = '0xc9b51757c31eFaE5ac46bd63Bb25db86386F55a0'

export default function NetworkTest() {
  const [nextTokenId, setnextTokenId] = useState<number | null>(null)

  const { data: blockNumber, isError: blockError, isLoading: blockLoading } = useBlockNumber({
    chainId: baseSepolia.id,
  })

  const { data: arrayLength, isError: arrayLengthError, isLoading: arrayLengthLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'ARRAY_LENGTH',
    chainId: baseSepolia.id,
  })

  const { data: nextTokenIdData, isError: nextTokenIdError, isLoading: nextTokenIdLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'nextTokenId',
    chainId: baseSepolia.id,
  })

  const { data: randomNumbers, isError: randomNumbersError, isLoading: randomNumbersLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getRandomNumbers',
    args: nextTokenId !== null ? [BigInt(nextTokenId)] : undefined,
    enabled: nextTokenId !== null,
    chainId: baseSepolia.id,
  })

  const { data: prizePool, isError: prizePoolError, isLoading: prizePoolLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'prizePool',
    chainId: baseSepolia.id,
  })

  useEffect(() => {
    if (nextTokenIdData) {
      setnextTokenId(Number(nextTokenIdData))
    }
  }, [nextTokenIdData])

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-2">Network Test</h2>
      <p>Target Network: Base Sepolia</p>
      <p>Latest Block Number: {
        blockLoading ? 'Loading...' : 
        blockError ? 'Error fetching block number' : 
        blockNumber?.toString()
      }</p>
      <h3 className="text-lg font-semibold mt-4">Contract Data:</h3>
      <p>ARRAY_LENGTH: {
        arrayLengthLoading ? 'Loading...' :
        arrayLengthError ? 'Error fetching ARRAY_LENGTH' :
        arrayLength !== undefined ? arrayLength.toString() : 'N/A'
      }</p>
      <p>Next Token ID: {
        nextTokenIdLoading ? 'Loading...' :
        nextTokenIdError ? 'Error fetching nextTokenId' :
        nextTokenId !== null ? nextTokenId.toString() : 'N/A'
      }</p>
      <p>Random Numbers: {
        randomNumbersLoading ? 'Loading...' :
        randomNumbersError ? 'Error fetching random numbers' :
        randomNumbers ? randomNumbers.join(', ') : 'N/A'
      }</p>
      <p>Prize Pool: {
        prizePoolLoading ? 'Loading...' :
        prizePoolError ? 'Error fetching prize pool' :
        prizePool ? `${formatEther(prizePool)} ETH` : 'N/A'
      }</p>
    </div>
  )
}