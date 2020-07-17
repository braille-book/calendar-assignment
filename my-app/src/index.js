import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Header, Form, Grid, Dropdown, Input } from 'semantic-ui-react';

const ampm = [
  {key:'AM', text:'AM', value:'AM'},
  {key:'PM', text:'PM', value:'PM'},
]
class Calendar extends React.Component {

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
          <Input placeholder="e.g     MM/DD/YYYY" />

    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Start Time For Event</label>
          <Input label={<Dropdown defaultValue="AM" options={ampm}/>} labelPosition='right' placeholder="e.g    HH:MM" />
    </div>
    </Form>
         <Form class="ui form">
           <div class="field">
             <label>Please Enter End Date For Event</label>
             <input placeholder="e.g     MM/DD/YYYY" />
           </div>
         </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter End Time For Event</label>
          <Input label={<Dropdown defaultValue="AM" options={ampm}/>} labelPosition='right' placeholder="e.g    HH:MM" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Description For Event</label>
    <input placeholder="Please Enter the Description For the Event" />
    </div>
    </Form>
    <Form class="ui form">
        <div class="field">
        <label>Please Enter Location For Event</label>
    <input placeholder="Please Enter the Location For the Event" />
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
      <div class='buttons'>
    <button class="ui button">Submit</button>
      </div>

       </Grid.Column>
     </Grid.Row>
     </Grid>

    </Container>
  );
  }
}

ReactDOM.render(<Calendar/>, document.getElementById('root'));