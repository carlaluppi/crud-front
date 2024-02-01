import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListaCoches from '../Coches/ListaCoches';
import Swal from 'sweetalert2';

const url = 'http://localhost:8000/api';

function CreateCoche() {
  const [selectedPropietario, setSelectedPropietario] = useState(null);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [propietarios, setPropietarios] = useState([]);
  const [showPropietarios, setShowPropietarios] = useState(false);

  const navigate = useNavigate();

  const getCochesPorPropietario = async () => {
    try {
      if (selectedPropietario) {
        const response = await axios.get(`${url}/coches/propietario/${selectedPropietario.id}`);
        // Actualiza el estado o haz lo que sea necesario con la lista de coches
      }
    } catch (error) {
      console.error('Error fetching coches por propietario:', error);
    }
  };

  const selectPropietario = (selectedPropietario) => {
    setSelectedPropietario(selectedPropietario);
    setShowPropietarios(false);
    getCochesPorPropietario();
  };

  const store = async (e) => {
    e.preventDefault();

    const matriculaRegex = /^[0-9]{4}[A-Za-z]{3}$/;
    if (!matriculaRegex.test(matricula)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El formato de la matrícula es inválido. Debe tener cuatro dígitos seguidos de tres letras.',
      });
      return;
    }

    try {
      await axios.post(url + '/coche', {
        propietario_id: selectedPropietario.id,
        nombre_propietario: selectedPropietario.nombre,
        marca,
        modelo,
        matricula,
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El coche ha sido creado exitosamente',
        showConfirmButton: false,
        timer: 2500,
      });

      setTimeout(() => {
        navigate('/coches');
      }, 2500);
    } catch (error) {
      console.error('Error al crear el coche:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const getPropietarios = async () => {
    try {
      const response = await axios.get(url + '/propietarios');
      setPropietarios(response.data);
    } catch (error) {
      console.error('Error fetching propietarios:', error);
    }
  };

  useEffect(() => {
    getPropietarios();
  }, []);

  return (
    <div className="grid md:grid-cols-2 flex items-center justify-center ">
      <div className="max-w-md mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4">Crear Coche</h3>
        <form onSubmit={store} className="mb-4">
          <div className="relative mb-4 ">
            <div className="flex items-center ">
              <label className="mr-4"> Propietario </label>
              
              <select
                className="border bg-gray-700 border-gray-700 py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedProp = propietarios.find((prop) => prop.id === parseInt(selectedId, 10));
                  selectPropietario(selectedProp);
                }}
                value={selectedPropietario ? selectedPropietario.id : ''}
              >
                <option value="" disabled hidden>
                  Seleccionar
                </option>
                {propietarios.map((propietario) => (
                  <option key={propietario.id} value={propietario.id}>
                    {propietario.nombre}
                  </option>
                ))}
              </select>
              <div className="ml-1"></div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label "> Marca</label>
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              type="text"
              className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Modelo</label>
            <input
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              type="text"
              className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Matrícula</label>
            <input
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              type="text"
              className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      <ListaCoches propietarioId={selectedPropietario ? selectedPropietario.id : null} />
    </div>
  );
}

export default CreateCoche;
