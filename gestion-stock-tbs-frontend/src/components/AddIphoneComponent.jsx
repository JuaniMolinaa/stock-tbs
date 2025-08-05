import React, { useEffect, useState } from 'react'
import IphoneService from '../services/IphoneService';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const AddIphoneComponent = () => {
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [bateria, setBateria] = useState('');
    const [precio, setPrecio] = useState('');
    const [imei, setImei] = useState('');
    const [detalles, setDetalles] = useState('');
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    const saveOrUpdateIphone = (e) => {
        e.preventDefault();
        const iphone = { modelo, color, capacidad, bateria, precio, imei, detalles, estado };

        if (id) {
            IphoneService.updateIphone(id,iphone).then((response) => {
                console.log(response.data);
                navigate('/iphones');
            }).catch(error => {
                console.log(error);
            })
        }else{
             IphoneService.createIphone(id,iphone).then((response) => {
                console.log(response.data);
                navigate('/iphones');
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        IphoneService.getIphoneById(id).then((response) => {
            setModelo(response.data.modelo);
            setColor(response.data.color);
            setCapacidad(response.data.capacidad);
            setBateria(response.data.bateria);
            setPrecio(response.data.precio);
            setImei(response.data.imei);
            setDetalles(response.data.detalles);
            setEstado(response.data.estado);
        }).catch(error => {
            console.log(error);
        });
    },[])


    const title = () => {
        if (id) {
            return <h2 className='text-center'>Actualizar Equipo</h2>
        } else {
            return <h2 className='text-center'>Cargar Equipo</h2>
        }
    }


    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center'>
                            {
                                title()
                            }
                        </h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Modelo</label>
                                    <input
                                        type="text"
                                        placeholder='Ingrese el modelo'
                                        name='modelo'
                                        className='form-control'
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color</label>
                                    <input
                                        type="text"
                                        placeholder='Ingrese el color'
                                        name='color'
                                        className='form-control'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Capacidad</label>
                                    <input
                                        type="text"
                                        placeholder='Ingrese la capacidad'
                                        name='capacidad'
                                        className='form-control'
                                        value={capacidad}
                                        onChange={(e) => setCapacidad(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Bateria</label>
                                    <input
                                        type="text"
                                        placeholder='Ingrese el % de bateria'
                                        name='bateria'
                                        className='form-control'
                                        value={bateria}
                                        onChange={(e) => setBateria(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Precio</label>
                                    <input
                                        type="number"
                                        placeholder='Ingrese el precio en USD'
                                        name='precio'
                                        className='form-control'
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>IMEI</label>
                                    <input
                                        type="number"
                                        placeholder='Ingrese el IMEI'
                                        name='imei'
                                        className='form-control'
                                        value={imei}
                                        onChange={(e) => setImei(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Detalles</label>
                                    <input
                                        type="text"
                                        placeholder='Ingrese los detalles'
                                        name='detalles'
                                        className='form-control'
                                        value={detalles}
                                        onChange={(e) => setDetalles(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Estado</label>
                                    <input
                                        type="text"
                                        placeholder='Ingrese el Estado'
                                        name='estado'
                                        className='form-control'
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    />
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveOrUpdateIphone(e)}>GUARDAR</button>
                                &nbsp;
                                <Link to='/iphones' className='btn btn-danger'>CANCELAR</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddIphoneComponent;