
import React from 'react';
import axios from 'axios';
import { MDBIcon,MDBCol,MDBInput,MDBCard, MDBCardBody} from "mdbreact";
import './new.css'

class NewAtelier extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      titre: '',
      utilisateur:'',
      prix: '',
      debut: '',
      duree: '',
      date:'',
      place: '',
      placeRes: '',
      description: '',
      image: '',
    }
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
}

onChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  })
}

handleUploadImage(ev) {
  ev.preventDefault();

  const data = new FormData();
  data.append('image', this.uploadInput.files[0]);
  data.append('titre', this.state.titre);
  data.append('date', this.state.date);
  data.append('prix', this.state.prix);
  data.append('debut', this.state.debut);
  data.append('duree', this.state.duree);
  data.append('placeRes', 0);
  data.append('place', this.state.place);
  data.append('idUser', localStorage.id);
  data.append('description', this.state.description)

  fetch('https://ancient-meadow-19628.herokuapp.com/api/users/newArticle/', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
      this.setState({ image: `https://ancient-meadow-19628.herokuapp.com/api/users/newArticle/${body.image}` });
      console.log('ity ilay body.image', body.image);
      
        axios.get(`https://ancient-meadow-19628.herokuapp.com/api/users/newArticle/${localStorage.id}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    });
  });
}

  render() {
    return (
      <div className="container-fluid" id ="header"> 
      <MDBCol md="12">
          <MDBCard width="100%">
            <MDBCardBody>
              <form  onSubmit={this.handleUploadImage}>
                <p className="h4 text-center py-4">Ajouter de nouveau atelier </p>
                <div className="grey-text">
                  <MDBInput
                    label="Nom du l'atelier"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right" value={this.state.value}  onChange={this.onChange} name="titre"
                  />
                  <MDBInput
                    label="Déscription"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange} name="description"
                  />
                  <MDBInput
                    label="Date"
                    group
                    type="date"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange} name="date"
                  />
                   <MDBInput
                    label="debut"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange}  name="debut"
                  />
                   <MDBInput
                    label="horaire"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange}  name="duree"
                  />
                   <MDBInput
                    label="Nombre de place disponible"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange}  name="place"
                  />
                   <MDBInput
                    label="Nombre de place reservé"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange}  name="placeRes"
                  />
                  <MDBInput
                    label="Prix"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right" value={this.state.value} onChange={this.onChange}  name="prix"
                  />
                <label>Images de l'atelier : </label><br/>
               
                <span> <input className="btn btn-primary btn-sm float-left"ref={(ref) => { this.uploadInput = ref; }} type="file" name="image"/></span>
                </div>
                <div className="text-center">
                <div className="text-center mb-3">
              <button className="btn blue-gradient btn-block btn-rounded z-depth-1a" type="submit" color="#f3671f">
                Ajouter
                <MDBIcon icon="paper-plane" className="ml-2" />
              </button>
            </div>
            </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
       <div className="row">
        
        <div className="col-md-6">
        
        </div>
        <div className="col-md-6">

        </div>
       </div> 
       
    </div>

    );
  }
}

export default NewAtelier;
