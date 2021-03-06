import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { TopTen } from './TopTen';
import gear from '../img/icons8-settings-48W.png';

export class NewGame extends Component {
    static displayName = NewGame.name;

    state = {
        seen: false,
    };

    toggleTopTen = () => {
        console.log("flip state!!!")
        this.setState({
            seen: !this.state.seen
        });
    };

    render() {
        return (
            <Fragment>
                <div className="jumbotron">
                    <h1 className="display-1 text-center"> Tic Tac Toe</h1>
                </div>

                <div className="row">
                    <div className="col">
                        <TopTen isOpen={this.state.seen} toggle={this.toggleTopTen} />
                    </div>
                </div>

                <div className="row justify-content-start">
                    <div className="col align-self-start">
                        <button
                            type="button"
                            onClick={this.toggleTopTen}
                            className="btn btn-primary rounded-circle">Stats</button>
                    </div>

                    <div className="col  align-self-end text-right">
                        <Link to='/settings'>
                            <button
                                type="button"
                                className="btn btn-primary rounded-circle " data-toggle="tooltip" data-placement="top" title="Settings" >
                                <img className="settingImg img-fluid" src={gear} alt="Settings" /></button>
                        </Link>
                    </div>
                </div>

                <div className="row align-items-center h-50 ">
                    <div className="col-md-12 text-center mt-4">
                        <Link to='/tutorialpage'>
                            <button type="button" className="btn btn-lrg btn-primary shadow-large  rounded-pill w-25 h-50">Tutorial</button>
                        </Link>
                    </div>
                    <div className="col-md-12 text-center mt-4">
                        <Link to='/oneplayerpage'>
                            <button type="button" className="btn btn-lrg btn-primary shadow-large  rounded-pill w-25 h-50">One Player</button>
                        </Link>
                    </div>

                    <div className="col-md-12 text-center mt-4">
                        <Link to='/boardpage'>
                            <button type="button" className="btn btn-lrg btn-primary shadow-large rounded-pill w-25 h-50">Two Player</button>
                        </Link>
                    </div>
                    <div className="col-md-12 text-center mt-4">
                        <Link to='/onlinepage'>
                            <button type="button" className="btn btn-lrg btn-primary shadow-large  rounded-pill w-25 h-50">Online</button>
                        </Link>
                    </div>

                </div>
            </Fragment>
        );
    }
}
export default NewGame;
