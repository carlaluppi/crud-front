    import axios from 'axios';
    import { useState, useEffect } from 'react';

    const url = 'http://localhost:8000/api';

    const ListaCoches = ({ propietarioId }) => {
    const [coches, setCoches] = useState([]);

    useEffect(() => {
        getAllCoches();
    }, [propietarioId]);

    const getAllCoches = async () => {
        const response = await axios.get(`${url}/propietariocoches/${propietarioId}`);
        setCoches(response.data);
        console.log(response);
    };

    

    return (
        <div>
        <div className="col-4 flex items-center justify-center">
            <ul className="">
                {coches.map((coche, index) => (
                <li key={coche.id} className="p-3" >
                    <p>
                    <strong>Marca:</strong> {coche.marca}
                    </p>
                    <p>
                    <strong>Modelo:</strong> {coche.modelo}
                    </p>
                    <p>
                    <strong>Matrícula:</strong> {coche.matricula}
                    </p>
                </li>
                ))}
            </ul>
            </div>
        </div>
        
    );
    };

    export default ListaCoches;
