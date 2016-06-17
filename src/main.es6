import 'non_npm_libs/jquery.xdomainajax.js';
import 'material-design-lite/material.js';
import 'getmdl-select/getmdl-select.min.js';

// STYLES
import 'material-design-lite/material.css';
import 'styles/mdl-template.css';
import 'styles/main.css';
import 'getmdl-select/getmdl-select.min.css';
//-----

import {getFormValues} from './helper';
import router from './router.es6';
import makeIcs from './make-ics';
import {Spinner} from './spinner.es6';

class App {
    constructor () {
        this.init()
    }

    init () {
        this.bind();
        this.$dwnlBtn = $('.j-download-btn');
        this.loadBtnSpinner = new Spinner(this.$dwnlBtn);
        this.snackbarContainer = document.querySelector('#demo-snackbar-example');
    }

    bind () {
        this.bindDownloadForm();
        this.bindDownloadBtnSpinner();
    }

    bindDownloadForm () {
        $('.get-ics-form')
            .on('submit.downloadRasp', (event) => {
                event.preventDefault();
                this.loadBtnSpinner.start();
                let form = getFormValues($(event.target));
                router(form.university, form.url)
                    .then((classes) => {
                        if (0 === classes.length) {
                            throw new Error();
                        }
                        var cal = makeIcs(classes);

                        this.loadBtnSpinner.stop();
                        var data = {
                            message: 'Расписание успешно загружено.',
                            timeout: 2000,
                        };
                        this.snackbarContainer.MaterialSnackbar.showSnackbar(data);
                        cal.download('rasp');
                    })
                    .catch((response) => {
                        console.log(response);
                        this.loadBtnSpinner.stop();
                        var data = {
                            message: 'При загрузке произошла ошибка',
                            timeout: 2000,
                        };
                        this.snackbarContainer.MaterialSnackbar.showSnackbar(data);
                    })
                return false;
            });
    }

    bindDownloadBtnSpinner () {

    }
}

$(function() {
    new App();
});