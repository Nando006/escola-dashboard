import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/tailwind.css';
import './style/loaderLogin.css';
import Routes from './routes/Routes';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { nhost } from './server/nhost/nhost';
import { NhostProvider } from '@nhost/react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NhostProvider nhost={ nhost }>
      <NhostApolloProvider nhost={ nhost }>
        <Routes />
      </NhostApolloProvider>
    </NhostProvider>
  </StrictMode>
);
