import { createBrowserHistory } from 'history';
import { DOMAIN_NAME } from '../containers/App/routes/sitemap';

const history = createBrowserHistory({
  basename: DOMAIN_NAME,
});
export default history;
