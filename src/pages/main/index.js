import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as DevActions } from '../../store/ducks/devs';

import 'mapbox-gl/dist/mapbox-gl.css';

Modal.setAppElement('#root');

class Main extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -15.834982,
      longitude: -48.018262,
      zoom: 14,
    },
    isOpen: false,
    local: [],
    devInput: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleOpenModal = (e) => {
    this.setState({ isOpen: true, local: e.lngLat });
  }

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  }

  handleAddDev = (event) => {
    const { addDevRequest } = this.props;
    const { devInput, local } = this.state;
    event.preventDefault();
    addDevRequest(devInput, local);
    this.setState({ devInput: '', local: [] });
    this.handleCloseModal();
  }

  render() {
    const {
      viewport, isOpen, devInput,
    } = this.state;
    const { devs } = this.props;
    return (

      <div>

        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          onClick={this.handleOpenModal}
          mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
          onViewportChange={view => this.setState({ viewport: view })}
        >

          {devs.data.map(dev => (

            <Marker
              key={dev.id}
              latitude={dev.latitude}
              longitude={dev.longitude}
              onClick={this.handleMapClick}
              captureClick
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                }}
                alt="desenv"
                src={dev.avatar}
              />
            </Marker>
          ))}

        </MapGL>

        <Modal
          isOpen={isOpen}
          contentLabel="Teste"
          style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
        >
          <strong>Adicionar usuario</strong>
          <form onSubmit={this.handleAddDev}>
            <input
              placeholder="usuario git"
              value={devInput}
              onChange={e => this.setState({ devInput: e.target.value })}
            />
            <button type="submit">Adicionar</button>
            <button type="button" onClick={this.handleCloseModal}>Close</button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  devs: state.devs,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
