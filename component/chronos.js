import React from "react";
import {Timer} from "easytimer.js";


class chronos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Timer(),
            strtime:`25:00`,
            duree:25
        };
    }

    started(){
        this.state.timer.start({
            countdown: true,
            startValues: {minutes: this.state.duree},
            callback: () => this.setState({
                strtime:this.state.timer.getTimeValues().toString().substring(3)
            })
        });
    }
    reset() {
        this.state.timer.stop();
        if (this.state.duree <= 10){
            this.setState({
                strtime:`0${this.state.duree}:00`
            });
        }else
            this.setState({
                strtime:`${this.state.duree}:00`
            });
    }
    paused() {
        if (this.state.timer.isRunning())
            this.state.timer.pause();
    }
    increment(){
        if (!this.state.timer.isRunning())
        {
            if (this.state.duree < 60)
           {
               let pdur = this.state.duree+1;
                this.setState({
                duree:pdur,
                strtime:`${pdur}:00`
                });
           }else
               {
                let pdur = 1;
                this.setState({
                    duree:pdur,
                    strtime:`0${pdur}:00`
                });
            }
        }
    }

    decrement(){
        if (!this.state.timer.isRunning())
        {
            if (this.state.duree > 1){
                let pdur = this.state.duree-1;
                if(this.state.duree <= 10){
                    this.setState({
                        duree:pdur,
                        strtime:`0${pdur}:00`
                    });
                }else
                    this.setState({
                        duree:pdur,
                        strtime:`${pdur}:00`
                    });
            }
        }

    }
    render() {
        return (
            <div >
                <div>
                    <button  onClick={()=>this.increment()}>+</button>
                    <p>Break length :</p>
                    <p>{this.state.duree}</p>
                    <button  onClick={()=>this.decrement()}>-</button>
                </div>
                <div>
                    <p>Sessions Length :</p>
                    <div >{this.state.strtime}</div>
                    <button  onClick={() => this.started()}>start</button>
                    <button onClick={() => this.paused()}>pause</button>
                    <button onClick={() => this.reset()}>reset</button>
                </div>
            </div>
        );
    }


}

export default chronos;