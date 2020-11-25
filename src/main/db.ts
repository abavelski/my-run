import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

export interface Stats {
    distance : number,
    time: number,
    one : number | undefined,
    five : number | undefined,
    ten : number | undefined
}

export interface ActivityData {
    activityId: string,
    sport: string,
    startingEpoch: number,
    tcxFileName: string,
    stats: Stats
  }

const db = new JsonDB(new Config("./data/activities", true, false, '/'));

export const readActivities = () : ActivityData[] => {  
    try {
      return db.getData("/activities");
    } catch(error) {
      return [];
    }  
  }

export const saveActivites = ( activities: ActivityData[]) : void => {
    db.push("/activities", activities, true);
}