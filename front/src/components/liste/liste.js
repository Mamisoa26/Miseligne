import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListTout extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };

    }
    componentDidMount() {
        axios.get('https://ancient-meadow-19628.herokuapp.com/api/users/newArticle')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ produit: response.data });
                console.log('i am a produit', this.state.produit)
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <div>
            <div className="container-fluid">

                {
                    (this.state.produit.length > 0) ? (this.state.produit.filter((params)=>params.visib).map((obj) => {
                        return <div className="container-fluid">
                            <div id="ligne" className="row" key={obj._id}>
                                <div className="container">
                                    <img className="img-fluid " width="50%" height="20%"
                                        src={'https://ancient-meadow-19628.herokuapp.com/api/users/newArticleImage/' + obj.image}
                                        alt="pdp" />
                                </div>
                                <div className="container">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-2">
                                    <div className="row">
                                        <div className="container-fluid">
                                            <h2>
                                                {obj.titre}
                                            </h2>
                                            <p><strong>{obj.prix}</strong></p>
                                        </div>

                                    </div>
                                </div> */}
                                <div className="container">
                                    <button class="btn btn-success" onClick={() => {
                                        confirmAlert({
                                            customUI: ({ onClose }) => {
                                                return (
                                                    <center>
                                                        <div className='custom-ui'>
                                                            <div >
                                                                <h4>Inscription pour l 'Atelier {obj.Titre}</h4>
                                                                <input name="nom" onChange={this.handleChange}
                                                                    value={this.state.value} placeholder="Nom" /><br></br>
                                                                <input name="prenom" placeholder="Prenom" onChange={this.handleChange} value={this.state.value} /><br></br>
                                                                <input name="phone" placeholder="Numero téléphone" onChange={this.handleChange} value={this.state.value} /><br></br>
                                                                <input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.value} /><br></br>

                                                                <button onClick={() => {
                                                                    axios.post("https://ancient-meadow-19628.herokuapp.com/api/users/particulier/" + obj._id, {
                                                                        nom: this.state.nom,
                                                                        prenom: this.state.prenom,
                                                                        phone: this.state.phone,
                                                                        email: this.state.email

                                                                    }).then(res => {
                                                                        console.log(res.data);
                                                                        axios.get("https://ancient-meadow-19628.herokuapp.com/api/users/newArticle").then(res => {

                                                                            this.setState({ profil: res.data })
                                                                            console.log(this.state.profil)

                                                                        })
                                                                    })

                                                                    onClose();
                                                                }}
                                                                >
                                                                    confirmer
                                                                </button>
                                                                <button onClick={onClose}>No</button>
                                                            </div>

                                                        </div></center>
                                                );
                                            }
                                        });
                                    }} >S'inscrire</button>
                                </div>
                            </div>
                        </div>

                    })) : ('')
                }

            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}