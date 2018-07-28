import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Markdown, Paragraph, RoutedButton, Text,
} from 'grommet';
import { Location } from 'grommet-icons';

import Loader from '../Loader';

const Property = ({ name, value }) => (
  <Box direction="row-responsive" gap="small">
    <Box basis="1/4">
      <Text>
        {name}
      </Text>
    </Box>
    <Text>
      <strong>
        {value}
      </strong>
    </Text>
  </Box>
);

Property.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Service = ({ match: { params: { id } } }) => (
  <Loader id={id}>
    {({ service }) => (
      <Box>
        {service.status === 'critical' && (
          <Box
            margin={{ top: 'medium' }}
            pad="medium"
            round="xsmall"
            border={{ color: 'status-critical', size: 'medium' }}
          >
            <Paragraph>
              {`Something is not right with ${service.name}`}
            </Paragraph>
          </Box>
        )}
        <Box
          direction="row"
          justify="between"
          align="center"
          gap="small"
        >
          <Heading>
            {service.name}
          </Heading>
          <RoutedButton
            label="Edit"
            path={`/service/edit/${id}`}
          />
        </Box>
        {service.notes && (
          <Box margin={{ bottom: 'large' }}>
            <Markdown>
              {service.notes}
            </Markdown>
          </Box>
        )}
        <Box
          gap="medium"
          margin={{ bottom: 'large' }}
        >
          <Property
            name="Status"
            value={service.status}
          />
          <Property
            name="Created"
            value={(new Date(service.created)).toLocaleDateString()}
          />
          {service.updated && (
            <Property
              name="Updated"
              value={(new Date(service.updated)).toLocaleDateString()}
            />
          )}
          <Property
            name="Template"
            value={service.template.name}
          />
        </Box>
        <Box alignSelf="start">
          <RoutedButton
            icon={<Location />}
            path={`/service/location/${id}`}
            hoverIndicator
          />
        </Box>
      </Box>
    )}
  </Loader>
);

Service.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Service;
