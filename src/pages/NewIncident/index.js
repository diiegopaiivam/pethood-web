import React, { useState } from 'react';
import './style.css';
import logo from './../../assets/logo.svg';
import camera from './../../assets/camera.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from './../../services/api';
import Header from './../Header/index';
export default function New({ history }){

    const [ image, setImage ] = useState(null);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');


    function handleSubmit(e){
        e.preventDefault();

        const data = new FormData()
        const user_id = localStorage.getItem('user_id')

        data.append('image', image)
        data.append('title', title)
        data.append('description', description)
        data.append('value', value)

        api.post('incidents', data, {
            Authorization: { user_id }
        })

        alert('Cadastrado com sucesso!')
        history.push('/profile');
    }

    return (
        <>
        <Header />
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logo} alt="Pet Hood" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhado, para encontrar um ajudante para você!</p>
                    <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#7159c1"/>
                            Voltar para Home</Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <label 
                        id="image" 
                        >
                            <input type="file" onChange={e => setImage(e.target.files[0])} />
                            <img src={camera} alt="Select img" />
                    </label>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        </>
    );
}