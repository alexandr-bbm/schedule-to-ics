import {DATE} from './helper';
// перебирает данные с парами и выдает клендарь
export default function makeIcs (classes) {
    var calendar = ics();
    var nextMonday = DATE.getNextMonday(); // следующий понедельник
    var startMonday = new Date(nextMonday);
    if (!DATE.isWeekOdd(nextMonday)) { // необходимо начать с нечетной недели
        startMonday.setDate(nextMonday.getDate() - 7);
    }
    // Продолжительность пары в минутах.
    var classDuration = 95;
    classes.forEach((classItem) => { // для каждой пары
        // название события
        var evtName = classItem.subject + ' ' + classItem.lessonType + ' ' + classItem.room;
        // Формируем дату начала пары относительно понедельника
        var evtStartDate = new Date(startMonday);
        var timeArr = classItem.timeStart.split(':');
        evtStartDate.setDate(startMonday.getDate() + classItem.dayIdx + classItem.weekIdx*7);
        evtStartDate.setHours(timeArr[0]);
        evtStartDate.setMinutes(timeArr[1]);
        //------------------------------------------------------
        // Время окончания события.
        var evtEndDate = new Date(evtStartDate.getTime() + classDuration*60000);
        // Добавляем событие в календарь с периодичностью раз в две недели
        calendar.addEvent(evtName, '', '', evtStartDate, evtEndDate, {
            freq: 'WEEKLY',
            interval: 2
        });
    });
    return calendar;
}