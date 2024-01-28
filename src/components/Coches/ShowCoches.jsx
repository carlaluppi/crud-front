import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const url = 'http://localhost:8000/api'

function ShowCoches() {

    const [coches, setCoches] = useState([]);

    useEffect(()=>{
        getAllCoches()
    }, [])


    const getAllCoches = async () => {
        const response = await axios.get(`${url}/coches`);
        setCoches(response.data);
    }

    const deleteCoche = async (id) => {
        await axios.delete(`${url}/coche/${id}`);
        getAllCoches();
    }


    return (
        <div>
            <Link to="/create" className='btn btn-success btn-lg '> Create </Link>
            <table>
                <thead>
                    <tr>
                        <th>Propietario</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Matrícula</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coches.map( (coche) => (
                            <tr key={coches.id}>
                                <td>{coche.propietario_id}</td>
                                <td>{coche.marca}</td>
                                <td>{coche.modelo}</td>
                                <td>{coche.matricula}</td>
                                <td>
                                    <Link to={`/edit/${coche.id}`} className='btn btn-warning'>Editar</Link>
                                    <button onClick={() => deleteCoche(coche.id)} className="btn btn-danger">Eliminar</button>
                                </td>
    
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    }

export default ShowCoches