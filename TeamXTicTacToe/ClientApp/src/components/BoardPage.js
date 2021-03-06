﻿import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Game } from './game/Game';
import { OnePlayer } from './logic/OnePlayer';
import { TwoPlayer } from './logic/TwoPlayer';
import { Tutorial } from './logic/Tutorial';
import Client from './Client';
import { OneNamePrompt } from './OneNamePrompt';
import { TwoNamePrompt } from './TwoNamePrompt';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Scoreboard from './Scoreboard';

export class BoardPage extends Component {
    static displayName = BoardPage.name;

    constructor(props) {
        super(props);
        this.state = {
            player1: {},
            player2: {},
            namePromptSeen: true,
            boardTheme: '1',
            p1Score: [0, 0, 0],
            p2Score: [0, 0, 0],
        }
    }

    componentDidMount() {
        console.log("mode:" + this.props.mode)
    }

    //change the board theme to a user specified one
    setBoardTheme = (a) => {
        this.setState({
            boardTheme: a
        });
    }

    toggleNamePrompt = () => {
        this.setState({
            namePromptSeen: !this.state.namePromptSeen
        });

    }

   

    updatePlayers = (result) => {
        console.log("updatePlayers:" + result);

        //make copy of state.player1
        let player1 = Object.assign({}, this.state.player1);
        let player2 = Object.assign({}, this.state.player2);

        let p1Score = this.state.p1Score.slice();
        let p2Score = this.state.p2Score.slice();

        if (result === 'X') {
            //increase player 1 wins, inc player 2 losses
            player1.winCount++;
            p1Score[0]++;
            player2.loseCount++;
            p2Score[1]++;
        }
        else if (result === 'O') {
            //increase player 2 wins, inc player 1 losses
            player2.winCount++;
            p2Score[0]++;
            player1.loseCount++;
            p1Score[1]++;
        }
        else {
            //increase both draws
            player1.drawCount++;
            player2.drawCount++;
            p1Score[2]++;
            p2Score[2]++;
        }

        if (this.props.mode === 'TwoPlayer') {
            console.log("updating players on backend");

            //save new data
            Client.updatePlayer(player1);
            Client.updatePlayer(player2);
        }
        //update player1 and player2 state (left is label, right is object)
        this.setState({
            player1: player1,
            player2: player2,
            p1Score: p1Score,
            p2Score: p2Score,
        });
    };

    setTwoPlayers = (nick1, nick2) => {
        Client.getPlayer(nick1, (player) => { this.setState({ player1: player }) });
        Client.getPlayer(nick2, (player) => { this.setState({ player2: player }) });
    }

    setOnePlayer = (nick1) => {
        let player1 = {
            name: nick1
        }

        let player2 = {
            name: 'AI'
        }

        this.setState({
            player1: player1,
            player2: player2
        });
    }

    render() {
        let prompt = this.props.mode === 'TwoPlayer'
            ? <TwoNamePrompt isOpen={this.state.namePromptSeen} toggle={this.toggleNamePrompt} onSubmit={this.setTwoPlayers} />
            : <OneNamePrompt isOpen={this.state.namePromptSeen} toggle={this.toggleNamePrompt} onSubmit={this.setOnePlayer} />;

        let gameLogic = null;
        if (this.props.mode === 'TwoPlayer') {
            gameLogic = new TwoPlayer();
        } else if (this.props.mode === 'OnePlayer') {
            gameLogic = new OnePlayer();
        } else if (this.props.mode === 'Tutorial') {
            gameLogic = new Tutorial();
        }


        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        {prompt}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 text-center">
                        <h2>{this.state.player1.name}</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2>vs</h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>{this.state.player2.name}</h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>X</h2>
                    </div>
                    <div className="col-md-8 text-center">
                        <h2></h2>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2>O</h2>
                    </div>

                    <div className="col-md-2 text-center">
                        <h2><img className="player1" src={require('../img/' + this.props.tokenX + '.png')} alt="pieceX" /></h2>
                    </div>
                    <div class="col-md-8 text-center">
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Board Themes
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.setBoardTheme('1')}>Default Light Theme</DropdownItem>
                                <DropdownItem onClick={() => this.setBoardTheme('2')}>Coder Theme</DropdownItem>
                                <DropdownItem onClick={() => this.setBoardTheme('3')}>Harvest Theme</DropdownItem>
                                <DropdownItem onClick={() => this.setBoardTheme('4')}>Spring Theme</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <div className="col-md-2 text-center">
                        <h2><img className="player2" src={require('../img/' + this.props.tokenO + '.png')} alt="pieceO" /></h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-2">
                        <Scoreboard
                            score={this.state.p1Score}
                        />
                    </div>
                    <div className="col-md-8 text-center align-items-center">
                        <Game
                            updatePlayers={this.updatePlayers}
                            supportUndo={true}
                            gameLogic={gameLogic}
                            tokenX={this.props.tokenX}
                            tokenO={this.props.tokenO}
                            boardTheme={this.state.boardTheme}
                        />
                    </div>
                    <div className="col-md-2">
                        <Scoreboard
                            score={this.state.p2Score}
                        />
                    </div>
                </div>

                <div className="row align-items-center h-50 ">
                      <div className="col-md-12 text-center mt-4">       
                        <Link to='/'>
                            <button type="button" className="btn btn-lrg btn-primary active  shadow-large  rounded-pill w-25 h-50">Quit</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}
