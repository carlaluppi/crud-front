import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const url = 'http://localhost:8000/api/coche/';

const EditCoche = () => {
    const [propietario_id, setPropietario_id] = useState();
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [matricula, setMatricula] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!propietario_id || !marca || !modelo || !matricula) {
            // mensaje de error campo
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
            });
            return;
        }

        try {
            console.log("Datos a enviar:", { propietario_id, marca, modelo, matricula });
            await axios.put(`${url}${id}`, {
                propietario_id,
                marca,
                modelo,
                matricula
            });
            console.log("Actualización exitosa");

            // mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Coche actualizado correctamente',
            });

            navigate('/');
        } catch (error) {
            console.error("Error al realizar la actualización:", error);

            //  mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar el coche',
            });
        }
    };

    useEffect(() => {
        const getCocheById = async () => {
            const response = await axios.get(`${url}${id}`);
            setPropietario_id(response.data.propietario_id);
            setMarca(response.data.marca);
            setModelo(response.data.modelo);
            setMatricula(response.data.matricula);
        };
        getCocheById();
    }, []);

    return (
        <div className="max-w-md mx-auto p-4">
  <h3 className="text-2xl font-bold mb-4">Editar Coche</h3>

  <form onSubmit={update} className="mb-4">
    <div className="mb-3">
      <label className="form-label">Propietario</label>
      <input
        value={propietario_id}
        onChange={(e) => setPropietario_id(e.target.value)}
        type="text"
        className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Marca</label>
      <input
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        type="text"
        className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Modelo</label>
      <input
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        type="text"
        className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Matrícula</label>
      <input
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
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

export default EditCoche;