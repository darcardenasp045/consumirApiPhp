// src/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://proyectogithub-production.up.railway.app/auth.php', {
        usuario: username,
        password: password
      });
      // Verificar si la respuesta contiene un token
      if (response.data && response.data.result && response.data.result.token) {
        localStorage.setItem('token', response.data.result.token); // Almacenar token en localStorage
        navigate('/dashboard'); // Redirigir al usuario al dashboard
      } else {
        alert('Credenciales incorrectas'); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error('Error de autenticación', error);
      alert('Error de autenticación');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Login;