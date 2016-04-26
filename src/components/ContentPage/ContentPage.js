/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './ContentPage.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ContentPage extends React.Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);
    this.context.onSetMeta("description", this.props.description);
    return (
      <div className="ContentPage">
        <div className="ContentPage-container">
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default ContentPage;
