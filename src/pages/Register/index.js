import React, { useState } from 'react';
import './style.css';
import logo from './../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from './../../services/api';

export default function Register(){
    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            password,
            phone,
            city,
            uf
        };

        try {
            await api.post('users', data);
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        } catch(err) {
            alert('Não foi possível realizar o cadastro, tente novamente.')
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="be the hero" />
                    <h1>Faça seu Cadastro</h1>
                    <p>Faça seu cadastro na nossa plataforma e ajude o animalzinho mais próximo a você!</p>
                    <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#7159c1"/>
                            Já Possuo Cadastro</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome Completo" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Telefone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <input placeholder="Crie sua senha"
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="input-group">
                        <input placeholder="CIDADE"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width:80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}