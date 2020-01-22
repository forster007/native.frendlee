import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack(params) {
  _navigator.dispatch(
    NavigationActions.back({
      params,
    })
  );
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
