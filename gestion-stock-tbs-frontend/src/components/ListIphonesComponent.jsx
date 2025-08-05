import React, { useEffect, useState } from 'react'
import IphoneService from '../services/IphoneService';
import { Link } from 'react-router-dom';

export const ListIphonesComponent = () => {

    const [iphones, setIphones] = useState([]);

    useEffect(() => {
      listarIphones()
    }, [])

    const deleteIphone = (iphoneId) => {
        IphoneService.deleteIphone(iphoneId).then((responde) => {
            listarIphones();
        }).catch(error => {
            console.log(error);
        })
    }

    const listarIphones = () => {
        IphoneService.getAllIphones().then(response => {
            setIphones(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Iphones</h2>
            <Link to='/add-iphone' className='btn btn-primary mb-2'>Agregar Iphone</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>MODELO</th>
                    <th>COLOR</th>
                    <th>GB</th>
                    <th>%BATERIA</th>
                    <th>PRECIO</th>
                    <th>IMEI</th>
                    <th>DETALLES</th>
                    <th>ESTADO</th>
                    <th>ACCIONES</th>
                </thead>
                <tbody>
                    {
                        iphones.map(
                            iphone =>
                                <tr key={iphone.id}>
                                    <td>{iphone.modelo}</td>
                                    <td>{iphone.color}</td>
                                    <td>{iphone.capacidad}</td>
                                    <td>{iphone.bateria}</td>
                                    <td>{iphone.precio}</td>
                                    <td>{iphone.imei}</td>
                                    <td>{iphone.detalles}</td>
                                    <td>{iphone.estado}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-iphone/${(iphone.id)}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteIphone(iphone.id)}>Borrar</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ListIphonesComponent;