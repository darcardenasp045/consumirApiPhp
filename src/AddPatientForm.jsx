import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPatientForm() {
  const [newPatient, setNewPatient] = useState({
    Nombre: '',
    DNI: '',
    Direccion: '',
    CodigoPostal: '',
    Telefono: '',
    Genero: '',
    FechaNacimiento: '',
    Correo: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      nombre: newPatient.Nombre,
      dni: newPatient.DNI,
      direccion: newPatient.Direccion,
      codigoPostal: newPatient.CodigoPostal,
      telefono: newPatient.Telefono,
      genero: newPatient.Genero,
      fechaNacimiento: newPatient.FechaNacimiento,
      correo: newPatient.Correo,
      token: localStorage.getItem('token')  // Asegúrate de enviar el token de autenticación
    };
  
    console.log(dataToSend);  // Imprime los datos que se enviarán para verificar
  
    try {
      const response = await axios.post('http://localhost/Proyectos/proyectoGitHub/pacientes.php', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);  // Imprime la respuesta del servidor
      alert('Paciente añadido correctamente');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al añadir el paciente:', error);
      alert('Error al añadir el paciente');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Añadir Nuevo Paciente</h1>
      {/* Campos del formulario */}
      <input type="text" name="Nombre" value={newPatient.Nombre} onChange={handleInputChange} placeholder="Nombre" />
      <input type="text" name="DNI" value={newPatient.DNI} onChange={handleInputChange} placeholder="DNI" />
      <input type="text" name="Direccion" value={newPatient.Direccion} onChange={handleInputChange} placeholder="Dirección" />
      <input type="text" name="CodigoPostal" value={newPatient.CodigoPostal} onChange={handleInputChange} placeholder="Código Postal" />
      <input type="text" name="Telefono" value={newPatient.Telefono} onChange={handleInputChange} placeholder="Teléfono" />
      <input type="text" name="Genero" value={newPatient.Genero} onChange={handleInputChange} placeholder="Género" />
      <input type="date" name="FechaNacimiento" value={newPatient.FechaNacimiento} onChange={handleInputChange} placeholder="Fecha de Nacimiento" />
      <input type="email" name="Correo" value={newPatient.Correo} onChange={handleInputChange} placeholder="Correo Electrónico" />
      <button type="submit">Añadir Paciente</button>
    </form>
  );
}

export default AddPatientForm;