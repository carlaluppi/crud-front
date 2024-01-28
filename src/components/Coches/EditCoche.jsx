import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
        try {
          console.log("Datos a enviar:", { propietario_id, marca, modelo, matricula });
          await axios.put(`${url}${id}`, {
            propietario_id: propietario_id,
            marca: marca,
            modelo: modelo,
            matricula: matricula
          });
          console.log("Actualización exitosa");
          navigate('/');
        } catch (error) {
          console.error("Error al realizar la actualización:", error);
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
    <div>
        <h3>Edit</h3>
        <form onSubmit={update}>

        <div className="mb-3">
        <label className="form-label"> Propietario </label>
            <input value={propietario_id} onChange={(e) => setPropietario_id(e.target.value)} type="text" className="form-control" />
        <label className="form-label"> Marca </label>
            <input value={marca} onChange={(e) => setMarca(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label"> Modelo </label>
            <input value={modelo} onChange={(e) => setModelo(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label"> Matricula</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)} type="text" className="form-control" />
        </div>

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCoche;