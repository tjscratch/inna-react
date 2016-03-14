import React, { PropTypes, Component } from 'react';
import withViewport from '../../decorators/withViewport';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Provider } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

@withViewport class ProviderWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { viewport, component } = this.props;

        //не показываем панель в продакте и в моб. версии
        if (canUseDOM && __DEV__ && !viewport.isMobile) {
            return (
                <div>
                    <Provider store={getStore()}>{component}</Provider>
                    <DebugPanel top right bottom>
                        <DevTools store={getStore()} monitor={LogMonitor} />
                    </DebugPanel>
                </div>
            )
        }
        else {
            return <Provider store={getStore()}>{component}</Provider>;
        }
    }

}

export default ProviderWrapper;
