'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { MOCK_WALLET_ADDRESS } from '@/lib/walletConfig'

type WalletContextValue = {
    address: string | null
    isConnected: boolean
    connect: () => void
    disconnect: () => void
}

const WalletContext = createContext<WalletContextValue | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const [address, setAddress] = useState<string | null>(null)

    const value = useMemo<WalletContextValue>(() => ({
        address,
        isConnected: Boolean(address),
        connect: () => setAddress(MOCK_WALLET_ADDRESS),
        disconnect: () => setAddress(null)
    }), [address])

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}

export function useMockWallet() {
    const context = useContext(WalletContext)
    if (!context) {
        throw new Error('WalletProvider is missing')
    }
    return context
}
