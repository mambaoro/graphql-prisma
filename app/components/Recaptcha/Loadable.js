/**
 *
 * Asynchronously loads the component for Recaptcha
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
