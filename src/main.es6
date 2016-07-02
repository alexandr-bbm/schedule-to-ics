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
                    .then((data) => {
                        if (0 === data.classes.length) {
                            throw new Error();
                        }
                        var cal = makeIcs(data);

                        this.loadBtnSpinner.stop();
                        var infoData = {
                            message: 'Расписание успешно загружено.',
                            timeout: 2000,
                        };
                        this.snackbarContainer.MaterialSnackbar.showSnackbar(infoData);
                        cal.download('rasp');
                    })
                    .catch((response) => {
                        console.log(response);
                        this.loadBtnSpinner.stop();
                        var infoData = {
                            message: 'При загрузке произошла ошибка',
                            timeout: 2000,
                        };
                        this.snackbarContainer.MaterialSnackbar.showSnackbar(infoData);
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