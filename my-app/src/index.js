import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Header, Form, Grid, Input } from 'semantic-ui-react';


class Calendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  downloadIcsFile = () => {
    const element = document.createElement("a");

    let text =  'BEGIN:VCALENDAR\n' +
        'CALSCALE:GREGORIAN\n' +
        'BEGIN:VEVENT\n' +
        'DTSTART:' + document.getElementById('beginDate').value.replace(/-/g, '') + 'T' +
                    document.getElementById('beginTime').value.replace(/:/g, '') + '00\n' +
        'DTEND:' + document.getElementById('endDate').value.replace(/-/g, '') + 'T' +
                    document.getElementById('endTime').value.replace(/:/g, '') + '00\n' +
        'DTSTAMP:20200630T051242Z\n' +
        'UID:'+ (Math.floor(100000 + Math.random() * 900000)) + '0-E749-430B-8CAF-0E4F40551615\n' +
        'CREATED:1212312T213424234\n' +
        'LAST-MODIFIED:20200630T051241Z\n' +
        'LOCATION:' + document.getElementById('loc').value + '\n' +
        'SUMMARY:' + document.getElementById('summ').value + '\n' +
        'END:EVENT\n' +
        'END:CALENDAR\n'


    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myEvent.ics";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }



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
          <Input id='beginDate' type='date' onChange={this.handleChange} onkeydown="return false" placeholder="e.g     MM/DD/YYYY" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Start Time For Event</label>
          <Input id='beginTime' type='time' placeholder="e.g    HH:MM" />
    </div>
    </Form>
         <Form class="ui form">
           <div class="field">
             <label>Please Enter End Date For Event</label>
             <input id='endDate' type='date' min={this.state.value} onkeydown="return false" placeholder="e.g     MM/DD/YYYY" />
           </div>
         </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter End Time For Event</label>
          <Input id='endTime' type='time' labelPosition='right' placeholder="e.g    HH:MM" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Description For Event</label>
    <input id='summ' placeholder="Please Enter the Description For the Event" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Location For Event</label>
    <input id={'loc'} placeholder="Please Enter the Location For the Event" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Invite any Guest to The Event</label>
    <input placeholder="Please Enter the Guest Email" />
    </div>
    </Form>
       <Form>
         <div className="ui form">
           <div className="groupedfields">
             <label>Would you like to RSVP?</label>
             <div className="field">
               <div className="ui radio checkbox">
                 <input type="radio" name="example2" checked="checked"/>
                   <label>Yes</label>
               </div>
             </div>
             <div className="field">
               <div className="ui radio checkbox">
                 <input type="radio" name="example2"/>
                   <label>No</label>
               </div>
             </div>
           </div>
         </div>
       </Form>
         <Form>
         <div className="ui form">
           <div className="groupedfields">
             <label>Would you like to make this Event Public, Private, or Confidential?</label>
             <div className="field">
               <div className="ui radio checkbox">
                 <input type="radio" name="example3" checked="checked"/>
                 <label>Public</label>
               </div>
             </div>
             <div className="field">
               <div className="ui radio checkbox">
                 <input type="radio" name="example3"/>
                 <label>Private</label>
               </div>
             </div>
             <div className="field">
               <div className="ui radio checkbox">
                 <input type="radio" name="example3" checked="checked"/>
                 <label>Confidential</label>
               </div>
             </div>
           </div>
         </div>
         </Form>
    <Form class="ui success form">
        <div class="field">
        <label>Email</label>
        <div class="ui input"><input type="text" placeholder="e.g joe@schmoe.com" /></div>
        </div>
    </Form>
      <div id='submit' class='buttons'>
    <button class="ui button" onClick={this.downloadIcsFile}>Submit</button>
      </div>

       </Grid.Column>
     </Grid.Row>
     </Grid>

    </Container>
  );
  }
}

ReactDOM.render(<Calendar/>, document.getElementById('root'));