import React from 'react';
import ReactDom from 'react-dom';
import Pomodoro from './components/Pomodoro';
import './styles/app.scss';


const jsx = (
    <Pomodoro />
);

ReactDom.render(jsx, document.getElementById('root'));