
import React from 'react'
import AppNavigator from './src/AppNavigator'
import { Provider } from 'react-redux'
import {store} from './src/redux/store'
import { StatusBar } from 'react-native'

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#0448D0'}/>
      <AppNavigator />
    </Provider>
    
  )
}

export default App