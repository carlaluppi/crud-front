import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListaCoches from "../Coches/ListaCoches";
import Swal from 'sweetalert2';

const url = 'http://localhost:8000/api';

function CreatePropietario() {
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [propietarios, setPropietarios] = useState([]);
    const [showPropietarios, setShowPropietarios] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [propSelect, setPropSelect] = useState(null);

    const navigate = useNavigate();

    const selectPropietario = (selectedPropietario) => {
        setShowPropietarios(false);
        setPropSelect(selectedPropietario.id);
    };

    const store = async (e) => {
        e.preventDefault();

        if (!nombre || !dni) {

        Swal.fire({
            icon: 'warning',
            title: 'Campos Obligatorios',
            text: 'Por favor, completa todos los campos antes de guardar.',
        });
        return;
        }

        try {
        await axios.post(url + '/propietario', {
            nombre,
            dni,
        });

        // alert propietario creado
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El propietario ha sido creado exitosamente',
            showConfirmButton: false,
            timer: 2500,
        });

        await getPropietarios();
        navigate('/propietarios');
        
        setNombre('');
        setDni('');
        } catch (error) {
        console.error('Error al crear el propietario:', error);

        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        }
    };

    const getPropietarios = async () => {
        try {
        const response = await axios.get(url + '/propietarios');
        setPropietarios(response.data);
        } catch (error) {
        console.error('Error fetching propietarios:', error);
        }
    };

    useEffect(() => {
        getPropietarios();
    }, []);

    return (
        <div className="grid md:grid-cols-2 flex items-center justify-center ">
        <div className="max-w-md mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Crear Propietario</h3>
            {successMessage && (
            <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
                {successMessage}
            </div>
            )}
            <form onSubmit={store} className="mb-4">
            <div className="mb-3">
                <label className="form-label">Nombre del Propietario</label>
                <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">DNI del Propietario</label>
                <input
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                type="text"
                className="border border-gray-300 bg-transparent rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                required
                />
            </div>

            <div className="flex justify-center">
                <button
                type="submit"
                onClick={() => store()}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                Guardar
                </button>
            </div>
            </form>
        </div>

        
        </div>
    );
    }

export default CreatePropietario;
