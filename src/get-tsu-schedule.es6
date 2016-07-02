/*
 * Функция - загрузчик и обработчик DOM с сайта расписания ТГУ
 *
 * @param String url Адрес страницы для парсинга
 * @returns Array classes Массив объектов-пар в виде для makeIcs
 *
 */
export default function getTsuSchedule (url) {
    return new Promise((resolve, reject) => {
        console.info('function getTpuSchedule() has been called');
        $.ajax({ // пропаченный метод, позволяющий реализовывать кроссдоменные ajax запросы
            url: url,
            type: 'GET',
            success: function (data) {
                var classes = [];
                var grabbedHTMLNodes = $.parseHTML(data.responseText);
                var $scheduleTables = $(grabbedHTMLNodes).find('#schedule_main');
                // получение моментов времени начала пар
                var startTimes = [];
                $scheduleTables.find('#time > div > span').each(function () {
                    startTimes.push($(this).text().match(/([^\s]+)/)[0]);
                });
                // ---------------------------------------
                $scheduleTables.each(function(idx) { // для каждой недели
                    var weekIdx = idx;
                    $(this).find('.weekday_line').each(function(index) { // в каждой строке
                        var dayIdx = index; // запоминаем индекс для времени
                        $(this).find('.lessons_cell').each(function (timeIdx) { // в каждом блоке
                            var $subject = $(this).find('.one_lesson_info'); // находим див `пары`
                            var typeIndicator = $subject.find('.type_employment').eq(0).css('border-top-color');
                            var subjectType;
                            subjectType = typeIndicator === 'rgb(255, 0, 0)' ? 'ЛК' : 'ПР';
                            if ($subject.length === 0) return; // если такого нет (в пустых и в подгруппах) то выходим
                            // добавляем в массив пар очередную пару
                            classes.push({
                                subject: $subject.find('label').text(),
                                lessonType : subjectType,
                                room : $subject.find('.auditories').text(),
                                timeStart: startTimes[timeIdx],
                                dayIdx: dayIdx, // 0 - Пн, 1 - Вт и т.д.
                                weekIdx: weekIdx // 0 - нечет, 1 - чет
                            })
                        })
                    })
                });
                resolve({
                    classes: classes,
                    classDuration: 95,
                    isTwoWeeks: false,
                });
                console.log(classes);
            }
        });
    })
}    
