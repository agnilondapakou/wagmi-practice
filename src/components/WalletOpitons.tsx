import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import './WalletOptions.css'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ))
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <>
      <button id="provider-button" disabled={!ready} onClick={onClick}>
        <img src={`${connector.icon}`} alt={connector.name} />
        {connector.name}
      </button>
    </>
  )
}