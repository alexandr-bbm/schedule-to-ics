/*
 * Функция - загрузчик и обработчик DOM с сайта расписания ТПУ
 *
 * @param String url Адрес страницы для парсинга
 * @returns Array classes Массив объектов-пар в виде для makeIcs
 *
 */
export default function getTpuSchedule (url) {
    return new Promise((resolve, reject) => {
        console.info('function getTpuSchedule() has been called');
        $.ajax({ // пропаченный метод, позволяющий реализовывать кроссдоменные ajax запросы
            url: url,
            type: 'GET',
            success: function (data) {
                var classes = [];
                var grabbedHTMLNodes = $.parseHTML(data.responseText);
                var $scheduleTables = $(grabbedHTMLNodes).find('.c-table.schedule');
                // получение моментов времени начала пар
                var startTimes = [];
                $scheduleTables.find('.time').each(function () {
                    startTimes.push($(this).text());
                });
                // ---------------------------------------
                $scheduleTables.each(function(idx) { // для каждой недели
                    var weekIdx = idx;
                    $(this).find('tr').each(function(index) { // в каждой строке
                        if (index == 0) return; // пропускаем первый элемент, т.к. это дни недели
                        var timeIndex = index; // запоминаем индекс для времени
                        $(this).find('td').each(function (dayIdx) { // в каждом блоке
                            if (dayIdx == 0) return; // первый пропускаем, т.к. это время
                            var $subject = $(this).find('.subject'); // находим див пары
                            if ($subject.length === 0) return; // если такого нет (в пустых и в подгруппах) то выходим
                            // добавляем в массив пар очередную пару
                            classes.push({
                                subject: $(this).find('.subject').text(),
                                title : $(this).find('.subject').attr('title'),
                                lessonType : $(this).find('.lesson-type').text(),
                                room : $(this).find('.room a').text(),
                                teacher : $(this).find('.group-teacher').text(),
                                timeStart: startTimes[timeIndex-1],
                                dayIdx: dayIdx - 1, // 0 - Пн, 1 - Вт и т.д.
                                weekIdx: weekIdx // 0 - нечет, 1 - чет
                            })
                        })
                    })
                });
                resolve(classes);
                console.log(classes);
            }
        });
    })
}    
