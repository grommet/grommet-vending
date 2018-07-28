import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

import Context from './Context';

class Content extends Component {
  componentDidMount() {
    const {
      id, service, onFind, onUnload,
    } = this.props;
    if (!service || service.id !== id) {
      if (service) {
        onUnload();
      }
      onFind(id);
    }
  }

  render() {
    const { children, service } = this.props;
    if (!service) {
      return (
        <Text>
          Loading ...
        </Text>
      );
    }
    return children({ service });
  }
}

Content.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  service: PropTypes.shape({}),
  onFind: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
};

Content.defaultProps = {
  service: undefined,
};

const Loader = ({ children, id }) => (
  <Context.Consumer>
    {({ service, onFind, onUnload }) => (
      onFind && (
        <Content
          id={id}
          service={service}
          onFind={onFind}
          onUnload={onUnload}
        >
          {children}
        </Content>
      )
    )}
  </Context.Consumer>
);

Loader.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Loader;
