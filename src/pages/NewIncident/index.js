import React, { useState } from 'react';
import './style.css';
import logo from './../../assets/logo.svg';
import camera from './../../assets/camera.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from './../../services/api';
import Header from './../Header/index';

export default function NewIncident(){

    // const[image, setImage] = useState('');
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }
        
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId, 
                }
            })
            history.push('/profile');
        } catch(err){
            alert("Não foi possível cadastrar o caso, tente novamente!")
        }
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
                <form onSubmit={handleNewIncident}>
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
                            <input type="file"  />
                            <img src={camera} alt="Select img" />
                    </label>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        </>
    );
}