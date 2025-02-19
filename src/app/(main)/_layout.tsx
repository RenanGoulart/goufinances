import { theme } from "@/src/global/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000'
        }
      }}
    >
      <Tabs.Screen
        name='categories/index'
        options={{
          title: 'Categorias',
          tabBarIcon: ({ focused }) => <MaterialIcons name="category" size={24} color={focused ? theme.colors.primary.main : "#fff"} />,
          tabBarActiveTintColor: theme.colors.primary.main,
        }}
      />
      <Tabs.Screen
        name='home/index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <MaterialIcons name="home" size={24} color={focused ? theme.colors.primary.main : "#fff"} />,
          tabBarActiveTintColor: theme.colors.primary.main,
        }}
      />
      <Tabs.Screen
        name='paymentMethods/index'
        options={{
          title: 'Pagamentos',
          tabBarIcon: ({ focused }) => <MaterialIcons name="credit-card" size={24} color={focused ? theme.colors.primary.main : "#fff"} />,
          tabBarActiveTintColor: theme.colors.primary.main,
        }}
      />
    </Tabs>
  )
}
