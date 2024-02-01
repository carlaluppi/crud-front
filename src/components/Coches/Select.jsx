import axios from 'axios';
import { useState, useEffect } from 'react';
import { ListaCoches } from './ListaCoches'; 

const url = 'http://localhost:8000/api';

const Select= ({ propietarios }) => {
    const [selectedPropietario, setSelectedPropietario] = useState(null);
    const [showPropietarios, setShowPropietarios] = useState(false);
    const [cochesModalVisible, setCochesModalVisible] = useState(false);
    const [coches, setCoches] = useState([]);

    const selectPropietario = async (propietario) => {
        setSelectedPropietario(propietario);
        setShowPropietarios(false);

      
        const response = await axios.get(`${url}/propietariocoches/${propietario.id}`);
        setCoches(response.data);

       
        setCochesModalVisible(true);
    };

    const closeCochesModal = () => {
        setSelectedPropietario(null);
        setCochesModalVisible(false);
    };

    return (
        <div>
            <div className="flex">
                <select
                    className="border bg-gray-700 border-gray-700 py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
                    onChange={() => setShowPropietarios(!showPropietarios)}
                    value={selectedPropietario ? selectedPropietario.id : ''}
                >
                    <option value="" disabled hidden>
                        Seleccionar
                    </option>
                    {propietarios.map((propietario) => (
                        <option key={propietario.id} value={propietario.id}>
                            {propietario.nombre}
                        </option>
                    ))}
                </select>

                <div className="ml-1"></div>
            </div>

            {showPropietarios && (
                <ul className="absolute z-10 bg-gray-700 border border-gray-300 rounded shadow-lg w-full">
                    {propietarios.map((propietario) => (
                        <li
                            key={propietario.id}
                            className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                            style={{ backgroundColor: '' }}
                            onClick={() => selectPropietario(propietario)}
                        >
                            {propietario.nombre}
                        </li>
                    ))}
                </ul>
            )}

      
            {cochesModalVisible && selectedPropietario && (
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="w-full max-w-screen-md bg-white p-8">
                      
                            <button onClick={closeCochesModal}>Cerrar</button>

                            <ListaCoches coches={coches} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select;