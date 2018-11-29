import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled, { css } from "styled-components";
import { Button, ButtonGroup } from "reactstrap";

const possibilities = [
  ["rock",]
]

const hands = ["Rock", "Scissors", "Paper"]
const INITIAL_STATE = {
  points: {
    Robot: 0,
    You: 0,
  },
  winner: null,
  you: null,
  robot: null,
  rounds: []
};

class App extends Component {
  state = INITIAL_STATE;
  play(you) {
    const robot = hands[Math.floor(Math.random() * 3)];
    this.result(you, robot);
  }
  result(you, robot) {
    const { rounds, points } = this.state;
    
    //round
    const round = `${you}-${robot}`;
    rounds.push(round);

    //winner
    let winner = null;
    if (robot === you) winner = "Empate";
    else if ("Paper-Rock Rock-Scissors Scissors-Paper".includes(round)) winner = "You";
         else winner = "Robot";

    //points
    points[winner] = ++points[winner];

    this.setState({ winner, you, robot, rounds, points });
  }

  render() {
    const { points, winner, robot, you, rounds } = this.state;

    return <div className="App">
        <header className="App-header">
          <h2>{winner}</h2>

          <div style={{ color: "yellow" }}>
            <User>
              <i className="fa fa-robot" />
            </User>
            <ButtonGroup disabled size="lg">
              <Button color="warning" outline={robot !== "Rock"}>
                <i className="fa fa-hand-rock" />
              </Button>
              <Button color="warning" outline={robot !== "Paper"}>
                <i className="fa fa-hand-paper" />
              </Button>
              <Button color="warning" outline={robot !== "Scissors"}>
                <i className="fa fa-hand-scissors" />
              </Button>
            </ButtonGroup>
          </div>
          <h1>{`${points.Robot}:${points.You}`}</h1>
          <div style={{ color: "red" }}>
            <ButtonGroup size="lg">
              <Button color="warning" outline={you !== "Rock"} onClick={() => this.play("Rock")}>
                <i className="fa fa-hand-rock" />
              </Button>
              <Button color="warning" outline={you !== "Paper"} onClick={() => this.play("Paper")}>
                <i className="fa fa-hand-paper" />
              </Button>
              <Button color="warning" outline={you !== "Scissors"} onClick={() => this.play("Scissors")}>
                <i className="fa fa-hand-scissors" />
              </Button>
            </ButtonGroup>
            <User>
              <i className="fa fa-user" />
            </User>
          </div>

          <ol>{rounds.map((round, index) => {
            return <li key={index}>{round.split("-").join(", ")}</li>
          })} </ol>
        </header>
      </div>;
  }
}

export default App;

const User = styled.div`
  font-size: 50px
`