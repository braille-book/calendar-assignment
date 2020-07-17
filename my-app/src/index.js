import React from 'react';
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Header,Form,Grid } from 'semantic-ui-react';

class Calendar extends React.Component {
  state = {
    startDate: new Date(),

  };

  onChangeB = time1 => this.setState({ time1 })
  onChangeE = time2 => this.setState({ time2 })

  beginDate = date1 => {
    this.setState({
      startDate: date1
    });
  };

  endDate = date2 => {
    this.setState({
      endDate: date2
    });
  };

  render() {
    return (
        <Container textAlign="left">
          <Header as='h1' textAlign="center" text="bold">Please This Form Out For Your Event!</Header>
     <Grid>
     <Grid.Row left>
       <Grid.Column width={12}>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Start Date For Event</label>
          <DatePicker
              selected={this.state.startDate}
              onChange={this.beginDate}
          />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Start Time For Event</label>
          <TimePicker
              onChange={this.onChangeB}
              value={this.state.time1}
          />
    </div>
    </Form>
         <Form class="ui form">
           <div class="field">
             <label>Please Enter End Date For Event</label>
             <DatePicker
                 selected={this.state.endDate}
                 onChange={this.endDate}
             />
           </div>
         </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter End Time For Event</label>
          <TimePicker
              onChange={this.onChangeE}
              value={this.state.time2}
          />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Description For Event</label>
    <input placeholder="Please Enter the Description For Event" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Location For Event</label>
    <input placeholder="Please Enter the Location For Event" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Invite any Guest to The Event</label>
    <input placeholder="Please Enter the Guest Email" />
    </div>
    </Form>
    <Form class="ui success form">
        <div class="field">
        <label>Email</label>
        <div class="ui input"><input type="text" placeholder="joe@schmoe.com" /></div>
        </div>
    <button class="ui button">Submit</button>
        </Form>
       </Grid.Column>
     </Grid.Row>
     </Grid>

    </Container>
  );
  }
}

ReactDOM.render(<Calendar/>, document.getElementById('root'));