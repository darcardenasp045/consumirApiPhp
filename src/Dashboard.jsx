// src/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  const handleAddPatient = () => {
    navigate('/add-patient');  // Asegúrate de que esta ruta esté definida en tu enrutador
  };


  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('https://proyectogithub-production.up.railway.app/pacientes.php?page=1', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);  // Verificar la estructura de los datos recibidos
        setPacientes(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleAddPatient}>Añadir Nuevo Paciente</button>
      
      {pacientes.length > 0 ? (
        pacientes.map(paciente => (
          <div key={paciente.PacienteId}>
            <p>Nombre: {paciente.Nombre || 'No especificado'}</p>
            <p>DNI: {paciente.DNI}</p>
            <p>Teléfono: {paciente.Telefono || 'No especificado'}</p>
            <p>Correo: {paciente.Correo || 'No especificado'}</p>
            <Link to={`/patient/${paciente.PacienteId}`}>Ver detalles</Link>
          </div>
        ))
      ) : (
        <p>No hay pacientes para mostrar.</p>
      )}
    </div>
  );
}

export default Dashboard;