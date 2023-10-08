import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {

  const [contacts, setContacts] = useState([]);


  const getContacts = async () => {

    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data);
        console.log('Contacts: ');
        for (i = 0; i < data.length; i++) {
          console.log(data[i].firstName, data[i].lastName, data[i].phoneNumbers[0].number);
        }
      }
    }
  }


  const listSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (

    <View style={styles.container} >
      <Text style={{fontSize: 18}}>Contacts: </Text>
      
      <FlatList 
        style={{marginLeft : "5%", marginTop:10}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 16}}>{item.name}, {item.phoneNumbers[0].number}</Text>
        </View>} 
        data={contacts} 
        ItemSeparatorComponent={listSeparator} 
      />
      <Button title="Get contacts" onPress={getContacts} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, 
    marginBottom: 30,
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});