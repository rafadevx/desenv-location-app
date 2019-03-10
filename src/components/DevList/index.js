import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Creators as DevActions } from '../../store/ducks/devs';

import './style.css';

const DevList = ({ devs, removeDev }) => (
  <div className="dev-list">
    <ul>
      {devs.data.map(dev => (
        <li key={dev.id}>
          <hr />
          <div className="dev-info">

            <img
              style={{
                borderRadius: 100,
                width: 34,
                height: 34,
              }}
              alt="desenv"
              src={dev.avatar}
            />
            <div className="dev-name">
              <strong>{dev.name || dev.login}</strong>
              <p>{dev.login}</p>
            </div>
            <button type="button" onClick={() => removeDev(dev.id)}>
              <i className="fa fa-minus-circle" />
            </button>
            <i className="fa fa-angle-right" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  devs: state.devs,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DevList);
