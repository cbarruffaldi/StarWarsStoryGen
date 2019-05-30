import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import Logo from '../images/starwars_logo.png';
import 'typeface-roboto';



const NavBarStyles = theme => ({
    header: {
        height: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        height: 90,
        width: 160,
    },

  })

class NavBar extends Component {

    render() {
        const {classes} = this.props;
    
        return (
          <AppBar className={classes.header}position="static" elevation={0}>
            <img className={classes.logo} src={Logo} alt="Logo" />
          </AppBar>
        )
      }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(NavBarStyles)(NavBar);


