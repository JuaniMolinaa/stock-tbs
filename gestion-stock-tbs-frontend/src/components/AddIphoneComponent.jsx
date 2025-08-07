import React, { useEffect, useState } from 'react'
import IphoneService from '../services/IphoneService';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const AddIphoneComponent = () => {
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [condicion, setCondicion] = useState('');
    const [bateria, setBateria] = useState('');
    const [precio, setPrecio] = useState('');
    const [imei, setImei] = useState('');
    const [detalles, setDetalles] = useState('');
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    const saveOrUpdateIphone = (e) => {
        e.preventDefault();
        const iphone = { id, modelo, color, capacidad, condicion, bateria, precio, imei, detalles, estado };

        if (id) {
            IphoneService.updateIphone(id, iphone).then((response) => {
                console.log(response.data);
                navigate('/iphones');
            }).catch(error => {
                console.log(error);
            })
        } else {
            IphoneService.createIphone(iphone).then((response) => {
                console.log(response.data);
                navigate('/iphones');
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            IphoneService.getIphoneById(id).then((response) => {
                setModelo(response.data.modelo);
                setColor(response.data.color);
                setCapacidad(response.data.capacidad);
                setCondicion(response.data.condicion);
                setBateria(response.data.bateria);
                setPrecio(response.data.precio);
                setImei(response.data.imei);
                setDetalles(response.data.detalles);
                setEstado(response.data.estado);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id])


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
                                {/* Campo de Modelo */}
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Modelo</label>
                                    <select
                                        className='form-control'
                                        name='modelo'
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                    >
                                        <option value="">Seleccione un modelo</option>
                                        <option value="XS">IPHONE XS</option>
                                        <option value="XR">IPHONE XR</option>
                                        <option value="XS MAX">IPHONE XS MAX</option>
                                        <option value="11">IPHONE 11</option>
                                        <option value="11 PRO">IPHONE 11 PRO</option>
                                        <option value="11 PRO MAX">IPHONE 11 PRO MAX</option>
                                        <option value="12 MINI">IPHONE 12 MINI</option>
                                        <option value="12">IPHONE 12</option>
                                        <option value="12 PRO">IPHONE 12 PRO</option>
                                        <option value="12 PRO MAX">IPHONE 12 PRO MAX</option>
                                        <option value="13 MINI">IPHONE 13 MINI</option>
                                        <option value="13">IPHONE 13</option>
                                        <option value="13 PRO">IPHONE 13 PRO</option>
                                        <option value="13 PRO MAX">IPHONE 13 PRO MAX</option>
                                        <option value="14">IPHONE 14</option>
                                        <option value="14 PLUS">IPHONE 14 PLUS</option>
                                        <option value="14 PRO">IPHONE 14 PRO</option>
                                        <option value="14 PRO MAX">IPHONE 14 PRO MAX</option>
                                        <option value="15">IPHONE 15</option>
                                        <option value="15 PLUS">IPHONE 15 PLUS</option>
                                        <option value="15 PRO">IPHONE 15 PRO</option>
                                        <option value="15 PRO MAX">IPHONE 15 PRO MAX</option>
                                        <option value="16">IPHONE 16</option>
                                        <option value="16 PLUS">IPHONE 16 PLUS</option>
                                        <option value="16 PRO">IPHONE 16 PRO</option>
                                        <option value="16 PRO MAX">IPHONE 16 PRO MAX</option>
                                    </select>
                                </div>

                                {/* Campo de Color */}
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color</label>
                                    <select
                                        className='form-control'
                                        name='color'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    >
                                        <option value="">Seleccione un color</option>
                                        <option value="NEGRO">⚫️ NEGRO</option>
                                        <option value="BLANCO">⚪ BLANCO</option>
                                        <option value="MORADO">🟣 MORADO</option>
                                        <option value="AMARILLO">🟡 AMARILLO</option>
                                        <option value="AZUL">🔵 AZUL</option>
                                        <option value="VERDE">🟢 VERDE</option>
                                        <option value="ROSADO">💗 ROSADO</option>
                                        <option value="DORADO">🌞 DORADO</option>
                                        <option value="NATURAL">🥈 NATURAL</option>
                                        <option value="DESERT">🟠 DESERT</option>
                                    </select>
                                </div>

                                {/* Campo de Capacidad */}
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Capacidad</label>
                                    <select
                                        className='form-control'
                                        name='capacidad'
                                        value={capacidad}
                                        onChange={(e) => setCapacidad(e.target.value)}
                                    >
                                        <option value="">Seleccione una capacidad</option>
                                        <option value="64GB">64GB</option>
                                        <option value="128GB">128GB</option>
                                        <option value="256GB">256GB</option>
                                        <option value="512GB">512GB</option>
                                        <option value="1TB">1TB</option>
                                        <option value="2TB">2TB</option>
                                    </select>
                                </div>
                                {/* Campo de Condición */}
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Condicion</label>
                                    <select
                                        className='form-control'
                                        name='condicion'
                                        value={condicion}
                                        onChange={(e) => {
                                            const nuevaCondicion = e.target.value;
                                            setCondicion(nuevaCondicion);
                                            if (nuevaCondicion === 'SELLADO') {
                                                setBateria('100'); // Establece la batería en 100 si la condición es "SELLADO"
                                            } else {
                                                setBateria(''); // Resetea la batería si la condición no es "SELLADO"
                                            }
                                        }}
                                    >
                                        <option value="">Seleccione la condición</option>
                                        <option value="SELLADO">SELLADO</option>
                                        <option value="USADO">USADO</option>
                                    </select>
                                </div>

                                {/* Renderizado condicional del campo de Batería */}
                                {condicion === 'USADO' && (
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
                                )}

                                {/* Campo de Precio (se mantiene como input de texto) */}
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

                                {/* Campo de IMEI (se mantiene como input de texto) */}
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

                                {/* Campo de Detalles (se mantiene como input de texto) */}
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

                                {/* Campo de Estado */}
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Estado</label>
                                    <select
                                        className='form-control'
                                        name='estado'
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="DISPONIBLE">DISPONIBLE</option>
                                        <option value="RESERVADO">RESERVADO</option>
                                        <option value="ST">ST</option>
                                        <option value="VENDIDO">VENDIDO</option>
                                    </select>
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