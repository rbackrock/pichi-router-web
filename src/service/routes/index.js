import { axios } from '@http';
import * as egressesService from '@service/egresses';
import * as rulesService from '@service/rules';

export const getRoutesList = () => {
  return new Promise((resolve, reject) => {
    Promise.all([egressesService.getEgressesList(), rulesService.getRulesList(), axios.get('/route')]).then(result => {
      const egressesList = ['direct'].concat(result[0].map(egress => egress.name)); // 得到目前所有的 egress 的名称
      const rulesList = result[1].map(rule => rule.name); // 得到目前所有的 rules 的名称
      const routeData = result[2].data;
      const defaultEgress = routeData['default'];

      // 根据需要把源数据变成合适的结构
      const routesList = routeData['rules'].map(item => ({
        rule: item[0],
        egress: item[1]
      }));

      resolve({egressesList, rulesList, defaultEgress, routesList});
    }, error => reject(error));
  });
};

export const saveRoutes = (defaultEgress, routesList) => {
  const data = {};
  data['default'] = defaultEgress;
  data['rules'] = routesList.map(item => [item.rule, item.egress]);

  return axios.put('/route', data);
};
