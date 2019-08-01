import React, { Component } from 'react';
import { connect } from 'react-redux';

class CityFormPage extends Component {

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
      <>
        <pre>
          {JSON.stringify(this.props, null, 2)}
        </pre>
      </>
    )
  }
}

export default connect()(CityFormPage);