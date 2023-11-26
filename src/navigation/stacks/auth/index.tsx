import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types";
import { LoginScreen } from "../../../screens/LoginScreen";
import { VerificationCode } from "../../../screens/VerificationCode";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="VerificationCode" component={VerificationCode} />
    </AuthStack.Navigator>
  );
};
