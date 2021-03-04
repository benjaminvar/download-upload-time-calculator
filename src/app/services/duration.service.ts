import { Injectable } from "@angular/core";

@Injectable({
    'providedIn': "root"
})
export class DurationService {
    getDuration(duration: number) {
        let days = duration / (3600 * 24);
        let hours = (duration % (3600 * 24)) / 3600;
        let minutes = ((duration % (3600 * 24)) % 3600) / 60;
        let seconds = (((duration % (3600 * 24)) % 3600) % 60) / 60;
        return {
          days: Math.floor(days),
          hours: Math.floor(hours),
          minutes: Math.floor(minutes),
          seconds: Math.floor(seconds)
        }
      }
      formatDuration(duration: {days: number, hours: number, minutes: number, seconds: number}) {
        let str = "";
        if(duration.days > 0) {
          str += duration.days + " d ";
        }
        if(duration.hours > 0) {
          str += duration.hours + " h ";
        }
        if(duration.minutes > 0) {
          str += duration.minutes + " m ";
        }
        str += duration.seconds + " s ";
        return str;
      }
}