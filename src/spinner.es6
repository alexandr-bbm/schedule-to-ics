// компонент заменяет $el на спинер в момент между star и stop
export class Spinner {
    constructor ($el) {
        this.$el = $el;
        this.initialBtnHtml = $el.html();
        if (0 === $el.length) {
            console.log('В Spinner передан массив нулевой длины');
        }
        this.spinnerHtml = '<div class="mdl-spinner mdl-js-spinner is-active"></div>';
    }
    start () {
        this.$el.html(this.spinnerHtml);
    }
    stop () {
        this.$el.html(this.initialBtnHtml);
    }
}