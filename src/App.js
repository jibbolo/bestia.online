import React, { Component } from 'react';
import './App.css';



class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount:0,
      stato:"",
    };
    this.handlePaga = this.handlePaga.bind(this);
    this.handleVince = this.handleVince.bind(this);
  }
  componentWillReceiveProps(nextProps) {
        // if(JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)) // Check if it's a new user, you can also use some unique, like the ID
        // {
        //       this.updateUser();
        // }
        console.log(nextProps);
    } 

  handlePaga(e){
    let piatto = this.props.piatto;
    if (this.state.stato === "paga") {
      this.setState((prevState) => ({
        amount: prevState.amount + piatto,
        stato: "",
      }));
      return;
    }

    if (this.state.stato === "vince") {
      piatto*=2;
      this.props.onWinLose(-1);
    }
    this.setState((prevState) => ({
      amount: prevState.amount - piatto,
      stato: "paga",
    }));
  }
  
  handleVince(e){
    let piatto = this.props.piatto;
    if (this.state.stato === "vince") {
      this.setState((prevState) => ({
        amount: prevState.amount - piatto,
        stato: "",
      }));
      this.props.onWinLose(-1);
      return;
    }

    if (this.state.stato === "paga") {
      piatto*=2;
    }
    this.setState((prevState) => ({
      amount: prevState.amount + piatto,
      stato: "vince",
    }));
    this.props.onWinLose(1);
  }

  render(){
    return (
      <div>
        {this.props.name} - {this.state.amount}
        <button className={this.state.stato==='vince' ? 'green':''} onClick={this.handleVince}>Vince</button>
        <button className={this.state.stato==='paga' ? 'red':''} onClick={this.handlePaga}>Paga</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      orig:60,
      amount:60,
      winners:0
    };
    this.changeWinners = this.changeWinners.bind(this);
  }

  changeWinners(action){
    this.setState((prevState) => ({
      winners: prevState.winners+action,
    }),function(){
      if(this.state.winners>0){
        this.setState((prevState) => ({
          amount: prevState.orig / prevState.winners,
        }));
      } 
    });
  }


  render() {
    return (
      <div className="App">
        Piatto: {this.state.amount}, winners: {this.state.winners}
        <hr/>
        <User name="gianluca" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="giorgio" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="franco" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="marco" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="gianluca" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="giorgio" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="franco" onWinLose={this.changeWinners} piatto={this.state.amount}/>
        <User name="marco" onWinLose={this.changeWinners} piatto={this.state.amount}/>
      </div>
    );
  }
}

export default App;
