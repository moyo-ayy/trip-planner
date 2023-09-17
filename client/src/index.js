import React from 'react';
import { useNavigation } from 'react-router-dom';
import ReactDOM from 'react-dom/client'; // Corrected this import
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// You might not need this import if you're using process.env directly
import env from "react-dotenv"

// Roboto font imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/preferences`,
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
