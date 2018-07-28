import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, FormField, Heading, Select, TextInput,
} from 'grommet';

import Context from '../Context';

export default class Add extends Component {
  nameRef = React.createRef()

  static propTypes = {
    history: PropTypes.shape({}).isRequired,
  }

  state = { name: '', template: {} }

  componentDidMount() {
    this.nameRef.current.focus();
  }

  render() {
    const { history } = this.props;
    const { name, template, templates: stateTemplates } = this.state;
    return (
      <Context.Consumer>
        {({ templates, onCreate }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onCreate({ name, template });
              history.replace('/');
            }}
          >
            <Box>
              <Heading>
                New Service
              </Heading>
              <FormField label="Name">
                <TextInput
                  ref={this.nameRef}
                  value={name}
                  onChange={event => this.setState({ name: event.target.value })}
                />
              </FormField>
              <FormField label="Template">
                <Select
                  options={stateTemplates || templates}
                  value={template.name || ''}
                  onSearch={(search) => {
                    if (search) {
                      const exp = new RegExp(search, 'i');
                      const nextTemplates = templates.filter(t => exp.test(t.name));
                      this.setState({ templates: nextTemplates });
                    } else {
                      this.setState({ templates: undefined });
                    }
                  }}
                  onChange={event => this.setState({ template: event.option })}
                >
                  {option => (
                    <Box pad="small">
                      {option.name}
                    </Box>
                  )}
                </Select>
              </FormField>
              <Box
                margin={{ vertical: 'large' }}
                direction="row-responsive"
                justify="between"
                align="center"
                gap="medium"
              >
                <Button
                  type="submit"
                  label="Deploy"
                  primary
                  onClick={() => {}}
                />
                <Button
                  label="Cancel"
                  onClick={() => history.replace('/')}
                />
              </Box>
            </Box>
          </form>
        )}
      </Context.Consumer>
    );
  }
}
