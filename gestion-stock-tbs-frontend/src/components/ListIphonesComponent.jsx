import React, { useEffect, useState, useRef } from 'react'
import IphoneService from '../services/IphoneService';
import { Link } from 'react-router-dom';

export const ListIphonesComponent = () => {

    const [iphones, setIphones] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState(''); // Estado para el filtro de estado
    const [filtroCondicion, setFiltroCondicion] = useState(''); // Estado para el filtro de condición
    const [searchTerm, setSearchTerm] = useState('');//Filtro por busqueda
    const [sortDirection, setSortDirection] = useState('asc');//Ordenamiento de modelos: 'asc' o 'desc'

    // Define el estado inicial de visibilidad de las columnas
    const initialColumnVisibility = {
        modelo: true,
        color: true,
        capacidad: true,
        condicion: true,
        bateria: true,
        precio: true,
        imei: true,
        estado: true,
        detalles: true,
        fecha: true,
        acciones: true
    };

    const [visibleColumns, setVisibleColumns] = useState(initialColumnVisibility);

    // Configuracion de columnas para cada vista
    const vistaVentaColumns = {
        modelo: true,
        color: true,
        capacidad: true,
        condicion: true,
        bateria: true,
        precio: true,
        imei: false,
        estado: false,
        detalles: false,
        fecha: false,
        acciones: true
    };

    // Referencia para el input del buscador
    const searchInputRef = useRef(null);

    useEffect(() => {
        // Llamamos a la función de listar con los filtros por defecto
        listarIphones();
    }, [filtroEstado, filtroCondicion, searchTerm]); // Ejecuta cada vez que cambia un filtro

    useEffect(() => {
        // Ordena la lista de iPhones cada vez que cambia de ordenamiento o la lista original
        const sortedIphones = [...iphones].sort(sortIphoneModels);
        setIphones(sortedIphones);
    }, [sortDirection]);


    // Alternar la visibilidad de una columna
    const toggleColumnVisibility = (columnName) => {
        setVisibleColumns(prevState => ({
            ...prevState,
            [columnName]: !prevState[columnName]
        }));
    };

    // Restablecer todas las columnas
    const resetColumnVisibility = () => {
        setVisibleColumns(initialColumnVisibility);
    };

    // Cambiar de vista
    const setColumnView = (viewType) => {
        if (viewType === 'admin') {
            setVisibleColumns(initialColumnVisibility);
            setFiltroEstado(''); // Establecer a "Todos los Estados"
        } else if (viewType === 'venta') {
            setVisibleColumns(vistaVentaColumns);
            setFiltroEstado('DISPONIBLE'); // Establecer a "DISPONIBLE"
        }
    };

    // Limpiar el campo de búsqueda
    const clearSearch = () => {
        setSearchTerm('');
        //Mantiene el foco en el input después de limpiar el valor
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };


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
        IphoneService.getAllIphones(filtroEstado, filtroCondicion, searchTerm)
            .then(response => {
                const sortedIphones = [...response.data].sort(sortIphoneModels);
                setIphones(sortedIphones);
            }).catch(error => {
                console.log(error);
            });
    }

    const sortIphoneModels = (a, b) => {
        const modelA = a.modelo.toLowerCase();
        const modelB = b.modelo.toLowerCase();

        const numberA = parseInt(modelA.match(/\d+/));
        const numberB = parseInt(modelB.match(/\d+/));

        // 1. Comparar por número de modelo
        if (numberA !== numberB) {
            return sortDirection === 'asc' ? numberA - numberB : numberB - numberA;
        }

        const proA = modelA.includes('pro');
        const proMaxA = modelA.includes('pro max');
        const proB = modelB.includes('pro');
        const proMaxB = modelB.includes('pro max');

        // 2. Comparar por tipo de modelo (Pro Max, Pro, etc.)
        if (proMaxA !== proMaxB) {
            return sortDirection === 'asc' ? (proMaxA ? 1 : -1) : (proMaxA ? -1 : 1);
        }
        if (proA !== proB) {
            return sortDirection === 'asc' ? (proA ? 1 : -1) : (proA ? -1 : 1);
        }

        // 3. Si el modelo es el mismo, comparar por capacidad
        const capacidadA = parseInt(a.capacidad);
        const capacidadB = parseInt(b.capacidad);

        if (capacidadA !== capacidadB) {
            return sortDirection === 'asc' ? capacidadA - capacidadB : capacidadB - capacidadA;
        }

        return 0; // Si todo es igual, no se cambia el orden
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    };

    const getSortIcon = () => {
        return sortDirection === 'asc' ? '↓' : '↑';
    };


    return (
        <div className='container-fluid text-center'>
            <h2 className='text-center'>Lista de Iphones</h2>
            <div className="d-flex mb-2 gap-2">
                <Link to='/add-iphone' className='btn btn-primary'>Agregar Iphone</Link>

                <Link to='/view-for-whatsapp' className='btn btn-success'>Lista Whatsapp</Link>

                {/* Contenedor principal de filtros y búsqueda */}
                <div className="d-flex ms-auto">
                    <div className="input-group me-2" style={{ width: '320px' }}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="form-control"
                            placeholder="Buscar modelo:"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className={`btn btn-outline-secondary ${!searchTerm && 'invisible'}`}
                            type="button"
                            onClick={clearSearch}
                        >
                            x
                        </button>
                    </div>

                    {/* Filtro de Estado */}
                    <select
                        className="form-select me-2"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        style={{ width: '200px' }}
                    >
                        <option value="">Todos los Estados</option>
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="RESERVADO">RESERVADO</option>
                        <option value="ST">ST</option>
                        <option value="VENDIDO">VENDIDO</option>
                    </select>

                    {/* Filtro de Condición */}
                    <select
                        className="form-select"
                        value={filtroCondicion}
                        onChange={(e) => setFiltroCondicion(e.target.value)}
                        style={{ width: '220px' }}
                    >
                        <option value="">Todas las Condiciones</option>
                        <option value="SELLADO">SELLADO</option>
                        <option value="USADO">USADO</option>
                    </select>
                </div>
            </div>

            <div className="mb-2 d-flex justify-content gap-2">
                <button className="btn btn-secondary btn-sm" onClick={() => setColumnView('admin')}>
                    Vista Admin
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setColumnView('venta')}>
                    Vista Venta
                </button>
                <button className="btn btn-secondary btn-sm" onClick={resetColumnVisibility}>
                    Restablecer Columnas
                </button>
            </div>

            <div className="table-responsive">
                <table className='table table-bordered table-striped table-responsive-font'>
                    <thead>
                        <tr>
                            {visibleColumns.modelo &&
                                <th className="text-center">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn btn-sm p-0 m-0 me-1" onClick={toggleSortDirection}>
                                            {getSortIcon()}
                                        </button>
                                        <div className="flex-grow-1 text-center">MODELO</div>
                                        <div>
                                            <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('modelo')}>
                                                x
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            }
                            {visibleColumns.precio && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">PRECIO</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('precio')}>x</button></div></th>}
                            {visibleColumns.capacidad && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">GB</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('capacidad')}>x</button></div></th>}
                            {visibleColumns.color && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">COLOR</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('color')}>x</button></div></th>}
                            {visibleColumns.bateria && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">%BATERIA</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('bateria')}>x</button></div></th>}
                            {visibleColumns.condicion && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">CONDICION</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('condicion')}>x</button></div></th>}
                            {visibleColumns.estado && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">STOCK</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('estado')}>x</button></div></th>}
                            {visibleColumns.imei && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">IMEI</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('imei')}>x</button></div></th>}
                            {visibleColumns.detalles && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">DETALLES</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('detalles')}>x</button></div></th>}
                            {visibleColumns.fecha && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">FECHA</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('fecha')}>x</button></div></th>}
                            {visibleColumns.acciones && <th><div className="d-flex justify-content-between align-items-center"><div className="flex-grow-1 text-center">ACCIONES</div> <button className="btn btn-sm p-0 m-0" onClick={() => toggleColumnVisibility('acciones')}>x</button></div></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            iphones.map(
                                iphone =>
                                    <tr key={iphone.id}>
                                        {visibleColumns.modelo && <td>{iphone.modelo}</td>}
                                        {visibleColumns.precio && <td>${iphone.precio}</td>}
                                        {visibleColumns.capacidad && <td>{iphone.capacidad}</td>}
                                        {visibleColumns.color && <td>{iphone.color}</td>}
                                        {visibleColumns.bateria && <td>{iphone.bateria}</td>}
                                        {visibleColumns.condicion && <td>{iphone.condicion}</td>}
                                        {visibleColumns.estado && <td>{iphone.estado}</td>}
                                        {visibleColumns.imei && <td>{iphone.imei}</td>}
                                        {visibleColumns.detalles && <td>{iphone.detalles}</td>}
                                        {visibleColumns.fecha && <td>{iphone.fecha}</td>}
                                        {visibleColumns.acciones &&
                                            <td>
                                                <div className="d-flex justify-content-center gap-1">
                                                    <Link className='btn btn-info btn-sm' to={`/edit-iphone/${(iphone.id)}`}>Editar</Link>
                                                    <button className='btn btn-danger btn-sm' onClick={() => deleteIphone(iphone.id)}>Borrar</button>
                                                </div>
                                            </td>
                                        }
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ListIphonesComponent;