import {
  BrowserRouter,
  Route,
  Routes as Routess
} from 'react-router-dom';
import Public from '../src/layouts/Public';
import Escola from '../src/layouts/Escola';
import Login from '../src/pages/public/Login';

export default function Routes() {
  return (
    <BrowserRouter>
      <Routess>
        // Para todo publico
        <Route element={ <Public /> }>
          <Route path='/' element={ <Login /> } />
        </Route>

        // Somente a escola
        <Route element={ <Escola /> }>
        
        </Route>
      </Routess>
    </BrowserRouter>
  );
}