import React from 'react';
import './style.css';
import Logo from './../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';


export default function Profile(){

    const history = useHistory();
    const name = localStorage.getItem('name');
    
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="header-content">
            <header>
                <img src={Logo} alt="Pet Hood" />
                <span>Seja Bem-vindo(a), <strong>{name}</strong></span>

                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#7159c1" />
                </button>
            </header>
        </div>
    );
}