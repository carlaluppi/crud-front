import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListaCoches from "../Coches/ListaCoches";
import Swal from 'sweetalert2';

const url = 'http://localhost:8000/api';

function CreateCoche() {
  const [selectedPropietario, setSelectedPropietario] = useState(null);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [propietarios, setPropietarios] = useState([]);
  const [showPropietarios, setShowPropietarios] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [propSelect, setPropSelect] = useState(null);

  const navigate = useNavigate();

  const selectPropietario = (selectedPropietario) => {
    setSelectedPropietario(selectedPropietario);
    setShowPropietarios(false);
    setPropSelect(selectedPropietario.id);
  };

  const store = async (e) => {
    e.preventDefault();

    try {
      await axios.post(url + '/coche', {
        propietario_id: selectedPropietario.id,
        nombre_propietario: selectedPropietario.nombre,
        marca,
        modelo,
        matricula,
      });
  
      // Alerta coche creado
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
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={store} className="mb-4">
          <div className="relative mb-4 ">
            <div className="flex items-center ">
            <label className="mr-4"> Propietario  </label>
            
              <button 
                className=" border bg-gray-700  border-gray-300 py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
                onClick={() => setShowPropietarios(!showPropietarios)} 
              >
                {selectedPropietario ? `${selectedPropietario.nombre} ` : 'Seleccionar'} 
              </button>
              <div className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 ${showPropietarios ? 'transform rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  />
                </svg>
              </div>
            </div>
            {showPropietarios && (
              <ul className="absolute z-10 bg-gray-700 border border-gray-300 rounded shadow-lg w-full">
                {propietarios.map((propietario) => (
                  <li
                    key={propietario.id}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectPropietario(propietario)}
                  >
                    {propietario.nombre} {propietario.dni}
                  </li>
                ))}
              </ul>
            )}
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
                  onClick={() => {
                    if (!selectedPropietario) {

                      Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'Debes seleccionar un propietario antes de guardar.',
                      });
                    } else {
                      store();
                    }
                  }}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Guardar
                </button>
              </div>

                    </form>
                  </div>


      <ListaCoches propietarioId={propSelect} />


      
    </div>
  );
}

export default CreateCoche;
