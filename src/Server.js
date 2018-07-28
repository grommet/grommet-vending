import React, { Component } from 'react';

import Context from './Context';

// This file simulates interaction with a server.
// The state retrieved from the server is stored in
// this component's state.
export default class Server extends Component {
  state = { context: { session: { email: 'Me' } } }

  componentDidMount() {
    const { context } = this.state;
    // simulate intializing from server
    const services = [];
    const now = (new Date()).toISOString();
    for (let i = 1; i <= 47; i += 1) {
      services.push({
        created: now,
        status: (i % 7 ? 'ok' : 'critical'),
        id: `service-${i}`,
        name: `service ${i}`,
        template: {
          id: `template-${i}`,
          name: `template ${i}`,
        },
      });
    }

    const templates = [];
    for (let i = 1; i <= 4; i += 1) {
      templates.push({ id: `template-${i}`, name: `template ${i}` });
    }

    const nextContext = {
      ...context,
      services,
      templates,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
      onCreate: this.onCreate,
      onUpdate: this.onUpdate,
      onDelete: this.onDelete,
      onSearch: this.onSearch,
      onFind: this.onFind,
      onUnload: this.onUnload,
    };

    this.setState({ context: nextContext, services });
  }

  onLogin = ({ email }) => {
    const { context } = this.state;
    this.setState({
      context: {
        ...context,
        session: { email },
      },
    });
  }

  onLogout = () => {
    const { context } = this.state;
    this.setState({
      context: {
        ...context,
        session: undefined,
      },
    });
  }

  onCreate = (service) => {
    const { context, services } = this.state;
    const now = (new Date()).toISOString();
    const nextServices = services
      .concat({ ...service, created: now })
      .sort((s1, s2) => (s1.name > s2.name ? 1 : -1));
    this.setState({
      context: {
        ...context,
        services: nextServices,
      },
      services: nextServices,
    });
  }

  onSearch = (search) => {
    const { context, services } = this.state;
    const exp = new RegExp(search, 'i');
    const nextServices = services.filter(s => exp.test(s.name));
    this.setState({
      context: {
        ...context,
        services: nextServices,
      },
    });
  }

  onFind = (id) => {
    const { context, services } = this.state;
    const service = services.find(s => s.id === id) || { name: 'not found' };
    this.setState({
      context: {
        ...context,
        service,
      },
    });
  }

  onUnload = () => {
    const { context } = this.state;
    this.setState({
      context: {
        ...context,
        service: undefined,
      },
    });
  }

  onUpdate = (id, service) => {
    const { context, services } = this.state;
    const now = (new Date()).toISOString();
    const nextService = { ...service, updated: now };
    const nextServices = services.map((s) => {
      if (s.id === id) {
        return nextService;
      }
      return s;
    });
    this.setState({
      context: {
        ...context,
        services: nextServices,
        service: nextService,
      },
    });
  }

  onDelete = (id) => {
    const { context, services } = this.state;
    const nextServices = services.filter(s => s.id !== id);
    this.setState({
      context: {
        ...context,
        services: nextServices,
      },
    });
  }

  render() {
    const { context } = this.state;
    return (
      <Context.Provider value={context} {...this.props} />
    );
  }
}
