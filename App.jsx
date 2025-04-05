import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import HomeScreen from "./src/screen/HomeScreen";
import Entypo from "react-native-vector-icons/Entypo"                
import FontAwesome from "react-native-vector-icons/FontAwesome"                
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"                
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"   


const Tab = createBottomTabNavigator(); 


function Home(){
  return <View>
    <Text>Home</Text>
  </View>
}

const App = () => {
  return <NavigationContainer 
    >
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#E96E6E",
        tabBarInactiveTintColor: "#A9A9A9",
      }}>
      <Tab.Screen 
      name = "HOME" 
      component={HomeScreen} 
      options={{
        tabBarIcon:({size, focused, color})=>
        {
          return <Entypo name = {"home"} size = {size} color = {color}/>
        }
        }}/>
      <Tab.Screen 
        name = "REORDER" 
        component={Home} 
        options={{
          tabBarIcon:({size, focused, color})=>
            {
              return <FontAwesome name = {"reorder"} size = {size} color = {color}/>
            }
        }}/>
      <Tab.Screen
        name = "CART" 
        component={Home} 
        options={{
          tabBarIcon:({size, focused, color})=>
            {
              return <MaterialCommunityIcons name = {"cart"} size = {size} color = {color}/>
            }
        }}/>
      <Tab.Screen 
      name = "ACCOUNT" 
      component={Home}
      options={{
        tabBarIcon:({size, focused, color})=>
          {
            return <FontAwesome6 name = {"user"} size = {size} color = {color}/>
          }
      }}/>
    </Tab.Navigator>
  </NavigationContainer>
};

export default App;