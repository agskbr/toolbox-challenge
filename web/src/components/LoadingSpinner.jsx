import { Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const LoadingSpinner = ({ size, variant = 'primary', className = '' }) => (
  <div
    className={`d-flex justify-content-center align-items-center ${className}`}
    style={{ minHeight: size === 'sm' ? 'auto' : '300px' }}
  >
    <Spinner
      animation='border'
      role='status'
      variant={variant}
      size={size}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  </div>
)

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string
}
