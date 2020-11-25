import { Trackpoint } from 'tcx-js';
import { Stats } from './db';

const distanceFrom = (distance: number, points: number[], start : number) : number | undefined => {
    let sum = 0;
    for (let i = start; i < points.length; i++) {
      sum += points[i];
      if (sum >= distance) {
        return i - start;
      }
    }
    return undefined;
  }


const bestTimeForDistance = (distance: number, points: number[]) : number => {
    let minTime = undefined;

    for (let i = 0; i < points.length; i++) {
      const rTime = distanceFrom(distance, points, i);
      if (rTime === undefined) {  
        break;
      } else {
        if (minTime === undefined  || minTime > rTime) {
          minTime = rTime;
        }
      }
    }
    return minTime
}

export const calculateStats = (trackpoints : Trackpoint[]) : Stats => {
    const points = trackpoints.reduce<number[]>( (acc, p , i, arr) => {
        if (i > 0) {
          const time = p.elapsed_sec - arr[i-1].elapsed_sec;
          const distance = p.distance_meters - arr[i-1].distance_meters;
          for (let j = 0; j < time; j++) {
            acc.push(distance / time)
          }
        } 
        return acc;
      }, []);

    return {
        time: points.length,
        distance : points.reduce((sum, c) => sum + c, 0),
        one : bestTimeForDistance(1000, points),
        five: bestTimeForDistance(5000, points),
        ten: bestTimeForDistance(10000, points)
    };
}
