import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const url = 'http://localhost:8000/api'

const ListaCoches = ({propietarioId}) => {

    const [coches, setCoches] = useState([]);
    

    useEffect(()=>{
        getAllCoches()
    }, [propietarioId])


    const getAllCoches = async () => {
        const response = await axios.get(`${url}/propietariocoches/${propietarioId}`);
        setCoches(response.data);
        console.log(response)
    }

    const getRowColorClass = (index) => {
        return index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700';
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen col-6 ">
            <div className="w-full max-w-screen-md">
            <div className="text-2xl font-bold mb-4"> Lista de coches </div>

                <table className="min-w-full divide-y divide-gray-200 mb-4">
                    <thead>
                    <tr className="bg-gray-800 ">
                        <th className="px-4 py-2">Marca</th>
                        <th className="px-4 py-2">Modelo</th>
                        <th className="px-4 py-2">Matrícula</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {coches.map((coche, index) => (
                        <tr key={coche.id} className={getRowColorClass(index)}>
                        <td className="px-4 py-2">{coche.marca}</td>
                        <td className="px-4 py-2">{coche.modelo}</td>
                        <td className="px-4 py-2">{coche.matricula}</td>

                        </tr>
                    ))}
                    
                    </tbody>
                </table>
        </div>
        </div>
        </div>
    )
}

export default ListaCoches