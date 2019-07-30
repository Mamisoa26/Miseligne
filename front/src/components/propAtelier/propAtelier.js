import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class PropAtelier extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get(`https://ancient-meadow-19628.herokuapp.com/api/users/newArticle/${localStorage.id}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <table className="table">
            <thead>
                <tr>
                    <th>TITRE</th>
                    <th>PRIX</th>
                    <th>DESCRIPTION</th>
                    <th>PHOTO</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {

                        return <tr key={obj._id}>
                            <td>{obj.titre}</td>
                            <td>{obj.prix}</td>
                            <td>{obj.description}</td>
                            <td>
                                <img width="150px" height="50px" src={'https://ancient-meadow-19628.herokuapp.com/api/users/newArticleImage/' + obj.image} alt="pdp" />
                            </td>
                            <td>
                                <Link to={"/modifierAtl/" + obj._id} className="btn btn-primary">Modifier</Link>
                            </td>
                            <td>
                                    </td>
                            {obj.visib === true ? (<button onClick={(e) => {
                                e.preventDefault()
                                axios.get(" https://ancient-meadow-19628.herokuapp.com/api/users/cacherAtl/" + obj._id).then(res => {
                                    axios.get('https://ancient-meadow-19628.herokuapp.com/api/users/newArticle/' + localStorage.id).then(res => {
                                        console.log(res.data)
                                        this.setState({ profil: res.data })
                                    })
                                    console.log(res.data)
                                })


                            }}>Desactiver</button>) : (<button onClick={(e) => {
                                e.preventDefault()
                                console.log(obj._id)
                                axios.get("https://ancient-meadow-19628.herokuapp.com/api/users/affichAtl/" + obj._id).then(res => {
                                    axios.get('https://ancient-meadow-19628.herokuapp.com/api/users/newArticle/' + localStorage.getItem('id')).then(res => {
                                        console.log(res.data)
                                        this.setState({ profil: res.data })
                                    })
                                    console.log(res.data)
                                })

                            }}>Activer</button>)}
                        </tr>

                    })) : ('')
                }
            </tbody>
        </table>
    }
    render() {
        return (
            <div className='app1'>
                {this.liste()}
            </div>
        );
    }
}