'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import RandomChar from '@/components/randomChar'
// import TitleC from '@/components/c'
// import TitleH from '@/components/h'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      {/* <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div> */}

      {/* <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div> */}
        <div className='flex flex-col w-full'>
        <h1>Random Character</h1>
          <div className='flex flex-row justify-between items-center content-center'>

            <RandomChar char="c" />
            <RandomChar char="h" />
            <RandomChar char="a" />
            <RandomChar char="o" />
            <RandomChar char="s" />
          </div>
        </div>
    </>
  )
}

export default App
