import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PatientDetails() {
  const [paciente, setPaciente] = useState({
    Nombre: '',
    DNI: '',
    Direccion: '',
    CodigoPostal: '',
    Telefono: '',
    Genero: '',
    FechaNacimiento: '',
    Correo: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await axios.get(`http://localhost/Proyectos/proyectoGitHub/pacientes.php?id=${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.length > 0) {
          setPaciente(response.data[0]);
        } else {
          console.log('No se encontraron datos para este paciente');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del paciente:', error);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const pacienteData = {
      token: localStorage.getItem('token'),
      pacienteId: id,
      nombre: paciente.Nombre,
      dni: paciente.DNI,
      direccion: paciente.Direccion,
      codigoPostal: paciente.CodigoPostal,
      telefono: paciente.Telefono,
      genero: paciente.Genero,
      fechaNacimiento: paciente.FechaNacimiento,
      correo: paciente.Correo
    };

    try {
      const response = await axios.put(`http://localhost/Proyectos/proyectoGitHub/pacientes.php?id=${id}`, pacienteData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Datos modificados correctamente');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al modificar los detalles del paciente:', error);
      alert('Error al modificar los datos');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost/Proyectos/proyectoGitHub/pacientes.php?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          token: localStorage.getItem('token'),
          pacienteId: id
        }
      });
      alert('Paciente eliminado correctamente');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
      alert('Error al eliminar el paciente');
    }
  };

  return (
    <div>
      <h1>Editar Detalles del Paciente</h1>
      <input type="text" name="Nombre" value={paciente.Nombre} onChange={handleInputChange} />
      <input type="text" name="DNI" value={paciente.DNI} onChange={handleInputChange} />
      <input type="text" name="Direccion" value={paciente.Direccion} onChange={handleInputChange} />
      <input type="text" name="CodigoPostal" value={paciente.CodigoPostal} onChange={handleInputChange} />
      <input type="text" name="Telefono" value={paciente.Telefono} onChange={handleInputChange} />
      <input type="text" name="Genero" value={paciente.Genero} onChange={handleInputChange} />
      <input type="date" name="FechaNacimiento" value={paciente.FechaNacimiento} onChange={handleInputChange} />
      <input type="email" name="Correo" value={paciente.Correo} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Modificar</button>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar Paciente</button>
    </div>
  );
}

export default PatientDetails;