import React from "react";
import {Timer} from "easytimer.js";


class chronos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Timer(),
            mode:"Session",
            strtime:`25:00`,
            sduree:25,
            bduree:1,
            isBreak:false,
            isPause:false
        };
    }

    started(){
        if (!this.state.isPause){
            this.state.timer.start({
                countdown: true,
                startValues: {minutes: this.state.sduree},
                callback: () => {
                    if(this.state.timer.getTimeValues().minutes === 0 && this.state.timer.getTimeValues().seconds === 0){
                        this.setState({
                            isBreak:true
                        });
                        this.startbeak();
                    }
                    this.setState({
                        strtime: this.state.timer.getTimeValues().toString().substring(3)
                    })
                }
            });
        }else{
            this.state.timer.start();
            this.setState({
                isPause:false
            });
        }

    }
    startbeak (){
        this.setState({
            timer: new Timer(),
            mode:'break'
        });
        this.state.timer.start({
            countdown: true,
            startValues: {minutes: this.state.bduree},
            callback: () => {
                this.setState({
                    strtime: this.state.timer.getTimeValues().toString().substring(3)
                })
                if(this.state.timer.getTimeValues().minutes === 0 && this.state.timer.getTimeValues().seconds === 0){
                    this.reset();
                }
            }
        });
    }
    reset() {
        this.state.timer.stop();
        if (this.state.sduree <= 10){
            this.setState({
                strtime:`0${this.state.sduree}:00`
            });
        }else{
            console.log('test2');
            this.setState({
                strtime:`${this.state.sduree}:00`
            });
        }
        this.setState({
            mode:'Session'
        });
    }
    paused() {
        if (this.state.timer.isRunning()){
            this.state.timer.pause();
            this.setState({
                isPause:true
            })
        }
    }
    increment(breaking){
        if (!this.state.timer.isRunning() && !this.state.isPause)
        {
            if (!breaking){
                if (this.state.sduree < 60)
                {
                    let pdur = this.state.sduree +1;
                    if(this.state.sduree < 9){
                        this.setState({
                            sduree:pdur,
                            strtime:`0${pdur}:00`
                        });
                    }else{
                        this.setState({
                            sduree:pdur,
                            strtime:`${pdur}:00`
                        });
                    }
                }
            }
            else{
                if (this.state.bduree < 60)
                {
                    let pdur = this.state.bduree +1;
                    this.setState({
                        bduree:pdur,
                    });
                }
            }
        }
    }

    decrement(breaking){
        if (!this.state.timer.isRunning() && !this.state.isPause)
        {
            if (!breaking){
                if (this.state.sduree > 1){
                    let pdur = this.state.sduree -1;

                    if(this.state.sduree <= 10){
                        this.setState({
                            sduree:pdur,
                            strtime:`0${pdur}:00`
                        });
                    }else{
                        this.setState({
                            sduree:pdur,
                            strtime:`${pdur}:00`
                        });
                    }
                }
            }else{
                if(this.state.bduree > 1) {
                    let pdur = this.state.bduree - 1;
                    this.setState({
                        bduree: pdur,
                    });
                }
            }

        }

    }
    render() {
        return (
            <div >
                <div>
                    <button  onClick={()=>this.increment(true)}>+</button>
                    <p>Break length :</p>
                    <p>{this.state.bduree}</p>
                    <button  onClick={()=>this.decrement(true)}>-</button>
                </div>
                <div>
                    <button  onClick={()=>this.increment(false)}>+</button>
                    <p>session length :</p>
                    <p>{this.state.sduree}</p>
                    <button  onClick={()=>this.decrement(false)}>-</button>
                </div>
                <div>
                    <p>{this.state.mode} :</p>
                    <div >{this.state.strtime}</div>
                    <button onClick={() => this.started()}>start</button>
                    <button onClick={() => this.paused()}>pause</button>
                    <button onClick={() => this.reset()}>reset</button>
                </div>
            </div>
        );
    }


}

export default chronos;