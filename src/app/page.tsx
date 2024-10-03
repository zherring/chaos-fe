'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Numbers from '@/components/Numbers'
// import NetworkTest from '@/components/NetworkTest'

export default function Home() {
  const account = useAccount()
  const { connectors, connect, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Chaos Game</h1>
        <Numbers />
        <br />
        {/* <NetworkTest /> */}
        {account.isConnected ? (
          <>
            <button onClick={() => disconnect()} className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600">
              Disconnect Wallet
            </button>
            <p className="mb-4">Connected to {account.address}</p>
          </>
        ) : (
          <div>
            <p className="mb-4">Connect your wallet to play:</p>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="mr-2 mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
      </div>
    </div>
  )
}