import axios from 'axios'
import { storage } from '@common/utils';

axios.get(process.env.PUBLIC_URL + '/network.json').then(rsp => {
  const {
    protocol,
    host,
    port,
    path
  } = rsp.data;
  storage.session.set('baseUrl', `${protocol}://${host}${port ? ':' + port : ''}${path}`);
});