import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const url ='http://localhost:8000/api/coche'

function CreateCoche() {
    
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [matricula, setMatricula] = useState('')

    const navigate = useNavigate()

    const store = async (e)=> {
        e.preventDefault()
        await axios.post(url, {marca:marca, modelo:modelo, matricula:matricula})
        navigate('/')
    }
  return (
    <div>
        <h3>Create coche</h3>
        <form onSubmit={store}>
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