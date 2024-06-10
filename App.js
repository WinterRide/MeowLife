import { View, Text } from 'react-native';
import React from 'react';
import StackNavigator from './StackNavigator';
import { ModalPortal } from 'react-native-modals';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <>
      <UserProvider>
        <StackNavigator />
      </UserProvider>
      <ModalPortal />
    </>
  );
}

export default App;
