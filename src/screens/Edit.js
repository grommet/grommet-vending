import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, DropButton, FormField, Heading, Text, TextArea, TextInput,
} from 'grommet';

import Loader from '../Loader';
import Context from '../Context';

export default class Edit extends Component {
  nameRef = React.createRef()

  focused = false

  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  state = { name: '' }

  // componentDidUpdate() {
  //   if (this.nameRef.current && !this.focused) {
  //     this.focused = true;
  //     this.nameRef.current.focus();
  //   }
  // }

  render() {
    const { history, match: { params: { id } } } = this.props;
    const { name, notes } = this.state;
    return (
      <Context.Consumer>
        {({ onUpdate, onDelete }) => (
          <Loader id={id}>
            {({ service }) => (
              <Box>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    onUpdate(id,
                      {
                        ...service,
                        name: name || service.name,
                        notes: notes || service.notes,
                      });
                    history.replace(`/service/${id}`);
                  }}
                >
                  <Box>
                    <Heading>
                      {`Edit ${service.name}`}
                    </Heading>
                    <FormField label="Name">
                      <TextInput
                        ref={this.nameRef}
                        value={name || service.name}
                        onChange={event => this.setState({ name: event.target.value })}
                      />
                    </FormField>
                    <FormField label="Notes" help="Markdown syntax">
                      <TextArea
                        value={notes || service.notes}
                        onChange={event => this.setState({ notes: event.target.value })}
                      />
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
                        label="Update"
                        primary
                        onClick={() => {}}
                      />
                      <Button
                        label="Cancel"
                        onClick={() => history.replace(`/service/${id}`)}
                      />
                    </Box>
                  </Box>
                </form>
                <Box margin={{ vertical: 'medium' }} align="center">
                  <DropButton
                    label="Delete"
                    color="status-critical"
                    dropAlign={{ bottom: 'top', left: 'left' }}
                    dropContent={(
                      <Box pad="medium" gap="medium">
                        <Text>
                          Are you sure?
                        </Text>
                        <Button
                          label="Yes, delete"
                          onClick={() => {
                            onDelete(id);
                            history.replace('/');
                          }}
                        />
                      </Box>
                    )}
                  />
                </Box>
              </Box>
            )}
          </Loader>
        )}
      </Context.Consumer>
    );
  }
}
