import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const url ='http://localhost:8000/api/'

function CreateCoche() {
    const [propietario_id, setPropietario_id] = useState()
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [matricula, setMatricula] = useState('')
    const [propietarios, setPropietarios] =useState([])

    const navigate = useNavigate()

    

    const store = async (e)=> {
        e.preventDefault()
        await axios.post(url+'coche', {propietario_id:propietario_id,marca:marca, modelo:modelo, matricula:matricula})
        navigate('/')
    }

    const getPropietario = async ()=> {
        const data = await axios.get(url+'propietarios')
        setPropietarios(data.data)
        console.log(data.data)
    }
        
useEffect(() => {
        getPropietario()
    }, [])
    
    return (
    <div>
        <h3>Create coche</h3>
        <form onSubmit={store}>

{/*        
          
            {/* <ul>
                {propietarios.map(propietario=>{
                    return <li key={propietario.id}> 
                        {propietario.nombre}
                        {propietario.dni}
                    </li>
                })}
            </ul> */}
            
            <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Propietarios
        </button>
  <ul className="dropdown-menu">
  {propietarios.map(propietario=>{
                    return <li key={propietario.id}> 
                        {propietario.nombre}
                        {propietario.dni}
                    </li>
                })}
  
  </ul>


</div>
            <div className='mb-3'>
                <label className='form-label'> Marca</label>
                <input
                    value={marca}
                    onChange={(e)=> setMarca(e.target.value)}
                    type="text"
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'> Modelo</label>
                <input
                    value={modelo}
                    onChange={(e)=> setModelo(e.target.value)}
                    type="text"
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'> Matrícula</label>
                <input
                    value={matricula}
                    onChange={(e)=> setMatricula(e.target.value)}
                    type="text"
                    className='form-control'
                />
            </div>
            <button type='submit' className='btn btn-primary'> Store</button>
        </form>
    </div>
  )
}

export default CreateCoche