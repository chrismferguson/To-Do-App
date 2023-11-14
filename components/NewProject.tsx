'use client'

import { useState, useEffect } from "react";
import Button from "./Button";
import { FC } from "react";
import Card from "./Card";

const NewProject: FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
  
    const handleStartClick = () => {
      setIsRunning(true);
    };
  
    const handlePauseClick = () => {
      setIsRunning(false);
    };
  
    useEffect(() => {
      let interval;
      if (isRunning) {
        interval = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isRunning]);
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return (
      <Card className="w-full p-6 text-xl">
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex flex-col items-center">
          <div className="text-3xl font-bold mb-4">
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </div>
          {isRunning ? (
            <Button onClick={handlePauseClick}>Pause</Button>
          ) : (
            <Button onClick={handleStartClick}>Start</Button>
          )}
        </div>
      </Card>
    );
  };
  
  export default NewProject;