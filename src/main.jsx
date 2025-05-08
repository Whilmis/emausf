import React from 'react';
import ReactDOM from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { UniApp } from './UniApp';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <PayPalScriptProvider options={{ "client-id": "AaAHhqgF-T31h0cVyE8TxHLrB-KTHkoIGJWAuimANELKVqfDNRd3r2qCtFzl88FFKTTRGD9XhcGXFDrF" }}>
    <UniApp />
    </PayPalScriptProvider>
  // </React.StrictMode>
)
