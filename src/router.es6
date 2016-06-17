import getTpuSchedule from './get-tpu-schedule.es6';

export default function router (university, url) {
    switch (university) {
        case 'ТПУ':
            return getTpuSchedule(url);
            break;

        case 'tsu':
            break;

        default:

    }
}