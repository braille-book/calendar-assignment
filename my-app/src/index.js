import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Header, Form, Grid, Input,} from 'semantic-ui-react';

// Global Variables
 window.$geolat = "long";
 window.$geolong = "lat";
 window.$attend = "yn";
 window.$classi = "ppc";
 window.$prio = "star";
 window.$reoccur = "reocu";
 window.$freq = "freq";
 

class Calendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

// Radio function to record radio values selected on the Form with switch cases - Michael Johnson
  radiosetter(event){
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
      case "reTRUE":
        window.$reoccur = true
        break;
      case "reFALSE":
        window.$reoccur = false
        break;
    }
  }
 // Function to find Geo Location - Micahel Johnson
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
        window.$geolat = position.coords.latitude;
        window.$geolong = position.coords.longitude;
    });
  }

 // Function to change the state - ER
  handleChange(event) {
    this.setState({value: event.target.value});
  }
// Function to put together the ICS File with exceptions - Michael Johnson
  downloadIcsFile = () => {
    const element = document.createElement("a");
    let tz = new Intl.DateTimeFormat().resolvedOptions().timeZone
    let recur = "";
   // Check the validation condition and provide feedback - ER
    if (document.getElementById('loc').value <= 0){
      alert("Need a Location")
      return;
    }
    if (document.getElementById('summ').value <= 0){
      alert("Need Description of the Event")
      return;
    }
    if (document.getElementById('guest').value <= 0){
      alert("Need a Guest Email")
      return;
    }
    if (document.getElementById('email').value <= 0){
      alert("Need your Email")
      return;
    }
    if (window.$prio === 'star'){
      alert("Need to establish Priority")
      return;
    }
    if (window.$classi === 'ppc'){
      alert("Need to establish Classification")
      return;
    }
    if (window.$attend === 'yn'){
      alert("Need to establish RSVP")
      return;
    }
    if (window.$reoccur === 'reocu'){
      alert("Need to establish if the Event is reoccurring")
      return;
    }
    if (document.getElementById('beginDate').value === document.getElementById('endDate').value){
      if (document.getElementById('endTime').value < document.getElementById('beginTime').value){
        alert("Invalid Time Range");
        return;
      }
    }

   // Take care of frequency - ER
    if (window.$reoccur === true){
        if (document.getElementById('againm').value) {
          recur = "RRULE:FREQ=MONTHLY;BYMONTHDAY=" + document.getElementById('again').value + ";BYMONTH=" + document.getElementById('againm').value.replace(/\s/g,'') + '\r\n';

        } else if (document.getElementById('again').value != null) {
        recur = "RRULE:FREQ=MONTHLY;BYMONTHDAY=" + document.getElementById('again').value + '\r\n';
      }
    }
// The template and creation of the ICS file - Michael Johnson/Eric Rivera
    let text =  'BEGIN:VCALENDAR\r\n' +
        'VERSION:2.0\r\n' +
        'PRODID:-//Team Braille Book//Calendar Assignment//EN\r\n' +
        'CALSCALE:GREGORIAN\r\n' +
        'BEGIN:VEVENT\r\n' +
        // Normalize the times - ER
        'DTSTART:' + document.getElementById('beginDate').value.replace(/-/g, '') + 'T' +
                    document.getElementById('beginTime').value.replace(/:/g, '') + '00\r\n' +
        'DTEND:' + document.getElementById('endDate').value.replace(/-/g, '') + 'T' +
                    document.getElementById('endTime').value.replace(/:/g, '') + '00\r\n' +
         recur +
        'TZID:' + tz + '\r\n' +
        'DTSTAMP:20200630T051242Z\r\n' +
        // Generate pseudo UID - ER
        'UID:'+ (Math.floor(100000 + Math.random() * 900000)) + '0-E749-430B-8CAF-0E4F40551615\r\n' +
        'LAST-MODIFIED:20200630T051241Z\r\n' +
        'GEO:' + window.$geolat + ';' + window.$geolong + '\r\n' +
        'LOCATION:' + document.getElementById('loc').value + '\r\n' +
        'RESOURCES:' + document.getElementById('items').value + '\r\n' +
        'CLASS:' + window.$classi + '\r\n' +
        'PRIORITY:' + window.$prio + '\r\n' +
        'ATTENDEE:' + window.$attend + '\r\n' +
        'SUMMARY:' + document.getElementById('summ').value + '\r\n' +
        'ORGANIZER;SENT-BY="' + document.getElementById('email').value + '":mailto:' + document.getElementById( 'guest').value + '\r\n' +
        'END:VEVENT\r\n' +
        'END:VCALENDAR\r\n'

// Creation of the ICS file and download response - Michael Johnson
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myEvent.ics";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }


// Rendering of the Form itself - Michael Johnson
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
      <label>Please list the items you're going to bring</label>
      <input id='items' placeholder="e.g shoes,basketball,phone,etc"/>
      </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Invite any Guest to The Event</label>
    <input id='guest' placeholder="Please Enter the Guest Email" />
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
        <label>Please enter your Email</label>
        <div class="ui input"><input id='email' placeholder="e.g joe@schmoe.com" /></div>
        </div>
    </Form>
         <Form>
           <div className="ui form">
             <div className="groupedfields">
               <label>Would you like this Event to be reoccurring? </label>
               <div className="field">
                 <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                   <input type="radio" value = "reTRUE" name="example2"/>
                   <label>Yes</label>
                 </div>
               </div>
               <div className="field">
                 <div className="ui radio checkbox" onChange={this.radiosetter.bind(this)}>
                   <input type="radio" value = "reFALSE" name="example2"/>
                   <label>No</label>
                 </div>
               </div>
             </div>
           </div>
         </Form>
         <Form class="ui form">
           <div class="field">
             <label>Please Enter a Day For the Event to ReOccur</label>
             <input id='again' placeholder="Please Enter a number between 1-31" />
           </div>
         </Form>
         <Form class="ui form">
           <div class="field">
             <label>Which Months You would like this event to occur on "Leave blank if you want every month"</label>
             <input id='againm' placeholder="Please Enter Months Numbers Seperated by commas" />
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
