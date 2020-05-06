import React, { Component } from 'react';
import './style.css'
import Header from './../Header/index';
import api from './../../services/api';
import { FiPhoneCall, FiMail } from 'react-icons/fi';

export default class Details extends Component {

    constructor(props){
        super(props);
        this.state = {
            incidents: {
                incident: {
                    description: '',
                    title: '',
                    value: '',
                    image_url: '',
                    phone:'',
                    email:''
                }
            } 
        }
    }
    
    componentWillMount () {
        api.get(`incidents/${this.props.match.params.id}`).then(response => {
            this.setState({ incidents: response.data });
        })
    }
    
    render(){
        console.log(this.state.incidents);
        return (
            <>
                <Header />
                <section className="container">
                    <div className="card">
                        <div className="image-card">
                            <img src={this.state.incidents.incident.image_url} alt="image_url"/>
                        </div>
                        <div className="conteudo">
                            <strong>Caso:</strong>
                            <p>{this.state.incidents.incident.title}</p>
                            <hr/>
                            <strong>Descrição:</strong>
                            <p>{this.state.incidents.incident.description}</p>
                            <hr/>
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(this.state.incidents.incident.value)}</p>
                            <hr/>
                            <strong>Entre em contato: </strong>
                            <div className="contato">
                                <FiPhoneCall size={18} color="#7159c1" /> &nbsp;<p> (85) {this.state.incidents.phone}</p> &nbsp;&nbsp; <FiMail size={18} color="#7159c1" /> &nbsp;<p> {this.state.incidents.email} </p>
                            </div> 
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
