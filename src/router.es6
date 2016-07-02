import getTpuSchedule from './get-tpu-schedule.es6';
import getTsuSchedule from './get-tsu-schedule.es6';

export default function router (university, url) {
    switch (university) {
        case 'ТПУ':
            return getTpuSchedule(url);
            break;

        case 'ТГУ':
            return getTsuSchedule(url);
            break;

        default:

    }
}