import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Header, Form, Grid, Input } from 'semantic-ui-react';

 window.$geolat = "long";
 window.$geolong = "lat";
 window.$attend = "yn";
 window.$classi = "ppc";
 window.$prio = "star";
 

class Calendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  radiosetter(event){
    //window.$attend = event.target.value;
    //window.$classi = event.target.value;
    console.log(event.target.value)
    switch (event.target.value) {
      case "TRUE":
        window.$attend = event.target.value
        break;
      case "FALSE":
        window.$attend = event.target.value
        break;
      case "Public":
        window.$classi = event.target.value
        break;
      case "Private":
        window.$classi = event.target.value
        break;
      case "Confidential":
        window.$classi = event.target.value
        break;
      case  "3":
        window.$prio = event.target.value
        break;
      case  "2":
        window.$prio = event.target.value
        break;
      case  "1":
        window.$prio = event.target.value
        break;
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
        window.$geolat = position.coords.latitude;
        window.$geolong = position.coords.longitude;
    });
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  downloadIcsFile = () => {
    const element = document.createElement("a");

    if (document.getElementById('beginDate').value === document.getElementById('endDate').value){
      if (document.getElementById('endTime').value < document.getElementById('beginTime').value){
        alert("Invalid Time Range");
        return;
      }
    }

    let text =  'BEGIN:VCALENDAR\n' +
        'PRODID:-//Team Braille Book//Calendar Assignment//EN' + '\n' +
        'CALSCALE:GREGORIAN\n' +
        'VERSION:2.0\n' +
        'BEGIN:VEVENT\n' +
        'DTSTART:' + document.getElementById('beginDate').value.replace(/-/g, '') + 'T' +
                    document.getElementById('beginTime').value.replace(/:/g, '') + '00\n' +
        'DTEND:' + document.getElementById('endDate').value.replace(/-/g, '') + 'T' +
                    document.getElementById('endTime').value.replace(/:/g, '') + '00\n' +
        'DTSTAMP:20200630T051242Z\n' +
        'UID:'+ (Math.floor(100000 + Math.random() * 900000)) + '0-E749-430B-8CAF-0E4F40551615\n' +
        'LAST-MODIFIED:20200630T051241Z\n' +
        'GEO:' + window.$geolat + ';' + window.$geolong + '\n' +
        'LOCATION:' + document.getElementById('loc').value + '\n' +
        'CLASS:' + window.$classi + '\n' +
        'PRIORITY:' + window.$prio + '\n' +
        'ATTENDEE:' + window.$attend + '\n' +
        'SUMMARY:' + document.getElementById('summ').value + '\n' +
        'END:VEVENT\n' +
        'END:VCALENDAR\n'


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
            <label>Priority of Event</label>
            <div className="field">
              <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                <input type="radio" value = "3" name="example2"/>
                <label>Low</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                <input type="radio" value = "2" name="example2"/>
                <label>Medium</label>
              </div>
            </div>
                <div className="field">
                  <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                    <input type="radio" value = "1" name="example2"/>
                    <label>High</label>
                  </div>
                </div>
              </div>
            </div>
      </Form>
       <Form>
         <div className="ui form">
           <div className="groupedfields">
             <label>Would you like to RSVP?</label>
             <div className="field">
               <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                 <input type="radio" value = "FALSE" name="example2"/>
                   <label>Yes</label>
               </div>
             </div>
             <div className="field">
               <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                 <input type="radio" value = "TRUE" name="example2"/>
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
               <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                 <input type="radio" value = "Public" name="example3"/>
                 <label>Public</label>
               </div>
             </div>
             <div className="field">
               <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                 <input type="radio" value = "Private" name="example3"/>
                 <label>Private</label>
               </div>
             </div>
             <div className="field">
               <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                 <input type="radio" value = "Confidential" name="example3"/>
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