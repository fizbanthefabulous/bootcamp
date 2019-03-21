import React, {Component} from 'react';
import './TimeForm.css';

class TimeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          project: 'personal',
          description: '',
          minutes: -1,

          validDescription: false,
          validTime: false,
          canAdd: false,

          addTask: props.addTask,
        }
    }


    //Validates input fields
    validate = (props) => {
      var validDescription = false;
      var validTime = false;
      var canAdd = false;

      validDescription = this.state.description.length >= 5 ? true : false;
      validTime = this.state.minutes >= 0 && this.state.minutes <= 240 && this.state.minutes !== '' ? true : false;
      canAdd = validDescription && validTime ? true : false;

      console.log(validDescription);

      this.setState({
        validDescription,
        validTime,
        canAdd,
      })
    }


    //Updates form state
    handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      }, this.validate)
    }


    //Adds a task to the app task lists
    addTask = (props) => {
      //console.log("Adding Task");
      props.preventDefault();
      this.state.addTask({project: this.state.project, description: this.state.description, minutes: parseInt(this.state.minutes)})

      //console.log(props.target);

      //Resets the form fields
      props.target.reset();

      //Reset state
      this.setState({
        project: 'personal',
          description: '',
          minutes: -1,

          validDescription: false,
          validTime: false,
          canAdd: false,
      })
    }
  

    render() {
    console.log(this.state);

    return (
      <form id="timeForm" onSubmit={this.addTask}>
        <div id="formGrid">
          <label htmlFor="project">Project</label>
          <select name="project" id="project" onChange={this.handleChange}>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
          <br />{/*This is for holding space in the grid */}

          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" onChange={this.handleChange}/>
          {!this.state.validDescription ? <span className="validationMessage">A description must have at least 5 characters</span> : <span></span>}

          <label htmlFor="minutes">Minutes</label>
          <input type="text" name="minutes" id="minutes"  onChange={this.handleChange}/>
          {!this.state.validTime ? <span className="validationMessage">Must be a time span between 0 and 240 minutes</span> : <span></span>}

          <button type="submit" name="add" id="add" disabled={!this.state.canAdd}>Add</button>
        </div>
      </form>
    );
  }
}

export default TimeForm;