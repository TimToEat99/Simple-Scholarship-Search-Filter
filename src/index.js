import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {scholarships} from './scholarships.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


var updateschol = scholarships

function Scholarship(props){
    return (
      <li key={props["scholarship_name"]+props["deadline"]}>
        <div class="scholarship">
          <h1 class="sch">{props["scholarship_name"]}</h1>
          <div>
            <span class = "award">Award: ${props["award"]}</span>
            <a class="scholarship-apply" href = {props["scholarship_URL"]} > Apply </a>
          </div>
          <h3 class="deadline">{props["deadline"]}</h3>
        </div>
      </li>
    );
  }

const options1 = [
  'High School', 'College'
]

const defaultOption1 = options1[0]

const options2 = [
  'Male', 'Female'
]

const defaultOption2 = options2[0]

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scholList: scholarships,
      min: 0,
      max: 15000,
    };
  }

  doFilter(props) {
    let min = parseInt(props.min);
    let max = parseInt(props.max);

    let newScholList = scholarships.filter((s) => {
      debugger; return parseInt(s["award"]) <= max && min <= parseInt(s["award"]);
    })

    props.scholList = newScholList;

    this.setState(props);
  }

  render() {
    return (
      <div>
        <h1 class="title"> SCHOLARSHIPS </h1>
        <h2 class="welcome"> Welcome Student! </h2>
        <div class="sidebar">
          <h3>
            Grade Level
          </h3>
          <Dropdown options={options1} onChange={this._onSelect} value={defaultOption1} placeholder="Select an option" />
          <h3>
            Gender
          </h3>
          <Dropdown options={options2} onChange={this._onSelect} value={defaultOption2} placeholder="Select an option" />
          <h3>
            Award Range
          </h3>
          <input
            type = "number"
            value={this.state.min}
            onChange={value => {
              this.doFilter({ min: value.target.value, max:this.state.max, scholList: this.state.scholList});
            }}/>
          <span> to </span>
          <input
            type = "number"
            value={this.state.max}
            onChange={value => {
              this.doFilter({ max: value.target.value, min: this.state.min, scholList: this.state.scholList});
            }}/>
          </div>
          <div class="scholarships">
          <ul>
            {this.state.scholList.map(Scholarship)}
          </ul>
          </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  (<div>
    <Range/>
  </div>),
  document.getElementById('root')
);
