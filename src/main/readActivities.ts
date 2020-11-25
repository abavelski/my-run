import { ActivityData, readActivities } from "./db";
export default () : Promise<ActivityData[]> => new Promise<ActivityData[]>((res) => res(readActivities()));