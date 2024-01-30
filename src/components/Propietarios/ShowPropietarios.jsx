import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ListaCoches from '../Coches/ListaCoches';

const url = 'http://localhost:8000/api';

function ShowPropietarios() {
    const [propietarios, setPropietarios] = useState([]);

    useEffect(() => {
        getAllPropietarios();
    }, []);

    const getAllPropietarios = async () => {
        const response = await axios.get(`${url}/propietarios`);
        setPropietarios(response.data);
    };

    const deletePropietario = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
        });

        if (result.isConfirmed) {
            await axios.delete(`${url}/propietario/${id}`);
            getAllPropietarios();
            Swal.fire('Eliminado', 'El propietario ha sido eliminado', 'success');
        }
    };

    const confirmEdit = (id) => {
        Swal.fire({
            title: '¿Quieres editar este propietario?',
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirige a la página de edición
                window.location.href = `/editprop/${id}`;
            }
        });
    };

    const getRowColorClass = (index) => {
        return index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700';
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-screen-md"> <h3 className="text-2xl font-bold mb-4"> Propietarios</h3>
                <table className="w-full text-left border-collapse bg-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">DNI</th>
                            <th className="px-4 py-2">Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {propietarios.map((propietario, index) => (
                            <tr key={propietario.id} className={getRowColorClass(index)}>
                                <td className="px-4 py-2">{propietario.nombre}</td>
                                <td className="px-4 py-2">{propietario.dni}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => confirmEdit(propietario.id)}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletePropietario(propietario.id)}
                                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded transition duration-300"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-center mt-4">
                    <button
                        onClick={() => window.location.href = "/createpropietario"}
                        className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded inline-block transition duration-300"
                    >
                        Añadir Propietario
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowPropietarios;
