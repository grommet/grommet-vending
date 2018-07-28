import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, RoutedButton, Menu, Text,
} from 'grommet';
import { Vend } from 'grommet-icons';

import Context from './Context';

const Header = ({ history }) => (
  <Context.Consumer>
    {({ session, onLogout }) => (
      <Box direction="row" justify="between" align="center">
        <RoutedButton path={session ? '/' : '/login'} hoverIndicator>
          <Box
            pad="small"
            direction="row"
            align="center"
            gap="small"
          >
            <Vend />
            <Text size="large">
              Serv-O-Mat
            </Text>
          </Box>
        </RoutedButton>
        {session && (
          <Menu
            label={session.email}
            items={[
              {
                label: 'Help',
                onClick: () => {
                  history.replace('/');
                },
              },
              {
                label: 'Logout',
                onClick: () => {
                  onLogout();
                  history.replace('/login');
                },
              },
            ]}
          />
        )}
      </Box>
    )}
  </Context.Consumer>
);

Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Header;
