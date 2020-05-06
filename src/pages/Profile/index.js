import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import api from './../../services/api';
import Header from './../Header/index';

export default function Profile(){

    const usersId = localStorage.getItem('id')

    const [incidents, setIncidents] = useState([]);
    
    useEffect(() => {
        api.get('incidents').then(response => {
            setIncidents(response.data);
        })
    }, []);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: usersId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }
    return (
        <div className="profile-container">
            <Header />
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident._id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident._id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                        <Link className="back-link" to={`/incidents/${incident._id}`}>         
                        Ver detalhes do caso</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}