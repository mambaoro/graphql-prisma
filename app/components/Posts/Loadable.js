/**
 *
 * Asynchronously loads the component for Posts
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
