import { Injectable } from "@angular/core";
export const UNITS = {
  DAY: 3600 * 24,
  HOUR: 3600,
  MINUTE: 60
}
@Injectable({
    'providedIn': "root"
})
export class DurationService {
    getDuration(duration: number) {
        let days = duration / (UNITS.DAY);
        let hours = (duration % (UNITS.DAY)) / UNITS.HOUR;
        let minutes = ((duration % (UNITS.DAY)) % UNITS.HOUR) / UNITS.MINUTE;
        let seconds = (((duration % (UNITS.DAY)) % UNITS.HOUR) % UNITS.MINUTE);
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