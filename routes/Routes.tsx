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
import LoginAdmin from '../src/pages/admin/LoginAdmin';
import CadastroEscola from '../src/pages/admin/auth/cadastro-escola/CadastroEscola';

export default function Routes() {
  return (
    <BrowserRouter>
      <Routess>
        // Para todo publico
        <Route 
          path='/' 
          element={ 
            <PrivateRoute 
              requiredRole='escola' 
              redirectFromLogin={ false } 
              redirectFromSchool={ true }
            /> 
          }
        >
          <Route path='/' element={ <Public /> }>
            <Route path='/login/auth' element={ <Login /> } />
          </Route>
        </Route>

        // Somente a escola
        <Route
          path='/escola'
          element={ 
            <PrivateRoute 
              requiredRole='escola' 
              redirectFromLogin={ true }
              redirectFromSchool={ false }
            /> 
          }
        >
          <Route path='/escola' element={ <Escola /> }>
            <Route path='/escola/dashboard' element={ <Dashboard /> } />
          </Route>
        </Route>

        // Admin Follow Up Login
        <Route 
          path='/admin'
          element={ 
            <PrivateRoute 
              requiredRole='admin-followup'
              redirectFromLoginAdmin={ false }
              redirectFromAdmin={ true }
            /> 
          }
        >
          <Route path='/admin/loginAdmin' element={ <LoginAdmin /> } />
        </Route>

        <Route
          path='/admin/auth'
          element={
            <PrivateRoute 
              requiredRole='admin-followup'
              redirectFromLoginAdmin={ true }
              redirectFromAdmin={ false }
            />
          }
        >
          <Route 
            path='/admin/auth/cadastroEscola' 
            element={ <CadastroEscola /> }
          />
        </Route>
      </Routess>
    </BrowserRouter>
  );
}