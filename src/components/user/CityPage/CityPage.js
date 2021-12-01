import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CityPage.css';
import hospitalIcon from '../../../images/hospital-teal.png';
import phoneIcon from '../../../images/Ringing-phone-teal.png';
import medicineIcon from '../../../images/medicine-white.png';
import UserLayout from '../../layouts/UserLayout/UserLayout';

// Material-UI components
import { 
  Grid, 
  Paper, 
  Typography,
  Link as MuiLink,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class CityPage extends Component {

  state = {
    city: {},
    orgTypes: ['Hospital', 'Clinic', 'Urgent Care', 'Laboratory', 'Home Visits', 'Pharmacy'],
  }

  componentDidMount() {
    this.axiosRequest();
  }

  axiosRequest = () => {
    axios.get(`/api/search/city?city_name=%${this.props.match.params.cityName}%`)
    .then(({ data }) => {
      this.setState({
        city: { ...data[0] },
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.cityName !== this.props.match.params) {
      return this.axiosRequest();
    }
  }

  render() {
    return (
      <UserLayout>
        <Paper style={{width: `100%` }} square={true}>
          <Typography variant='h5' gutterBottom style={{ paddingLeft: `4%`, marginTop: '2%', marginBottom: '2%' }}>
            <b>{this.state.city.city_name}, {this.state.city.city_country_id}</b>
          </Typography>
          <div className="stock-map">
            <Grid
              container
            >

              {this.state.orgTypes.map(
                (type, i) => (

                  <Grid
                    key={i}
                    item xs={6}
                    style={{ textAlign: `center`, marginTop: `2.5vh` }}
                  >

                    <Link
                      style={{ display: 'block' }}
                      to={{
                        pathname: `/map/${this.props.match.params.cityName}`,
                        city_id: this.state.city.city_id,
                        orgType: type,
                        coordinates: {
                          lat: Number(this.state.city.lat),
                          lng: Number(this.state.city.long)
                        },
                      }}>
                      <button className="organization-button">
                        <Typography variant='h6' 
                        style={{ color: `white`, 
                        textShadow: `1px 1px 1.5px #000000`, 
                        letterSpacing: `2px`}}
                        >
                          {/* <b> */}
                            {type}
                          {/* </b> */}
                        </Typography>
                      </button>
                      
                    </Link>

                  </Grid>

                ))}

            </Grid>
          </div>
          <Typography variant='h6' gutterBottom style={{ paddingLeft: `3%`, marginTop: '2%', marginBottom: '2%' }}>
            <img src={hospitalIcon} alt="Hospital Icon" /> 
            <> Healthcare in the City</>
          </Typography>
        </Paper>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: `#F8F9FA`}} square={true}>
            <Accordion display='block' style={{width: `100%`, backgroundColor: `#F8F9FA`}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: `2ECBB0`}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  <Typography variant='body2' gutterBottom style={{ paddingLeft: `6%`, paddingRight: `6%` }}>
                    <b>Overview:</b> 
                  </Typography>
                    <Typography variant='body2' gutterBottom style={{ paddingLeft: `7%`, paddingRight: `6%` }}>
                      {this.state.city.overview}
                    </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{marginTop: 0}}>
                  <Typography variant='body2' gutterBottom style={{ paddingLeft: `5%`, paddingRight: `5%` }}>
                    <b>Health Risks:</b>
                  </Typography>
                    <Typography variant='body2' gutterBottom style={{ paddingLeft: `6%`, paddingRight: `5%` }}>
                      {this.state.city.health_risks}
                    </Typography>
                  <Typography variant='body2' gutterBottom style={{ paddingLeft: `5%`, paddingRight: `5%` }}>
                    <b>Wellness Resources:</b>
                  </Typography>
                    <Typography variant='body2' gutterBottom style={{ paddingLeft: `6%`, paddingRight: `5%` }}>
                      {this.state.city.wellness_resources}
                    </Typography>
                  <Typography variant='body2' gutterBottom style={{ paddingLeft: `5%`, paddingRight: `5%` }}>
                    <b>Local Health Remedies</b>
                  </Typography>
                    <Typography variant='body2' gutterBottom style={{ paddingLeft: `6%`, paddingRight: `5%` }}>
                      {this.state.city.local_health_remedies}
                    </Typography>
                  <Typography variant='body2' gutterBottom style={{ paddingLeft: `5%`, paddingRight: `5%` }}>
                    <b>Healthcare Tourism:</b>
                  </Typography>
                    <Typography variant='body2' gutterBottom style={{ paddingLeft: `6%`, paddingRight: `5%` }}>
                      {this.state.city.healthcare_tourism}
                    </Typography>
                  <div style={{ paddingLeft: `5%`, paddingRight: `5%` }}>
                    <Typography variant='body2' gutterBottom>
                      <b>Important Resources:</b>
                    </Typography>
                  { this.state.city.WHO_link &&
                    <Typography gutterBottom>
                      <MuiLink href={this.state.city.WHO_link} target="_blank" underline='always'>
                        WHO Link
                      </MuiLink>
                    </Typography>
                  }
                  { this.state.city.CDC_link &&
                    <Typography gutterBottom>
                      <MuiLink href={this.state.city.CDC_link} target="_blank" underline='always'>
                        CDC Link
                      </MuiLink>
                    </Typography>
                  }
                  { this.state.city.google_translate_link &&
                    <Typography gutterBottom>
                      <MuiLink href={this.state.city.google_translate_link} target="_blank" underline='always'>
                      Google Translate Link
                      </MuiLink>
                    </Typography>
                  }
                  { this.state.city.local_resources &&
                    <Typography gutterBottom>
                      <MuiLink href={this.state.city.local_resources} target="_blank" underline='always'>
                      Local Resources
                      </MuiLink>
                    </Typography>
                  }
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </Paper>  
        </Grid>
        <Typography variant='h6' gutterBottom style={{ paddingLeft: `3%`, marginTop: '4%', marginBottom: '2%' }}>
            <img src={phoneIcon} alt="Phone Icon" style={{ width: `6%` }}/> 
            <> Emergency Phone Numbers</>
        </Typography>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: `#F8F9FA`, padding: `2% 11%` }} square={true}>
            <Typography variant='body1' gutterBottom>
              {this.state.city.fire}: Fire
            </Typography>
            <Typography variant='body1' gutterBottom>
              {this.state.city.police}: Police
            </Typography>
            <Typography variant='body1' gutterBottom>
              {this.state.city.ambulance}: Ambulance
            </Typography>
            <Typography variant='body1' gutterBottom>
              {this.state.city.roadside_assistance}: Roadside Assist
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className="medicine-translations">
          <Link 
          to={{ pathname: `/city/${this.props.match.params.cityName}/medications`, id: this.state.city.city_id }}
          >
            <IconButton className="medicine-button">
              <img src={medicineIcon} alt="Medicine Icon" style={{ width: `65%`, padding: `15%` }}/>
            </IconButton>
          </Link>
          <Typography variant="body2" style={{ 
            marginTop: `2.5%` 
          }}>
            Medicine Translations
          </Typography>
        </Grid>
      </UserLayout >
    )
  }
}

export default (CityPage);