import currentWeekNumber from 'current-week-number';

export const DATE = {
    getNextMonday: ()=> {
        var date = new Date();
        var m = new Date();
        if (date.getDay()) { // не воскресение
            m.setDate(date.getDate() + 8 - date.getDay())
        } else {
            m.setDate(date.getDate() + 1)
        }
        m.setSeconds(0);
        return m;
    },
    isWeekOdd: (date) => {
        return currentWeekNumber(date) % 2
    }
};

export function getFormValues($form) {
    let fieldObjects = $form.serializeArray();
    let valObj = {};
    fieldObjects.forEach((field) => {
        valObj[field.name] = field.value
    });
    return valObj;
}