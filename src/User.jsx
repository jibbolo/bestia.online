import React, { Component } from 'react';

class User extends Component {

    constructor(props){
      super(props);
      this.handleLose = this.handleLose.bind(this);
      this.handleWin = this.handleWin.bind(this);
    }
      
    handleLose(e){
        const newState = (this.props.player.state === "lose") ? "": "lose";
        this.props.onWinLose(this.props.player, newState);
    }
    
    handleWin(e){
        const newState = (this.props.player.state === "win") ? "": "win";
        this.props.onWinLose(this.props.player, newState);
    }

    render(){
        return (
            <div className="user">
                {this.props.player.name} - &nbsp;
                {this.props.player.amount} - &nbsp;
                {this.props.player.hand} &nbsp;
                <button 
                    className={this.props.player.state === 'win' ? 'green':''} 
                    onClick={this.handleWin}>Win</button>
                <button 
                    className={this.props.player.state === 'lose' ? 'red':''} 
                    onClick={this.handleLose}>Lose</button>
            </div>
        );
    }  
  
}
export default User;