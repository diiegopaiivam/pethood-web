import React, { useEffect, useState } from 'react';
import './style.css'
import Header from './../Header/index';
import { Link } from 'react-router-dom';
import api from './../../services/api';

export default props => { 

    const [incidents, setIncidents] = useState([]);
    const  id  = props.id;
    console.log(id);
    

    useEffect(() => {
        api.get(`incidents/${id}`).then(response => {
            setIncidents(response.data);
        })
    }, []);
    
    return (
        <>
            <Header />
            <section className="container">
                <div className="card">
                    <div className="image-card">
                        <img src="ggg"/>
                    </div>
                    <div className="conteudo">
                        <strong>Caso:</strong>
                        <p>sdfisdhfsdu</p>
                        <hr/>
                        <strong>Descrição:</strong>
                        <p>Encontrei esse gato com a pata quebrada</p>
                        <hr/>
                        <strong>Valor:</strong>
                        <p>R$ 200,00</p>
                        <hr/>
                        <div className="contato">
                            <strong>Entre em contato: </strong>
                            <Link className="back-link-detail" to="#"> Phone </Link> - <Link className="back-link-detail" to="#"> Email </Link>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    );
}