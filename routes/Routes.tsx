import {
  BrowserRouter,
  Route,
  Routes as Routess
} from 'react-router-dom';
import Public from '../src/layouts/Public';
import Escola from '../src/layouts/Escola';
import Login from '../src/pages/public/Login';
import Dashboard from '../src/pages/escola/Dashboard';
import PrivateRoute from '../components/auth/PrivateRoute';

export default function Routes() {
  return (
    <BrowserRouter>
      <Routess>
        // Para todo publico
        <Route element={ <PrivateRoute requiredRole='escola' /> }>
          <Route element={ <Public /> }>
            <Route path='/' element={ <Login /> } />
          </Route>
        </Route>

        // Somente a escola
        <Route
          path='/escola'
          element={ <PrivateRoute requiredRole='escola' /> }
        >
          <Route path='/escola' element={ <Escola /> }>
            <Route path='/escola/dashboard' element={ <Dashboard /> } />
          </Route>
        </Route>
      </Routess>
    </BrowserRouter>
  );
}