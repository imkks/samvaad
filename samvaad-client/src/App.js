import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import WebChat from './pages/WebChat';
import { Login } from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './contexts/AuthContext';
import { RequiredAuth } from './components/Auth/RequiredAuth';
import Logout from './pages/Logout';
import { MessageProvider } from './contexts/MessageContext';
import { SocketProvider } from './contexts/SocketContext';
import AuthVerify from './components/Auth/AuthVerify';
import { ContactsProvider } from './contexts/ContactContext';
function App() {
  return (
    <div className="app" style={{minHeight:'100vh'}}>
      <AuthProvider>
      <BrowserRouter>
      <NavBar></NavBar>
      <SocketProvider>

      <MessageProvider>
      <ContactsProvider>
      <div className="container-fluid">
        <Routes>
        <Route exact path="/" element={<RequiredAuth><WebChat/></RequiredAuth>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>

      </Routes>
      </div>
      <AuthVerify></AuthVerify>
      </ContactsProvider>
      </MessageProvider>
      </SocketProvider>
      </BrowserRouter>

      </AuthProvider>
    </div>
  );
}

export default App;
