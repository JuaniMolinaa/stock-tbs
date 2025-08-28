import React, { useState, useEffect } from 'react';
import IphoneService from '../services/IphoneService';
import { Link } from 'react-router-dom';

export const ListWhatsapp = () => {
    const [iphones, setIphones] = useState([]);

    const sortIphones = (a, b) => {
        const modelA = a.modelo.toLowerCase();
        const modelB = b.modelo.toLowerCase();

        const numberA = parseInt(modelA.match(/\d+/));
        const numberB = parseInt(modelB.match(/\d+/));

        if (numberA !== numberB) {
            return numberA - numberB;
        }

        const proA = modelA.includes('pro');
        const proMaxA = modelA.includes('pro max');
        const proB = modelB.includes('pro');
        const proMaxB = modelB.includes('pro max');

        if (proMaxA !== proMaxB) {
            return proMaxA ? 1 : -1;
        }
        if (proA !== proB) {
            return proA ? 1 : -1;
        }

        return 0;
    };

  useEffect(() => {
    IphoneService.getAllIphones('DISPONIBLE', null, null)
        .then(response => {
            // Ordenamos la lista antes de guardarla en el estado
            const sortedIphones = response.data.sort(sortIphones);
            setIphones(sortedIphones);
        })
        .catch(error => {
            console.log(error);
        });
}, []);

    // Función para agrupar y contar los equipos
    const groupIphones = (iphones) => {
        const usedMap = {};
        const sealedMap = {};

        // Emojis para los colores
        const colorEmojis = {
            'NEGRO': 'NEGRO ⚫️',
            'BLANCO': 'BLANCO ⚪️',
            'MORADO': 'MORADO 🟣',
            'AMARILLO': 'AMARILLO 🟡',
            'AZUL': 'AZUL 🔵',
            'VERDE': 'VERDE 🟢',
            'ROSADO': 'ROSADO 💗',
            'ROJO': 'ROJO 🔴',
            'DORADO': 'DORADO 🌞',
            'NATURAL': 'NATURAL 🥈',
            'DESERT': 'DESERT 🟠',
        };

        iphones.forEach(iphone => {
            if (iphone.condicion === 'USADO') {
                const key = `${iphone.modelo}-${iphone.color}-${iphone.capacidad}-${iphone.bateria}-${iphone.precio}`;
                if (!usedMap[key]) {
                    usedMap[key] = { ...iphone, count: 0 };
                }
                usedMap[key].count++;
            } else if (iphone.condicion === 'SELLADO') {
                const key = `${iphone.modelo}-${iphone.color}-${iphone.capacidad}-${iphone.precio}`;
                if (!sealedMap[key]) {
                    sealedMap[key] = { ...iphone, count: 0 };
                }
                sealedMap[key].count++;
            }
        });

        const formattedUsed = Object.values(usedMap).map(item => {
            const countText = item.count > 1 ? ` x${item.count}` : '';
            return `📲${item.modelo} ${item.color} ${item.capacidad}GB ${item.bateria}% ${item.precio} USD${countText}`;
        });

        const formattedSealed = Object.values(sealedMap).map(item => {
            const emoji = colorEmojis[item.color.toUpperCase()] || '';
            const countText = item.count > 1 ? ` x${item.count}` : ' (último)';
            return `📲${item.modelo} ${emoji} ${item.capacidad}GB ${item.precio} USD${countText}`;
        });

        return { used: formattedUsed, sealed: formattedSealed };
    };

    const groupedIphones = groupIphones(iphones);

    return (
        <div className='container-fluid px-4'>
            <h2 className='text-center'>Lista para Whatsapp</h2>
            <Link to='/iphones' className='btn btn-secondary mb-3'>Volver a Vista Admin</Link>

            <div className="row">
                {/* Vista para equipos Usados */}
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5>Equipos Usados Disponibles</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {groupedIphones.used.length > 0 ? (
                                groupedIphones.used.map((item, index) => (
                                    <li key={`used-${index}`} className="list-group-item">
                                        {item}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No hay equipos usados disponibles.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Vista para equipos Sellados */}
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h5>Equipos Sellados Disponibles</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {groupedIphones.sealed.length > 0 ? (
                                groupedIphones.sealed.map((item, index) => (
                                    <li key={`sealed-${index}`} className="list-group-item">
                                        {item}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No hay equipos sellados disponibles.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListWhatsapp;