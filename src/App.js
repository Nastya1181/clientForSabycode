import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import EditPage from './components/EditPage'
import GuestForm from './components/GuestForm';
import Layout from './components/Layout';
import Log from "./components/Log";


function App() {
  return (
    <Router>
    <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to={`f${ (+new Date()).toString(16)}`}/>}/>
        <Route  path=':id' element={<EditPage />}/>
        <Route  path='/authentication' element={<AuthPage />}/>
        <Route path='/guestAuthorization' element={<GuestForm />}></Route>
        <Route path='/log' element={<Log />}></Route>
        </Route>
    </Routes>
</Router>
  );
}

export default App;
