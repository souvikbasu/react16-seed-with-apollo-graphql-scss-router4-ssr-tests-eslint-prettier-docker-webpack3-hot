import React, { Component } from 'react';

import appSettings from 'appSettings';
import logger from '../../logger';
import HelloWorld from '../../containers/HelloWorld';
import './style.scss';

class App extends Component {
  componentDidCatch(error, info) {
    logger.error('COMPENENT CAUGHT ERROR');
    logger.error({ error, info });
  }

  render() {
    logger.info('Initializing React App. Env: ' + appSettings.env);

    return (
      <div className="App">
        <HelloWorld />
      </div>
    );
  }
}

export default App;
