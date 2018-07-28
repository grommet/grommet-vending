import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, FormField, Heading, TextInput,
} from 'grommet';

import Context from '../Context';

export default class Login extends Component {
  emailRef = React.createRef()

  static propTypes = {
    history: PropTypes.shape({}).isRequired,
  }

  state = { email: '', password: '', error: {} }

  componentDidMount() {
    this.emailRef.current.focus();
  }

  render() {
    const { history } = this.props;
    const { email, password, error } = this.state;
    return (
      <Context.Consumer>
        {({ onLogin }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (email) {
                onLogin({ email, password });
                history.replace('/');
              } else {
                this.setState({ error: { email: 'required' } });
              }
            }}
          >
            <Box>
              <Heading>
                Login
              </Heading>
              <FormField
                label="Email"
                error={error.email}
              >
                <TextInput
                  ref={this.emailRef}
                  value={email}
                  onChange={event => this.setState({ email: event.target.value, error: {} })}
                />
              </FormField>
              <FormField label="Password">
                <TextInput
                  type="password"
                  value={password}
                  onChange={event => this.setState({ password: event.target.value })}
                />
              </FormField>
              <Box
                margin={{ vertical: 'large' }}
                alignSelf="start"
              >
                <Button
                  type="submit"
                  label="Login"
                  primary
                  onClick={() => {}}
                />
              </Box>
            </Box>
          </form>
        )}
      </Context.Consumer>
    );
  }
}
