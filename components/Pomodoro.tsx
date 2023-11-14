'use client'

import { useState, useEffect } from 'react';
import Card from './Card';

const PomodoroTimer = () => {
  const [goal, setGoal] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card>
      <input type="text" value={goal} onChange={handleGoalChange} placeholder="Enter Your Task" />
    </Card>
  );
};

export default PomodoroTimer;