
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:8000/api/';

function CreateCoche() {
  const [propietario_id, setPropietario_id] = useState();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [propietarios, setPropietarios] = useState([]);
  const [showPropietarios, setShowPropietarios] = useState(false);

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    await axios.post(url + 'coche', { propietario_id, marca, modelo, matricula });
    navigate('/');
  };

  const getPropietarios = async () => {
    try {
      const response = await axios.get(url + 'propietarios');
      setPropietarios(response.data);
    } catch (error) {
      console.error('Error fetching propietarios:', error);
    }
  };

  useEffect(() => {
    getPropietarios();
  }, []);

    return (
        <div className="max-w-md mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4">Create Coche</h3>
        <form onSubmit={store} className="mb-4">
        <div className="relative mb-4">
            <div className="flex items-center">
            <button
                className="bg-white border border-gray-300 py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
                onClick={() => setShowPropietarios(!showPropietarios)}
            >
                Propietarios
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
            <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg w-full">
                {propietarios.map((propietario) => (
                <li key={propietario.id} className="py-2 px-4 hover:bg-gray-100">
                    {propietario.nombre} {propietario.dni}
                </li>
                ))}
            </ul>
            )}
        </div>
            <div className='mb-3'>
                <label className='form-label'> Marca</label>
                <input
                value={marca}
                onChange={(e)=> setMarca(e.target.value)}
                type="text"
                className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'> Modelo</label>
                <input
                value={modelo}
                onChange={(e)=> setModelo(e.target.value)}
                type="text"
                className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'> Matrícula</label>
                <input
                value={matricula}
                onChange={(e)=> setMatricula(e.target.value)}
                type="text"
                className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline'
                />
            </div>
            
            <div className="flex justify-center">
                <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                Guardar
                </button>
            </div>
            </form>
        </div>
    )
}

export default CreateCoche