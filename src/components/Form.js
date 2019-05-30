import React, {Component} from 'react'
import axios from 'axios' 
import Grid from '@material-ui/core/Grid';
import Selector from './Selector';
import Story from './Story'
import StoryTitle from './StoryTitle'
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';



const API = 'https://swapi.co/api/';
const CHARACTERS_QUERY = 'people';
const PLANETS_QUERY = 'planets';
const VEHICLES_QUERY = 'vehicles'


class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        description: "",
        characters: [],
        planets: [],
        vehicles: [],
        generateStory: false,        
      };

      this.getAllCharacters = this.getAllCharacters.bind(this)
      this.getAllPlanets = this.getAllPlanets.bind(this)
      this.getAllVehicles = this.getAllVehicles.bind(this)
      this.handleCharactersChange = this.handleCharactersChange.bind(this)
      this.handlePlanetsChange = this.handlePlanetsChange.bind(this)
      this.handleVehiclesChange = this.handleVehiclesChange.bind(this)


    }

    componentDidMount() {
        this.getAllCharacters()
        this.getAllPlanets()
        this.getAllVehicles()
    }

    getAllCharacters() {
        axios.get(API + CHARACTERS_QUERY)
          .then(response => {
              this.setState({
                  all_characters: response.data.results.map(({name}) => name)
                  })})
          .catch(error => {
            console.log(error);
        });

    }

    getAllPlanets() {
        axios.get(API + PLANETS_QUERY)
          .then(response => {
              this.setState({
                  all_planets: response.data.results.map(({name}) => name)
                  })})

    }

    getAllVehicles() {
        axios.get(API + VEHICLES_QUERY)
          .then(response => {
              this.setState({
                  all_vehicles: response.data.results.map(({name}) => name)
                  })})
    }

    handleTitleChange = child_value => {
        this.setState({ title: child_value,
                        generateStory: false
                    });
    };

    handleDescriptionChange = child_value => {
        this.setState({ description: child_value,
                        generateStory: false
                      })
    }

    handleCharactersChange = child_value => {
        this.setState({ characters: child_value,
                        generateStory: false
                    })
    }

    handlePlanetsChange = child_value =>  {
        this.setState({ planets: child_value,
                        generateStory: false
                    })
    }

    handleVehiclesChange = child_value =>  {
        this.setState({ vehicles: child_value,
                        generateStory: false })
    }
    
    handleSubmit = evt => {
        if (this.checkRequiredInfo())
            this.setState({generateStory: true})
    
    };

    checkRequiredInfo() {
        return !this.checkButton()

    }

    checkButton () {
        if(this.state.description.length !== 0 && this.state.title.length !== 0 
            && this.state.characters.length !== 0 && this.state.planets.length !== 0)
            return false
        
        return true
    }


    render() {
        const all_characters = this.state.all_characters
        const all_planets = this.state.all_planets
        const all_vehicles = this.state.all_vehicles
        const {classes} = this.props;
    return (
        <div className={classes.fullContainer}>
        <Grid container className={classes.inputText}spacing={2} align="center">
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Choose a wise title for your story
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <StoryTitle value={this.state.title} onChange={this.handleTitleChange} placeholder={"Title for your story"}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Add a description about it
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <StoryTitle value={this.state.description} onChange={this.handleDescriptionChange} placeholder={"Brief description for your story"}/>
            </Grid>
        </Grid>
        <Grid container spacing={2} align="center">
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Choose some information for your plot
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <Selector data={all_characters} max={3} title={"Character"} extra={"*"} onChange={this.handleCharactersChange }></Selector>
                </Paper>
            </Grid>
            
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <Selector data={all_planets} max={2} title={"Planet"} extra={"*"} onChange={this.handlePlanetsChange}></Selector>
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <Selector data={all_vehicles} max={1} title={"Vehicle"} extra={"(optional)"} onChange={this.handleVehiclesChange}></Selector>
                </Paper>
            </Grid>
        </Grid>
        <Grid container spacing={2} align="center">
            <Grid item xs={12}>
            <Button
                style={{backgroundColor: '#ffd700', marginBottom: 25}}
                onClick={this.handleSubmit}
                className="small"
                disabled={this.checkButton()}
                >
                <Typography>May the force be with you...</Typography>
                </Button>
            </Grid>
            
        </Grid>
        <Grid container spacing={2} align="center">
            <Story title={this.state.title} description={this.state.description} characters={this.state.characters}
            planets={this.state.planets} vehicles={this.state.vehicles} showStory={this.state.generateStory}></Story>
        </Grid>

        </div>
    );
    }
}

const FormStyles = theme => ({
    questions: {
        width: '80%'
    },

    fullContainer: {
        paddingRight: 50,
        paddingLeft: 50
    },

    inputText: {
        marginBottom: 20
    },

    paper: {
        padding: 20
    },
  })


export default withStyles(FormStyles)(Form);