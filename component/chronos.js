import React from "react";
import {Timer} from "easytimer.js";

class chronos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Timer(),
            mode: "Session",
            strtime: `25:00`,
            sduree: 25,
            bduree: 1,
            isBreak: false,
            isPause: false,
        };
    }

    started() {
        if (!this.state.isPause) {
            this.state.timer.start({
                countdown: true,
                startValues: {minutes: this.state.sduree},
                callback: () => {
                    if (
                        this.state.timer.getTimeValues().minutes === 0 &&
                        this.state.timer.getTimeValues().seconds === 0
                    ) {
                        this.setState({
                            isBreak: true,
                        });
                        this.startbeak();
                    }
                    this.setState(state => ({
                        strtime: state.timer
                            .getTimeValues()
                            .toString()
                            .substring(3),
                    }));
                },
            });
        } else {
            this.state.timer.start();
            this.setState({
                isPause: false,
            });
        }
    }
    startbeak() {
        this.setState({
            timer: new Timer(),
            mode: "break",
        });
        this.state.timer.start({
            countdown: true,
            startValues: {minutes: this.state.bduree},
            callback: () => {
                this.setState(state => ({
                    strtime: state.timer
                        .getTimeValues()
                        .toString()
                        .substring(3),
                }));
                if (
                    this.state.timer.getTimeValues().minutes === 0 &&
                    this.state.timer.getTimeValues().seconds === 0
                ) {
                    this.reset();
                }
            },
        });
    }
    reset() {
        this.state.timer.stop();
        this.setState({
            isBreak: false,
            isPause: false,
        });
        if (this.state.sduree <= 10) {
            this.setState(state => ({
                strtime: `0${state.sduree}:00`,
            }));
        } else {
            this.setState(state => ({
                strtime: `${state.sduree}:00`,
            }));
        }
        this.setState({
            mode: "Session",
        });
    }
    paused() {
        if (this.state.timer.isRunning()) {
            this.state.timer.pause();
            this.setState({
                isPause: true,
            });
        }
    }
    increment(breaking) {
        if (!this.state.timer.isRunning() && !this.state.isPause) {
            if (!breaking) {
                if (this.state.sduree < 60) {
                    const pdur = this.state.sduree + 1;
                    if (this.state.sduree < 9) {
                        this.setState({
                            sduree: pdur,
                            strtime: `0${pdur}:00`,
                        });
                    } else {
                        this.setState({
                            sduree: pdur,
                            strtime: `${pdur}:00`,
                        });
                    }
                }
            } else {
                if (this.state.bduree < 60) {
                    this.setState(state => ({
                        bduree: state.bduree + 1,
                    }));
                }
            }
        }
    }

    decrement(breaking) {
        if (!this.state.timer.isRunning() && !this.state.isPause) {
            if (!breaking) {
                if (this.state.sduree > 1) {
                    const pdur = this.state.sduree - 1;

                    if (this.state.sduree <= 10) {
                        this.setState({
                            sduree: pdur,
                            strtime: `0${pdur}:00`,
                        });
                    } else {
                        this.setState({
                            sduree: pdur,
                            strtime: `${pdur}:00`,
                        });
                    }
                }
            } else {
                if (this.state.bduree > 1) {
                    this.setState(state => ({
                        bduree: state.bduree - 1,
                    }));
                }
            }
        }
    }
    render() {
        return (
            <div className={"container"}>
                <div id={"blockg"}>
                    <button
                        type={"button"}
                        onClick={() => this.increment(true)}>
                        {"+"}
                    </button>
                    <p>{"Break  :"}</p>
                    <p>{this.state.bduree}</p>
                    <button
                        type={"button"}
                        onClick={() => this.decrement(true)}>
                        {"-"}
                    </button>
                </div>
                <div id={"blockd"}>
                    <button
                        type={"button"}
                        onClick={() => this.increment(false)}>
                        {"+"}
                    </button>
                    <p>{"session :"}</p>
                    <p>{this.state.sduree}</p>
                    <button
                        type={"button"}
                        onClick={() => this.decrement(false)}>
                        {"-"}
                    </button>
                </div>
                <div className={"col"} id={"blockclock"}>
                    <div>
                        <p>
                            {this.state.mode} {":"}
                        </p>
                        <p>{this.state.strtime}</p>
                    </div>
                    <div>
                        <button type={"button"} onClick={() => this.started()}>
                            {"start"}
                        </button>
                        <button type={"button"} onClick={() => this.paused()}>
                            {"pause"}
                        </button>
                        <button type={"button"} onClick={() => this.reset()}>
                            {"reset"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default chronos;
