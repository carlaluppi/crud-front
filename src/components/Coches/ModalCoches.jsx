import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ListaCoches from './ListaCoches';

const MySwal = withReactContent(Swal);

const ModalCoches = ({ propietarioId, onClose }) => {
  useEffect(() => {
    const fetchData = async () => {
      
      MySwal.fire({
        html: <ListaCoches propietarioId={propietarioId} />,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'my-swal-container',
        },
      });
    };

    fetchData();
  }, [propietarioId]);

  return null; 
};

export default ModalCoches;
