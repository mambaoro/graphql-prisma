/**
 *
 * Recaptcha
 *
 */

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Recaptcha() {
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        theme="dark"
        onChange={data => console.log(data)}
      />
    </div>
  );
}

Recaptcha.propTypes = {};

export default Recaptcha;
