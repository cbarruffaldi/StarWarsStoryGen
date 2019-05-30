import React, {Component} from 'react'
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Background from '../images/star_sky.jpg';

import 'typeface-roboto';

class Story extends Component {

    createStory() {
        const title= this.props.title 
        const description=this.props.description
        const characters=this.props.characters
        const planets=this.props.planets
        const vehicles=this.props.vehicles    
        const {classes} = this.props;

        
        let story = this.generateStory(characters, planets, vehicles)

        return (
                <Paper className={classes.root}>
                    <Typography className={classes.title} variant="h3" gutterBottom>
                    {title}
                    </Typography>
                    <Typography className={classes.subtitle} variant="h5" gutterBottom>
                    {description}
                    </Typography>
                    <Typography className={classes.body}variant="h6" gutterBottom>
                    {story}
                    </Typography>
                </Paper>
        )

    }

    generateStory(characters, planets, vehicles) {
        switch(characters.length) {
            case 1: 
                return this.createOneCharacterStory(characters, planets, vehicles);
            case 2:
                return this.createTwoCharacterStory(characters, planets, vehicles);
            case 3:
                return this.createThreeCharacterStory(characters, planets, vehicles);
            default:
                return "";
        }
    }


    createOneCharacterStory(characters, planets, vehicles) {
        let character = characters[0].name
        if(planets.length === 1)
            return character + " was in a journey " + this.createOnePlanetStory(planets) + this.createVehicleStory(vehicles) + " to become the best Jedi ever."
        if(planets.length === 2)
            return character + " was travelling " + this.createTwoPlanetStory(planets) + this.createVehicleStory(vehicles) + " to help his friends in an epic fight"
        return ""
    }

    createTwoCharacterStory(characters, planets, vehicles) {
        let character1 = characters[0].name
        let character2 = characters[1].name

        if(planets.length === 1)
            return character1 + " and " + character2 + " where in a journey " + this.createOnePlanetStory(planets) + this.createVehicleStory(vehicles) + " to find out the guilty person of the crime."
        if(planets.length === 2)
            return character1 + " flew " + this.createTwoPlanetStory(planets) + this.createVehicleStory(vehicles) + " to fight alongside " + character2

        return ""
    }

    createThreeCharacterStory(characters, planets, vehicles) {
        let character1 = characters[0].name
        let character2 = characters[1].name
        let character3 = characters[2].name

        if(planets.length === 1)
            return character1 + " went with " + character2 + this.createOnePlanetStory(planets) + this.createVehicleStory(vehicles) + " where they found " + character3 + " dead."
        if(planets.length === 2)
            return character2 + " went with " + character3 + this.createOnePlanetStory(planets) + this.createVehicleStory(vehicles) + " where they found " + character1 + " dead."
        
    }

    createOnePlanetStory(planets) {
        let planet = planets[0].name
        return " to " + planet

    }

    createTwoPlanetStory(planets) {
        let planet1 = planets[0].name
        let planet2 = planets[1].name

        return " from " + planet1 + " to " + planet2
    }

    createVehicleStory(vehicles) {
        if(vehicles.length === 0) 
            return ""

        let vehicle = vehicles[0].name
        return " on board of " + vehicle
    }

    render() {
        const showStory = this.props.showStory
        return (
        <Grid item xs={12}>
            { showStory ?
             this.createStory()
            : 
            ""
            }
       </Grid>
        )
    }

}

const StoryStyles = theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        minWidth: 500,
        background: `url(${Background})`,
    },
    title: {
        color: '#ffd700'
    },
    subtitle: {
        color: 'white',
    },

    body: {
        color: '#ffd700',
    }
})

Story.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(StoryStyles)(Story);