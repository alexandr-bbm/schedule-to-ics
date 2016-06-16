import 'non_npm_libs/jquery.xdomainajax.js';
import 'material-design-lite/material.js';

import 'material-design-lite/material.css';
import 'styles/mdl-template.css';
import 'styles/main.css';

import {getFormValues} from './helper';
import getTpuSchedule from './get-tpu-schedule.es6';
import makeIcs from './make-ics';

$(function() {
    $('.get-ics-form')
        .on('submit.downloadRasp', function(event) {
            event.preventDefault();
            let form = getFormValues($(event.target));
            getTpuSchedule(form.url)
                .then((classes) => {
                    var cal = makeIcs(classes);
                    cal.download('rasp');
                })
                .catch((response) => {
                    console.log(response);
                })
            return false;
        });
});