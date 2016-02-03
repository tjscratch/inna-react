import React, { PropTypes, Component } from 'react';
import styles from './DropDown.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            selectedIndex: 0
        };
    }

    componentDidMount() {
        this.triggerChange(0);
    }

    componentWillReceiveProps(nextProps) {
        var { values } = this.props;
        var newValues = nextProps.values;

        if (values && newValues) {
            //если изменилось кол-во - обновляем выделенный
            if (values.length != newValues.length) {
                //выбираем нулевой
                this.setState({
                    selectedIndex: 0
                });
                //генерим change
                this.triggerChange(0);
            }
        }
    }


    toggleOpen(forceOpen) {
        var { isOpened } = this.state;

        //если задано состояние - тогда проставляем
        if (forceOpen !== undefined) {
            isOpened = forceOpen;
        }
        else {
            //если нет - переключаем
            isOpened = !isOpened;
        }

        this.setState({
            isOpened: isOpened
        })
    }

    selectItem(ix) {
        this.toggleOpen(false);

        this.setState({
            selectedIndex: ix
        });

        this.triggerChange(ix);
    }

    triggerChange(selectedIndex) {
        var { onChange, values } = this.props;
        if (onChange) {
            var value = values ? values[selectedIndex].value : null;
            if (value) {
                onChange(value);
            }
        }
    }

    onFocus() {
        this.toggleOpen(true);
    }

    onClick() {
        this.toggleOpen(true);
    }

    onBlur() {
        //даем отработать onClick на списке
        setTimeout(()=> {
            //затем закрываем
            this.toggleOpen(false);
        }, 100);
    }

    selectNext(next) {
        var { selectedIndex} = this.state;
        var { values } = this.props;

        if (next) {
            selectedIndex++;
        }
        else {
            selectedIndex--;
        }

        //bounds
        if (selectedIndex > values.length - 1) {
            selectedIndex = values.length - 1;
        }
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }

        this.setState({
            selectedIndex: selectedIndex
        });

        this.triggerChange(selectedIndex);
    }

    onKey(e) {
        switch (e.keyCode){
            case 13:
                this.toggleOpen(); break;
            case 27:
                this.toggleOpen(false); break;
            //up, left
            case 38:
            case 37:
                this.selectNext(false); break;
            //down, right
            case 40:
            case 39:
                this.selectNext(true); break;
        }
    }

    renderItems(item, ix) {
        var { selectedIndex } = this.state;
        var isActive = (ix == selectedIndex);
        return (
            <div key={ix} className={`b-drop-down-select-item ${isActive ? 'b-drop-down-select-item_active' : ''}`}
                 onClick={()=>{this.selectItem(ix)}}>{item.name}</div>
        )
    }

    render() {
        var { className, type, placeholder } = this.props;
        var { values } = this.props;
        var { isOpened, selectedIndex } = this.state;
        var selValue = values ? values[selectedIndex] : null;
        var value = selValue ? selValue.name : '';

        return (
            <div className="b-drop-down">
                <input readOnly={true} className={className} type={type} placeholder={placeholder}
                       value={value} defaultValue=""
                       onFocus={()=>{this.onFocus()}}
                       onBlur={()=>this.onBlur()}
                       onClick={()=>{this.onClick()}}
                       onKeyDown={(e)=>this.onKey(e)}/>
                {
                    isOpened && values && values.length > 1 ? //выводим если больше 1 пункта
                        <div className="b-drop-down-select">
                            {values.map(this.renderItems, this)}
                        </div> : null
                }
            </div>
        );
    }

}

export default DropDown;
