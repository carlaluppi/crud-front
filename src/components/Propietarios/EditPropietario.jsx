import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const urlPropietario = 'http://localhost:8000/api/propietario/';
const urlCoches = 'http://localhost:8000/api/coches/';

const EditPropietario = () => {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [cocheId, setCocheId] = useState('');
  const [coches, setCoches] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCoches = async () => {
    try {
      const response = await axios.get(urlCoches);
      setCoches(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de coches:', error);
    }
  };

  const update = async (e) => {
    e.preventDefault();

    if (!nombre || !dni) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Nombre y DNI son campos obligatorios',
      });
      return;
    }

    try {
      await axios.put(`${urlPropietario}${id}`, {
        nombre,
        dni,
        coche: {
          id: cocheId,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Propietario actualizado correctamente',
      });

      navigate('/propietarios'); 

    } catch (error) {
      console.error('Error al realizar la actualización:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el propietario',
      });
    }
  };

  useEffect(() => {
    const getPropietarioById = async () => {
      try {
        const response = await axios.get(`${urlPropietario}${id}`);
        console.log("Respuesta de la API para obtener propietario:", response.data);
        setNombre(response.data.nombre);
        setDni(response.data.dni);
        setCocheId(response.data.coche.id);
      } catch (error) {
        console.error("Error al obtener propietario por ID:", error);
      }
    };
    getPropietarioById();
    fetchCoches(); // Llamar a la función para obtener la lista de coches
  }, [id]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Editar Propietario</h3>

      <form onSubmit={update} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            type="text"
            className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropietario;
