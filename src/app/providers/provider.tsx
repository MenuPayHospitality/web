'use client';
import { PrivyProvider } from '@privy-io/react-auth';

interface ProvidersProps {
  children: React.ReactNode;
  privyId: string;
  privyClientId: string;
  mainnetRPC: string;
}

export default function Providers({ children, privyId, privyClientId, mainnetRPC }: ProvidersProps) {

  if (!privyId || !privyClientId) {
    throw new Error('Privy App ID or Client ID is missing.');
  }

  return (
    <PrivyProvider
      appId={privyId}
      clientId={privyClientId}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        solanaClusters: mainnetRPC ? [{ name: 'mainnet-beta', rpcUrl: mainnetRPC }] : [],
      }}
    >
      {children}
    </PrivyProvider>
  );
}