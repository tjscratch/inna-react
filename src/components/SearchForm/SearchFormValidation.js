class SearchFormValidation {

    constructor(props) {
        super.constructor(props);
        this.toId = {
            value: props.toId,
            valid: false,
            error: null
        };
    }

    validation() {
        console.log(this)
        return 3
    }

}

module.exports = SearchFormValidation;