import PropTypes from 'prop-types';
import React from 'react';
import PayRollLoader from '../PayRollLoader';

/**
 * PayrollTableLoader component to conditionally display a loader.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - Indicates if the loader should be displayed.
 * @param {React.ReactNode} props.children - The content to display when not loading.
 * @param {boolean} props.showLoader - Determines if the loader component should be rendered.
 * @returns {React.ReactNode} The rendered PayrollTableLoader component.
 */
function PayrollTableLoader(props) {
  const { isLoading, children, showLoader } = props;

  if (showLoader) {
    return <PayRollLoader isLoading={isLoading}>{children}</PayRollLoader>;
  }

  return children;
}

PayrollTableLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  showLoader: PropTypes.bool.isRequired,
};

export default PayrollTableLoader;
