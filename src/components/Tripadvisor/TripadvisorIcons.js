import React from 'react';

class TripadvisorIcons extends React.Component {
  constructor (props) {
    super(props);
  }

  getTaFactorArray (taFactor) {
    var result = [];
    //округляем до меньшего целого (3.5 -> 3)
    for (let i = 1; i <= Math.floor(taFactor); i++) {
      result.push(1);//целый круг
    }
    //если осталось дробное - то добавляем половину звезды
    if (taFactor - Math.floor(taFactor) >= 0.5) {
      result.push(0);//половинка
    }
    return result;
  }

  render () {
    var data = this.props.data ? this.props.data : null;

    if (data) {
      var taFactor = this.getTaFactorArray(data);

      return (
        <div>
          {taFactor.map((item, ix)=> {
            if (item == 1) {
              return (<img key={ix} src={require('./tripadvisor-like.png')}/>)
            }
            else {
              return (<img key={ix} src={require('./tripadvisor-half.png')}/>)
            }
          })}
        </div>
      );
    }

    return null;
  }
}

export default TripadvisorIcons;
