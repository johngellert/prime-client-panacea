import React, { Component } from 'react';
import { connect } from 'react-redux';

//styling imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './CityFormPage.css';
import { Button } from '@material-ui/core';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';


class CityFormPage extends Component {
  state = {
    newCity: {
      name: '',
      overview: '',
      health_risks: '',
      ambulance: '',
      fire: '',
      police: '',
      roadside_assistance: '',
      wellness_resources: '',
      local_health_remedies: '',
      healthcare_tourism: '',
      WHO_link: '',
      CDC_link: '',
      google_translate_link: '',
      local_resources: '',
    }
  }

  handleNewChange = (propertyName) => (event) => {
    console.log('somethings happening!');
    this.setState({
      newCity: {
        ...this.state.newCity,
        [propertyName]: event.target.value,
      }
    })
  }

  addNewCity = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'POST_CITY', payload: this.state.newCity })
    this.props.history.push('/cities')
  }

  componentDidMount() {
    const { match: { params: { cityName } } } = this.props; // this is the same way as writing const params = this.props.match.params.cityName;
    if (cityName === 'new') {
      console.log('new form');
    } else {
      console.log('filled form');
    }
  }

  render() {
    return (
      <AdminLayout>
        <h2>Add New City</h2>
        <form className="newCityForm" onSubmit={this.addNewCity}>
          <Grid id="newCityGrid" container>
            <Grid className="inputFields" item xs={12}>
              <TextField 
                id="name" 
                label="City Name" 
                margin="normal" 
                variant="outlined" 
                value={this.state.newCity.name} 
                onChange={this.handleNewChange('name')} />
                <br/>
            </Grid>
            <Grid className="inputFields"  item xs={12}>
              <TextField rows="3" label="Healthcare in the City" multiline id="overview" margin="normal" variant="outlined" type='type' value={this.state.newCity.overview} onChange={this.handleNewChange('overview')} />
              <TextField rows="3" label="Health Risks" multiline id="health_risks" margin="normal" variant="outlined" type='type' value={this.state.newCity.health_risks} onChange={this.handleNewChange('health_risks')} />
            </Grid>
            <Grid item={5}>
              <TextField id="ambulance" label="Ambulance" margin="normal" variant="outlined" value={this.state.newCity.ambulance} onChange={this.handleNewChange('ambulance')} />
              <TextField id="fire" label="Fire" margin="normal" variant="outlined" value={this.state.newCity.fire} onChange={this.handleNewChange('fire')} />
              <TextField id="police" label="Police" margin="normal" variant="outlined" value={this.state.newCity.police} onChange={this.handleNewChange('police')} />
              <TextField id="roadside_assistance" label="Roadside Assistance" margin="normal" variant="outlined" value={this.state.newCity.roadside_assistance} onChange={this.handleNewChange('roadside_assistance')} />
              <TextField rows="3" label="Wellness Resources" multiline id="wellness_resources" margin="normal" variant="outlined" type='type' value={this.state.newCity.wellness_resources} onChange={this.handleNewChange('wellness_resources')} />
              <TextField rows="3" label="Local Health Remedies" multiline id="local_health_remedies" margin="normal" variant="outlined" type='type' value={this.state.newCity.local_health_remedies} onChange={this.handleNewChange('local_health_remedies')} />
              <TextField rows="3" label="Healthcare Tourism" multiline id="healthcare_tourism" margin="normal" variant="outlined" type='type' value={this.state.newCity.healthcare_tourism} onChange={this.handleNewChange('healthcare_tourism')} />
              <TextField id="WHO_link" label="WHO Link" margin="normal" variant="outlined" value={this.state.newCity.WHO_link} onChange={this.handleNewChange('WHO_link')} />
              <TextField id="CDC_link" label="CDC Link" margin="normal" variant="outlined" value={this.state.newCity.CDC_link} onChange={this.handleNewChange('CDC_link')} />
              <TextField id="google_translate_link" label="Google Translate Link" margin="normal" variant="outlined" value={this.state.newCity.google_translate_link} onChange={this.handleNewChange('google_translate_link')} />
              <TextField rows="3" label="Local Online Resources" multiline id="local_resources" margin="normal" variant="outlined" type='type' value={this.state.newCity.local_resources} onChange={this.handleNewChange('local_resources')} />
            </Grid>
            <br />
            <Grid item xs={12} className="GridItTextCenter">
              <Button type='submit' value='Add New City' style={{ width: "24vw" }} variant="contained" color="inherent">Submit New City</Button>
            </Grid>
          </Grid>
        </form>
      </AdminLayout>
    )
  }
}

export default connect()(CityFormPage);