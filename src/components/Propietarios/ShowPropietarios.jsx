import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const url = 'http://localhost:8000/api'



function ShowPropietarios() {

    const [propietarios, setPropietarios] = useState([]);

    useEffect(() => {
        getAllPropietarios()
    }, []);

    const getAllPropietarios = async () => {
        const response = await axios.get(`${url}/propietarios`);
        setPropietarios(response.data);
    }

    const deleteCoche = async (id) => {
        await axios.delete(`${url}/propietario/${id}`);
        getAllPropietarios();
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-screen-md">
                <table className="min-w-full divide-y divide-gray-200 mb-4">
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">DNI</th>
                            <th className="px-4 py-2">Coche</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propietarios.map((propietario) => (
                            <tr key={propietario.id}>
                                <td className="px-4 py-2">{propietario.nombre}</td>
                                <td className="px-4 py-2">{propietario.dni}</td>
                                <td className="px-4 py-2">{propietario.coche}</td>

                                <td className="px-4 py-2">
                                    <Link
                                        to={`/editprop/${propietario.id}`}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-2 rounded mr-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => deleteCoche(propietario.id)}
                                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-center">
                    <Link
                        to="/createpropietario"
                        className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded inline-block"
                    >
                        Añadir Propietario
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShowPropietarios;
