import React, { useEffect, useState } from 'react'
import IphoneService from '../services/IphoneService';
import { Link } from 'react-router-dom';

export const ListIphonesComponent = () => {

    const [iphones, setIphones] = useState([]);

    useEffect(() => {
        listarIphones()
    }, [])

    const deleteIphone = (iphoneId) => {
    // Usamos window.confirm() para pedir confirmación al usuario
    const confirmDelete = window.confirm("Seguro que quieres borrar este iPhone?");

    // Si el usuario hace clic en "Aceptar" (confirmDelete es true)
    if (confirmDelete) {
        IphoneService.deleteIphone(iphoneId).then((response) => {
            listarIphones();
            alert("El iPhone ha sido borrado exitosamente.");
        }).catch(error => {
            console.log(error);
            alert("Hubo un error al intentar borrar el iPhone.");
        });
    }
    // Si el usuario hace clic en "Cancelar", la función simplemente termina y no pasa nada.
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
                    <th>CONDICION</th>
                    <th>%BATERIA</th>
                    <th>PRECIO</th>
                    <th>IMEI</th>
                    <th>ESTADO</th>
                    <th>DETALLES</th>
                    <th>FECHA y HORA</th>
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
                                    <td>{iphone.condicion}</td>
                                    <td>{iphone.bateria}</td>
                                    <td>${iphone.precio} USD</td>
                                    <td>{iphone.imei}</td>
                                    <td>{iphone.estado}</td>
                                    <td>({iphone.detalles})</td>
                                    <td>{iphone.fecha} {iphone.hora}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-iphone/${(iphone.id)}`}>Editar</Link>
                                        <button style={{ marginLeft: "5px" }} className='btn btn-danger' onClick={() => deleteIphone(iphone.id)}>Borrar</button>
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