import React, { useEffect, useState } from 'react';
import './style.css';
import Logo from './../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import api from './../../services/api';

export default function Profile(){

    const history = useHistory();
    const name = localStorage.getItem('name');
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

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Be The Hero" />
                <span>Seja Bem-vindo(a), {name}</span>

                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
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