import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Home from './views/Home';
import Result from './views/Result';
import TFlow from './views/tfw';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Result" component={Result} />
        {/* <Stack.Screen name="TFlow" component={TFlow} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;