
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

export default function Routes(){
  return (
    <NavigationContainer>

      <AppStack.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          justifyContent: 'center'
        },
      }} >

        <AppStack.Screen name="Main" component={Main} options={{ title: 'Usuários' }} />
        <AppStack.Screen name="User" component={User} options={({ route }) => ({ title: route.params.user.name })} />
        <AppStack.Screen name="Repository" component={Repository} options={({ route }) => ({ title: route.params.repository.name })} />

      </AppStack.Navigator>

    </NavigationContainer>
  )
}
