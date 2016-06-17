import {DATE} from './helper';
/* 
    Функция makeIcs. 

    @param Array classes [{}, ...]
        Массив объектов с полями:
             subject
                отображаемое название пары
             title
                длинное название пары (не используется)
             lessonType
                тип занятия (напр. ЛК, ПР, ЛБ)
             room
                аудитория
             teacher (не используется)
                преподаватель
             timeStart
                время начала пары: строка формата чч:мм
             dayIdx:
                индекс лня недели: 0 - Пн, 1 - Вт и т.д.
             weekIdx (необязательное) todo
                индекс четности недели: 0 - нечет, 1 - чет
    @param Number classDuration Продолжительность пары в минутах.
    @param Boolean isTwoWeeks Есть ли в расписании деление на четную/нечетную недели

    @returns Object calendar - объект календаря ics
*/

export default function makeIcs (classes, classDuration = 95 ,isTwoWeeks = true) {
    var calendar = ics();
    var nextMonday = DATE.getNextMonday(); // следующий понедельник
    var startMonday = new Date(nextMonday);
    var weekInterval;
    isTwoWeeks ? weekInterval = 2 : 1;
    if (isTwoWeeks && !DATE.isWeekOdd(nextMonday)) { // todo не работает нихера
        startMonday.setDate(nextMonday.getDate() - 7); // соблюдаем порядок четной/нечетной недель
    }
    classes.forEach((classItem) => { // для каждой пары
        // название события
        let evtName = classItem.subject + ' ' + classItem.lessonType + ' ' + classItem.room;
        // Формируем дату начала пары относите льно понедельника
        let evtStartDate = new Date(startMonday);
        let timeArr = classItem.timeStart.split(':');
        evtStartDate.setDate(startMonday.getDate() + classItem.dayIdx + classItem.weekIdx*7);
        evtStartDate.setHours(timeArr[0]);
        evtStartDate.setMinutes(timeArr[1]);
        //------------------------------------------------------
        // Время окончания события.
        var evtEndDate = new Date(evtStartDate.getTime() + classDuration*60000);
        // Добавляем событие в календарь с периодичностью weekInterval
        calendar.addEvent(evtName, '', '', evtStartDate, evtEndDate, {
            freq: 'WEEKLY',
            interval: weekInterval
        });
    });
    return calendar;
}