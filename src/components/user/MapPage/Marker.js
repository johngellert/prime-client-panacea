import React from "react";
import "./Marker.css";

import { IconButton, SvgIcon } from "@material-ui/core";

function Marker(organization) {
  const { infoWindow } = organization;
  const { showInfoWindow } = organization;

  switch (organization.type) {
    case "Hospital":
      return (
        <>
          <div
            onClick={showInfoWindow}
            id={organization.id}
            className="pin bounce"
          >
            <span className="type">H</span>
          </div>
          {infoWindow == organization.id ? (
            <InfoWindow visibility="show" {...organization} />
          ) : (
            <InfoWindow visibility="hidden" {...organization} />
          )}
        </>
      );
    case "Clinic":
      return (
        <>
          <div
            onClick={showInfoWindow}
            id={organization.id}
            className="pin bounce"
          >
            <span className="type">C</span>
          </div>
          {infoWindow == organization.id ? (
            <InfoWindow visibility="show" {...organization} />
          ) : (
            <InfoWindow visibility="hidden" {...organization} />
          )}
        </>
      );
    case "Urgent Care":
      return (
        <>
          <div
            onClick={showInfoWindow}
            id={organization.id}
            className="pin bounce"
          >
            <span className="type">U</span>
          </div>
          {infoWindow == organization.id ? (
            <InfoWindow visibility="show" {...organization} />
          ) : (
            <InfoWindow visibility="hidden" {...organization} />
          )}
        </>
      );
    case "Laboratory":
      return (
        <>
          <div
            onClick={showInfoWindow}
            id={organization.id}
            className="pin bounce"
          >
            <span className="type">L</span>
          </div>
          {infoWindow == organization.id ? (
            <InfoWindow visibility="show" {...organization} />
          ) : (
            <InfoWindow visibility="hidden" {...organization} />
          )}
        </>
      );
    case "Home Visits":
      return (
        <>
          <div
            onClick={showInfoWindow}
            id={organization.id}
            className="pin bounce"
          >
            <span className="type">Hv</span>
          </div>
          {infoWindow == organization.id ? (
            <InfoWindow visibility="show" {...organization} />
          ) : (
            <InfoWindow visibility="hidden" {...organization} />
          )}
        </>
      );
    case "Pharmacy":
      return (
        <>
          <div
            onClick={showInfoWindow}
            id={organization.id}
            className="pin bounce"
          >
            <span className="type">Ph</span>
          </div>
          {infoWindow == organization.id ? (
            <InfoWindow visibility="show" {...organization} />
          ) : (
            <InfoWindow visibility="hidden" {...organization} />
          )}
        </>
      );
  }
}

const InfoWindow = (organization) => {
  const { showOrganizationClick } = organization;
  const { resetZoom } = organization;

  return (
    <div className={organization.visibility}>
      <IconButton onClick={resetZoom} style={{ padding: 0, float: `right` }}>
        <SvgIcon style={{ color: `#F96F9D` }}>
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
        </SvgIcon>
      </IconButton>
      <h3>{organization.name}</h3>
      <h4>Phone Number: {organization.phone_number}</h4>
      <div className="org-window">
        <a
          target="_blank"
          href={organization.google_maps_link}
          className="pop-up-link"
        >
          <SvgIcon>
            <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"></path>
          </SvgIcon>
          <p>Directions</p>
        </a>
        <div
          onClick={showOrganizationClick}
          id={organization.id}
          className="pop-up-link"
        >
          <SvgIcon>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
          </SvgIcon>
          <p>Details</p>
        </div>
      </div>
    </div>
  );
};

export default Marker;
