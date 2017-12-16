import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './Home';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default RootNavigator;

AppRegistry.registerComponent('App', () => RootNavigator);
