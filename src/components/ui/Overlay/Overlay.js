import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withViewport from '../../../decorators/withViewport';
import styles from './Overlay.scss';
import withStyles from '../../../decorators/withStyles';

@withViewport
@withStyles(styles)
class Overlay {

    static show = function(content) {
        console.log(432)
        var node = document.createElement('div');
        //this.node.className = 'b-overlay';
        //document.body.style.height = this.props.viewport.height;
        document.body.appendChild(node);
        //document.body.className += 'overlay-scroll-fix';

        ReactDOM.render(
            <Overlay content={content}/>,
            node
        );
    }

    render() {
        return (
            <div className="b-overlay">
                {this.props.content}
            </div>
        );
    }
}



export default Overlay;
