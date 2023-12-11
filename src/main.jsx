import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { configureChains, mainnet, WagmiConfig, createConfig } from 'wagmi';
import { publicProvider } from '@wagmi/core/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector(), new MetaMaskConnector()],
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>,
)
