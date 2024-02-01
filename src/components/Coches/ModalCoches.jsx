import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ListaCoches from './ListaCoches';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const ModalCoches = ({ propietarioId, onClose }) => {
  const [coches, setCoches] = useState([]);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cochesData = await fetchCoches(propietarioId);

        if (cochesData.length === 0 && !alertShown) {
          setAlertShown(true);
          // Si la lista de coches está vacía y la alerta aún no se ha mostrado, muestra la alerta
          MySwal.fire({
            title: 'Alerta',
            text: 'La lista de coches está vacía.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        } else if (cochesData.length > 0) {
          // Si la lista de coches no está vacía, muestra el modal con la lista
          MySwal.fire({
            html: <ListaCoches propietarioId={propietarioId} />,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
              container: 'my-swal-container',
            },
          });
        }
      } catch (error) {
        console.error('Error al obtener la lista de coches:', error.message);
      }
    };

    fetchData();
  }, [propietarioId, alertShown]);

  const fetchCoches = async (propietarioId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/propietariocoches/${propietarioId}`);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      throw error; // Propaga el error para que pueda ser capturado en fetchData
    }
  };

  return null;
};

export default ModalCoches;
