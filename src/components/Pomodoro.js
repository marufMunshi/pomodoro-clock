import React, { useState, useEffect, useRef } from 'react';


const Pomodoro = () => {
    const [breakCount, setBreakCount] = useState(5);
    const [sessionCount, setSessionCount] = useState(25);
    // 1 minute = 60s & 1s = 1000ms so 1min = 60 * 1000 = 60000ms
    const [timeLeft, setTimeLeft] = useState(25 * 60000);
    const [timerStatus, setTimerStatus] = useState('stop');
    const [intervalID, setIntervalID] = useState('');
    const [timerTitle, setTimerTitle] = useState('Session');
    let playBeep;

    const numberPadding = number => (number < 10 ? '0' + number : '' + number);

    const handleBreakIncrement = () => {
        if(timerStatus === 'stop') {
            setBreakCount(prevCount => prevCount + 1)
        }
    } ;

    const handleBreakDecrement = ()  => {
        if(breakCount !== 1 && timerStatus === 'stop') {
            setBreakCount(prevCount => prevCount - 1);
        }
    }
    
    const handleSessionIncrement = () => {
        if(timerStatus === 'stop') {
            setSessionCount(prevSession => prevSession + 1);
            setTimeLeft(prevTime => prevTime + 60000 );
        }
    }    

    const handleSessionDecrement = () => {
        if(sessionCount !== 1 && timerStatus === 'stop') {
            setSessionCount(prevSession => prevSession - 1);
            setTimeLeft(prevTime => prevTime - 60000 );
        }
    }

    const handleReset = () => {
        setBreakCount(5);
        setSessionCount(25);
        setTimeLeft(25 * 60000);
        setTimerStatus('stop');
        clearInterval(intervalID);
        setTimerTitle('Session');
    }

    const timeCount = () => {
        if(timeLeft === 0 ) {
            setTimeLeft(0);
        } else {
            setTimeLeft(prevTime => prevTime - 1000);
        }
    };

    const handleTimeLeft = () => {
        if (timerStatus === 'stop') {
            setTimerStatus('start');
            let id = setInterval(() => timeCount(), 1000);
            setIntervalID(id);
        } else if (timerStatus === 'start') {
            setTimerStatus('stop');
            clearInterval(intervalID);
        }
    };

    useEffect(() => {
        if(timeLeft === 0) {
            if(timerTitle === 'Session') {
                setTimerTitle('Break');
                setTimeLeft(breakCount * 60000);
                playBeep.play();
            } else if(timerTitle === 'Break'){
                setTimerTitle('Session');
                setTimeLeft(sessionCount * 60000);
                playBeep.play();
            }
        }
    });

    return (
        <div className="pomodoro">
            <h1 className="title">Pomodoro Clock</h1>
            <div className="pomodoro_break-session">
                <div id="break-label">
                    <h1>Break Length</h1>
                    <p>
                        <i
                            id="break-decrement"
                            className="ion-arrow-down-c"
                            onClick={handleBreakDecrement}
                        />
                        <span id="break-length">
                            {breakCount}
                        </span>
                        <i
                            id="break-increment"
                            className="ion-arrow-up-c"
                            onClick={handleBreakIncrement}
                        />
                    </p>
                </div>
                <div id="session-label">
                    <h1>Session Length</h1>
                    <p>
                        <i
                            id="session-decrement"
                            className="ion-arrow-down-c"
                            onClick={handleSessionDecrement}
                        />
                        <span id="session-length">
                            {sessionCount}
                        </span>
                        <i
                            id="session-increment"
                            className="ion-arrow-up-c"
                            onClick={handleSessionIncrement}
                        />
                    </p>
                </div>
            </div>
            <div className="session-timer-wrapper">
                <div className="timer">
                    <h2 id="timer-label">{timerTitle}</h2>
                    <h1 id="time-left">
                        {
                            `${numberPadding(parseInt(timeLeft / 1000 / 60, 10))}
                            :
                            ${numberPadding((timeLeft / 1000) % 60)}`
                        }
                    </h1>
                </div>
            </div>
            <div className="pomodoro-control">
                <div id="start_stop">
                    <span
                        onClick={handleTimeLeft}
                    >
                        {
                            timerStatus === 'stop' 
                            ? <i className="ion-play"/>
                            : <i className="ion-pause"/>
                        }
                    </span>
                </div>
                <div>
                    <i 
                        id="reset" 
                        className="ion-ios-refresh"
                        onClick={handleReset}
                    />
                </div>
                <audio
                    src="https://res.cloudinary.com/momitrahman/video/upload/v1527792120/fcc/Beep.wav"
                    id="beep"
                    ref={beep => (playBeep = beep)}
                />
            </div>
        </div>
    );
};

export default Pomodoro;