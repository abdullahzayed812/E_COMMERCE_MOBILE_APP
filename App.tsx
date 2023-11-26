/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// C2C88888Percentage
// RAM30
import React from "react";
import { Provider } from "react-redux";
import { RootStackScreen } from "./src/navigation";
import { store } from "./src/redux/store";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ToastProvider
          placement="bottom"
          // placement="top"
          duration={5000}
          animationType="zoom-in"
          // animationType='slide-in'
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          // icon={<Icon />}
          // successIcon={<SuccessIcon />}
          // dangerIcon={<DangerIcon />}
          // warningIcon={<WarningIcon />}
          textStyle={{ fontSize: 20 }}
          offset={50} // offset for both top and bottom toasts
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled={true}
        >
          <RootStackScreen />
        </ToastProvider>
      </Provider>
    </>
  );
};

export default App;
