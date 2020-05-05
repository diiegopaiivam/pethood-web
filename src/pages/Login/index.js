import React, { useState } from 'react';
import './style.css';
import logo from './../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from './../../services/api';

export default function Login(){
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { email, password });
            localStorage.setItem('name', response.data[0].name);
            localStorage.setItem('users_id', response.data[0]._id);
            

            history.push('/profile');

        } catch (err){
            alert('Falha no login, tente novamente!')
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input placeholder="Digite seu email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Password"
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar!</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#7159c1"/>
                        Não tenho cadastro</Link>
                </form>
            </section>
        </div>
    );
}