import { Dispatcher } from 'flux';
import { ActionConstants as Constants} from '../../scripts/constants/constants';
class DispatcherClass extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: Constants.VIEW_ACTION,
      action: action,
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: Constants.SERVER_ACTION,
      action: action,
    });
  }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;