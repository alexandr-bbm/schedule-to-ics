# schedule-to-ics

## Description (ru below)

A [service](https://alexandr-bbm.github.io/schedule-to-ics/) generating `.ics` files from online schedules. It allows to omit hand transportation of a schedule to personal calendar app. 

## `.ics` extension 
File`.ics` is suitable for import of a schedule to online calendars (Google Calendar, Outlook). 

## List of schedules 
Right now [on project page](https://alexandr-bbm.github.io/schedule-to-ics/) generation of files for the following schedules is available: 

1. Schedule of Tomsk Polytechnic University 
2. Schedule of Tomsk State University 

## Contribute 
We expect the project to expand. You can easily add import of your schedule. There is an individual parser module for each schedule. To add new schedule you just should choose proper DOM elements (examples: get-tpu-schedule.es6, get-tsu-schedule.es6).

## In russian
## Описание

Проект служит сервисом для генерации `.ics` файлов из интернет-расписаний. Это нужно для того, чтобы не переносить расписание в свой электронный календарь вручную.

## Формат `.ics`

Файл `.ics` предназначен для импорта расписания в электронные календари (Google Календарь, Outlook)

## Список расписаний
В настоящее время [на странице проекта](https://alexandr-bbm.github.io/schedule-to-ics/) можно загрузить файлы со следующими расписаниями:

1. Расписание занятий Томского политехнического университета
2. Расписание занятий Томского государственного университета

## Внести вклад
Проект рассчитан на рассширяемость, и вы можете добавить импорт вашего расписания.
Для отдельного расписания создается отдельный модуль его парсинга. Добавление нового источника расписания сводится к выбору нужных DOM-элементов (см. примеры: get-tpu-schedule.es6, get-tsu-schedule.es6).
 





