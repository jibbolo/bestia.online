import React, { Component } from 'react';
import User from './User';
import './App.css';

const COIN = 10;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount:0,
      players: [
        {id: 1, name: "Giacomo", hand:0, amount:0, state:""},
        {id: 2, name: "Giorgio", hand:0, amount:0, state:""},
        {id: 3, name: "Rob",     hand:0, amount:0, state:""},
        {id: 4, name: "Silvia",  hand:0, amount:0, state:""},
        {id: 5, name: "Giovanni",hand:0, amount:0, state:""},
        {id: 6, name: "Carlo",   hand:0, amount:0, state:""}
      ]
    };
    this.changeWinners = this.changeWinners.bind(this);
    this.calcAmounts = this.calcAmounts.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.initPool = this.initPool.bind(this);
  }

  playersCount(){
    let totWinners = 0;
    let totLosers = 0;
    this.state.players.forEach(player => {
      if (player.state==="win"){
        totWinners+=1;
      }
      if (player.state==="lose"){
        totLosers+=1;
      }
    });
    return {totWinners:totWinners,totLosers:totLosers};
  }

  changeWinners(player, newState){
    const players = this.state.players.map((p) => {
      if(p.id!==player.id) { 
        return p; 
      } else {
        return updatedPlayer(p, p.hand, p.amount, newState);
      }
    });
    this.setState({players: players}, this.calcAmounts);
  }

  calcAmounts(){
    const totWinners = this.playersCount().totWinners;
    const players = this.state.players.map((p) => {
      let hand = 0;
      if (p.state==="win") {hand=this.state.amount / totWinners;}
      if (p.state==="lose") {hand=-this.state.amount;}
      return updatedPlayer(p, hand, p.amount, p.state);
    });
    this.setState({players: players});
  }

  initPool(){
    const totPlayers = this.state.players.length;
    const players = this.state.players.map((p) => {
      return updatedPlayer(p, 0, p.amount-COIN, p.state);
    });
    this.setState({
      players: players,
      amount: totPlayers * COIN
    });
  }

  handleNext(){
    if (this.state.amount === 0) {
      this.initPool();
      return;
    }

    const playersCount = this.playersCount();
    console.log(playersCount);
    const bestiaCount = playersCount.totLosers;
    let newAmount = bestiaCount*this.state.amount;
    if(playersCount.totWinners>0) {
      newAmount-=this.state.amount;
    }

    const players = this.state.players.map((p) => {
      return updatedPlayer(p, 0, p.amount+p.hand, "");
    });

    this.setState((prevState)=>({
      amount: prevState.amount + newAmount,
      players: players
    }));
  }

  render() {
    return (
      <div className="App">
        Piatto: {this.state.amount}, winners: {this.playersCount().totWinners}, losers: {this.playersCount().totLosers}
        <hr/>
        {this.state.players.map((player) =>
          <User key={player.id} 
            player={player} 
            onWinLose={this.changeWinners} />
        )}
        <button onClick={this.handleNext}>Next</button>
      </div>
    );
  }
}

function updatedPlayer(prev,newHand,newAmount,newState) {
  return {
    id: prev.id,
    name: prev.name,
    hand: newHand,
    amount: newAmount,
    state: newState
  };
}


export default App;
