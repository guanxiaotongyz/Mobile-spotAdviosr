import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { headerStyle } from './helper/helper';
import { StyleSheet } from "react-native";
import AddPic from "./screens/AddPic";
import SpotDetails from "./screens/SpotDetails";
import EditProfile from "./screens/EditProfile";
import Main from "./screens/Main";



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Picture" component={AddPic}/>
        <Stack.Screen name="SpotDetails" component={SpotDetails} options={{ headerTitle: "Spot Details" }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: "Edit Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});