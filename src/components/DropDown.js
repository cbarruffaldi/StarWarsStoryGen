import React, {Component} from 'react'
import {
    Select,
    MenuItem,
  } from '@material-ui/core';

  class DropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.data[0]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.onChange(this.state.selected)
    }
  
    handleChange = event => {
        let newValue = event.target.value
        this.setState({selected: newValue})
        this.props.onChange(newValue)
      };
   
    renderOptions() {
        const data = this.props.data;
        return data.map((item, idx) => {
          return (
              <MenuItem
                label="Select"
                value={item}
                key={idx}
                name={item}>{item}</MenuItem>
          );
        });
    }

    render() {
        return (
        <div className="">
           <Select className="" value={this.state.selected} onChange={this.handleChange} style={{ width: '100%'}} >
             {this.renderOptions()}
           </Select>
        </div>
        )
    }
  }

export default DropDown;