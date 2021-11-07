import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';


function HomeScreen({ navigation }) {

const [tulos, setTulos]= useState('');
const [operaattori1, setOperaattori1]= useState('');
const [operaattori2, setOperaattori2]= useState('');

const[text, setText] = useState('');
const[data, setData] = useState([]);

  const laske = operaattori => {
    console.log(operaattori1, operaattori2, operaattori);
    const [numero1, numero2] = [Number(operaattori1), Number(operaattori2)];
    switch (operaattori) {
      case '+':
        setTulos(numero1 + numero2)
        setData([...data, { key: text }]);
        setText(numero1 + ' + ' + numero2 + ' = ' + (numero1+numero2));
        break;
      case '-':
        setTulos(numero1 - numero2)
        setData([...data, { key: text }]);
        setText(numero1 + ' - ' + numero2 + ' = ' + (numero1-numero2));
        break;
    }
    setOperaattori1('');
    setOperaattori2('');
  }

  return (
    <View style={styles.container}>
      <Text>Tulos: {tulos} </Text>
      <TextInput style={styles.input}
      keyboardType='number-pad'
      onChangeText={text => setOperaattori1(text)}
      value={operaattori1}>
      </TextInput>

      <TextInput style={styles.input}
      keyboardType='number-pad'
      onChangeText={text => setOperaattori2(text)}
      value={operaattori2}>
      </TextInput>

      <View style={styles.operaattorit}>
        <View style={styles.nappula}>
          <Button title='+' onPress={()=> laske('+')}> </Button>
      </View>

      <View style={styles.nappula}>
          <Button title='-' onPress={()=> laske('-')}> </Button>

      <View style={styles.nappula}>
      <Button onPress={() => navigation.navigate('History', {data})}title="Historia"/>

      </View>
      </View>
    </View>
    </View>
  );
}

function SettingsScreen({ route, navigation}) {
  const{ data } = route.params;
  
  return (
<View style={styles.container}>
    <Text>Historia:</Text>

    

    <FlatList
     data={data}
     renderItem={({item}) =>
        <Text>{item.key}</ Text>}
        />
        </View>
  );
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Calculator') {
      iconName = 'calculator';
    } else if (route.name === 'History') {
      iconName = 'book';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Calculator" component={HomeScreen} />
        <Tab.Screen name="History" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 2,
    padding: 4,
    margin: 5,
    width: '40%',
  },
  operaattorit: {
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  nappula: {
    margin: 5,
    width: '100%'
    
  }
});