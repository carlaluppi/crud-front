import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const url = 'http://localhost:8000/api';

function ShowCoches() {
    const [coches, setCoches] = useState([]);

    useEffect(() => {
        getAllCoches();
    }, []);

    const getAllCoches = async () => {
        const response = await axios.get(`${url}/coches`);
        setCoches(response.data);
    };

    const deleteCoche = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
        });

        if (result.isConfirmed) {
            await axios.delete(`${url}/coche/${id}`);
            getAllCoches();
            Swal.fire('Eliminado', 'El coche ha sido eliminado', 'success');
        }
    };

    const confirmEdit = (id) => {
        Swal.fire({
            title: '¿Quieres editar este coche?',
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/edit/${id}`;
            }
        });
    };

    const getRowColorClass = (index) => {
        return index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700';
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-screen-md"><h3 className="text-2xl font-bold mb-4"> Coches</h3>
                <table className="w-full text-left border-collapse bg-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Propietario</th>
                            <th className="px-4 py-2">Marca</th>
                            <th className="px-4 py-2">Modelo</th>
                            <th className="px-4 py-2">Matrícula</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coches.map((coche, index) => (
                            <tr key={coche.id} className={getRowColorClass(index)}>
                                <td className="px-4 py-2">{coche.propietario_id}</td>
                                <td className="px-4 py-2">{coche.nombre_propietario}</td>
                                <td className="px-4 py-2">{coche.marca}</td>
                                <td className="px-4 py-2">{coche.modelo}</td>
                                <td className="px-4 py-2">{coche.matricula}</td>
                                <td className="px-4 py-2 flex items-center space-x-2">
                            <button
                                onClick={() => confirmEdit(coche.id)}
                                className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-2 rounded transition duration-300"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deleteCoche(coche.id)}
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
                    <Link
                        to="/createcoche"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-block transition duration-300"
                    >
                        Añadir Coche
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ShowCoches;
