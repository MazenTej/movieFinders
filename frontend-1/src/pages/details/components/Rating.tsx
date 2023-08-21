// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';



import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({rating} : {rating: number}) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < rating) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  return (
    <>
        <CircularProgressbar value={percentage} text={`${percentage}%`} 
        styles={buildStyles({
          pathColor: `rgba(128, 0, 255, ${percentage / 100})`,
          textColor: '#8000FF',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })} />
  </>
  );
}
export default CircularProgressBar;