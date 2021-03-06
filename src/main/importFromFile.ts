import { dialog, Notification } from 'electron';

import { Parser } from 'tcx-js';
import { ActivityData, readActivities, saveActivites } from './db';
import { calculateStats } from './findStats';

const importFromFile = async () : Promise<ActivityData[] | undefined> => {
  
  const response = await dialog.showOpenDialog({ 
    filters: [{
      name: 'tcx',
      extensions: ['tcx']

      }],
    properties: ['openFile'] 
  });
  if (!response.canceled) {
    
    const parser = new Parser(response.filePaths[0]);
    const a = parser.activity;
    const newEl = {
      activityId : a.activityId,
      sport: a.sport,
      startingEpoch: a.startingEpoch,
      tcxFileName: a.tcx_filename,
      stats: calculateStats(a.trackpoints)
    };
    
    const activities = readActivities();
    
    const idx = activities.findIndex((e) => a.activityId === e.activityId);
    if (idx >= 0) {
      activities.splice(idx, 1, newEl);
    } else {
      activities.push(newEl);
      activities.sort((a,b) => b.startingEpoch - a.startingEpoch);   
    }    
    saveActivites(activities);
    new Notification({
      title: 'Activity import',
      body: 'SUCCESS',
      urgency: 'low'
    }).show();
    return activities;
  } else {
    return undefined;
  }    
};

export default importFromFile;