import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import axios from 'axios';
import './MapPage.css';
import { Grid, Typography, Checkbox, FormControlLabel, IconButton, SvgIcon } from '@material-ui/core/';
import BackButton from '@material-ui/icons/ChevronLeftRounded';

function MapPage(props) {

  const { cityName } = props.match.params;
  const [organizations, setOrganizations] = useState([]);
  const [showOrganization, setOrganizationToShow] = useState([]);
  const [lat, setLat] = useState(props.location.coordinates?props.location.coordinates.lat:0);
  const [lng, setLng] = useState(props.location.coordinates?props.location.coordinates.lng:0);
  const [infoWindow, setInfoWindow] = useState(null);
  const [zoom, setZoom] = useState(11);

  const markerClicked = (key, props) => {
    const { lat, lng } = props;
    setLat(Number(lat));
    setLng(Number(lng));
    return setZoom(13);
  }

  const markerOpen = (e) => {
    const { id } = e.currentTarget;
    setOrganizationToShow(organizations.filter((org) => {
      return org.id == id;
    }))
  }

  const markerClose = (e) => {
    return setOrganizationToShow([]);
  }

  const showInfoWindow = (e) => {
    return setInfoWindow(e.currentTarget.id);
  }

  const resetZoom = (e) => {
    setInfoWindow(null);
    return setZoom(11);
  }

  useEffect(() => {

    async function fetchOrganizations() {
      try {
        const { data } = await axios.get(`/api/public/map?city_id=${props.location.city_id}&orgType=${props.location.orgType}`);
        setOrganizations(data);
      } catch (error) {
      }
    }

    if (props.location.city_id) {
      fetchOrganizations();
    }

  }, []);

  if (props.location.city_id) {
    return (
      <>

        <div className="container">
          <div className="back-button">
            <IconButton onClick={props.history.goBack}>          
              <BackButton className="back-icon"/>
            </IconButton>
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyBPtCeO56OINKc-kpae1crS0QqaPzc92Co',
              language: 'en'
            }}
            center={{ lat: lat, lng: lng }}
            zoom={zoom}
            layerTypes={['TrafficLayer', 'TransitLayer']}
            options={{ clickableIcons: false }}
            onChildClick={markerClicked}
          >

            {organizations.map((organization, i) => {
              return (
                <Marker
                  key={i}
                  infoWindow={infoWindow}
                  showInfoWindow={showInfoWindow}
                  resetZoom={resetZoom}
                  showOrganizationClick={markerOpen}
                  cityName={cityName}
                  {...organization}
                />
              )
            })}

          </GoogleMapReact>

        </div>
        {
          showOrganization.length > 0
            ?
            <>
              <div className="organization-list">
                <IconButton
                  onClick={markerClose}
                >
                  <SvgIcon style={{ color: `#F96F9D`}}>
                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                  </SvgIcon>
                </IconButton>
                <Grid container spacing={1} item xs={12}
                  style={{ margin: `0px 20px`, width: `90vw` }} >
                  <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '5px' }}>
                    <a target="_blank" 
                      href={showOrganization[0].website_url}
                      style={{ textDecoration: `underline` }}
                    >
                      {showOrganization[0].name}
                    </a>
                  </Grid>

                  <Grid item xs={12}>
                    Phone Number: {showOrganization[0].phone_number}
                  </Grid>

                  <Grid item xs={12}>
                    Hours: {showOrganization[0].hours}
                  </Grid>

                  <Grid item xs={12}>
                    Comments: {showOrganization[0].comments}
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].recommended ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Recommended
                      </Typography>
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].twentyfour ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Open 24 Hours
                      </Typography>
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].labor_delivery ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Labor and Delivery
                      </Typography>
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].childrens ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Pediatric Services
                      </Typography>
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].childrens_surgical ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Surgical Pediatric Services
                      </Typography>
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].adult ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Adult Medicine
                      </Typography>
                  </Grid>

                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].adult_surgical ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Adult Surgical Services
                      </Typography>
                  </Grid>
                  <Grid item xs={6} className="org-boolean">
                      { showOrganization[0].medical_translators ?
                        <SvgIcon style={{ color: `#2ECBB0` }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                        </SvgIcon>
                      :
                        <SvgIcon style={{ color: `#F96F9D` }}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                      }
                      <Typography variant="body2" display="inline">
                        Medical Translators Available
                      </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <a target="_blank" 
                      href={showOrganization[0].google_maps_link}
                      style={{ textDecoration: `underline` }}
                    >
                      Directions
                      </a>
                  </Grid>
                </Grid>
              </div>
            </>
            :
            <>
            </>
        }
      </>
    )
  } else {
    return (
      <h1>
      404
      </h1>
    )
  }
}

export default (MapPage);