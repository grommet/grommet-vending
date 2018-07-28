import React, { Component } from 'react';
import {
  Box, Grid, Heading, InfiniteScroll, RoutedButton, Text, TextInput,
} from 'grommet';

import Context from '../Context';

export default class Services extends Component {
  state = { search: '' }

  render() {
    const { search } = this.state;
    return (
      <Context.Consumer>
        {({ services, onSearch }) => (
          <Box>
            <Box direction="row" justify="between" align="center">
              <Heading>
                Services
              </Heading>
              <RoutedButton label="New" path="/add" />
            </Box>
            <TextInput
              placeholder="search"
              value={search}
              onChange={(event) => {
                const nextSearch = event.target.value;
                onSearch(nextSearch);
                this.setState({ search: nextSearch });
              }}
            />
            <Box margin={{ vertical: 'medium' }}>
              <Grid columns="small" gap="small">
                {services ? (
                  <InfiniteScroll items={services}>
                    {service => (
                      <Box
                        key={service.name}
                        basis="small"
                        round="xsmall"
                        overflow="hidden"
                      >
                        <RoutedButton
                          path={`/service/${service.id}`}
                          fill
                          hoverIndicator
                        >
                          <Box
                            direction="row"
                            justify="between"
                            align="center"
                            pad="small"
                            background={{ color: 'light-4', opacity: true }}
                          >
                            <Text>
                              {service.name}
                            </Text>
                            {service.status !== 'ok' && (
                              <Box pad="xsmall" round="xsmall" background="status-critical" />
                            )}
                          </Box>
                        </RoutedButton>
                      </Box>
                    )}
                  </InfiniteScroll>
                ) : (
                  <Box animation="medium" pad="large" background="light-1" />
                )}
              </Grid>
            </Box>
          </Box>
        )}
      </Context.Consumer>
    );
  }
}
