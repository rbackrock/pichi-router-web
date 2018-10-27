import React, { Fragment } from 'react';

const Home = (props) => {
  return (
    <Fragment>
      <div style={{ fontSize: '1.1rem' }}>
        <ul>
          <li><strong>Ingress</strong>: defines an incoming network adapter, containing protocol, listening address/port and protocol specific configurations.</li>
          <li><strong>Egress</strong>: defines an outgoing network adapter, containing protocol, next hop address/port and protocol specific configurations.</li>
          <li><strong>Rule</strong>: contains one egress name and a group of conditions, such as IP range, domain regular expression, the country of the destination IP, and so on, that the incoming connection matching ANY conditions would be forwarded to the specified egress.</li>
          <li><strong>Route</strong>: indicates a priority ordered rules, and a default egress which would be forwarded to if none of the rules matched.</li>
        </ul>
      </div>
      <h3>An Application Layer Proxy controlled via RESTful APIs <a href="https://github.com/pichi-router/pichi" target="_blank" rel="noopener noreferrer">https://github.com/pichi-router/pichi</a> </h3>
    </Fragment>
  )
};

export default Home;