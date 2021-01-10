import React from 'react';
import PropTypes from 'prop-types';

class Drawer  extends React.Component {

    render () {


        return (
            <div style={{
                position: 'absolute', left: '50%', top: '65%',
                transform: 'translate(-50%, -50%)'
            }}>
            </div>
          );
        }
 }

    Drawer.propTypes = {
      classes: PropTypes.object.isRequired,
   };
  
   export default (Drawer);