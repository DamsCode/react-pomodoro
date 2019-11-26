import React from "react";
import Timer from "easytimer.js";

class chronos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Timer(),
            strtime:'00:25:00'
        };
    }

    started(){
        this.state.timer.start({
            countdown: true,
            startValues: {minutes: 25},
            callback: () => this.setState({
                strtime:this.state.timer.getTimeValues().toString()
            })
        });
    }
    reset() {
        this.state.timer.stop();
        this.setState({
            strtime:'00:25:00'
        });
    }
    paused() {
        this.state.timer.pause();
    }
    render() {
        return (
            <div>
                <p>{this.state.strtime}</p>
                <button onClick={() => this.started()}>start</button>
                <button onClick={() => this.paused()}>pause</button>
                <button onClick={() => this.reset()}>reset</button>
            </div>
        );
    }
}

export default chronos;