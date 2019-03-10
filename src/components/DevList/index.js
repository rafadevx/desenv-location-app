import React from 'react';
import { connect } from 'react-redux';

import './style.css';

const DevList = ({ devs }) => (
  <div className="dev-list">
    <ul>
      {devs.data.map(dev => (
        <li key={dev.id}>
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
          <button>
            <i className="fa fa-minus-circle" />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  devs: state.devs,
});

export default connect(mapStateToProps)(DevList);
