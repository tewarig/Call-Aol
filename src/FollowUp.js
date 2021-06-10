import React, { useState, useEffect } from 'react';
import BottomDrawer from 'react-native-bottom-drawer-view';
import {Button, TextInput, Paragraph, Dialog, Portal ,FAB, Headline , ActivityIndicator} from 'react-native-paper';
import { KeyboardAvoidingView   } from 'react-native';

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Contacts from 'react-native-contacts';
import ListItemView from './component/ListItem'
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
const ContactScreen = function () {
  const initialValue = [
    {
      name: '',
      index: 0,
      isSelected:false,
      statecon:'NO'
    },
  ];
  const [con, setContacts] = useState(initialValue);
  const [isVisible,setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/tewarig/Dummy-api/main/testAPI.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  // useEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //     buttonPositive: 'Please accept bare mortal',
  //   });
  //   Contacts.getAll().then(contacts => {
  //     // contacts returned
  //     const modififiedContacts = contacts.map((item, index) => {
  //       const isSelected=false;
  //       const statecon='No';
  //       return { name: item.displayName, index: index, isSelected:isSelected, statecon:statecon };
  //     });
  //     setContacts(modififiedContacts);
  //   });
  // }, []);
  //issue ==>> displays 1
  //console.log('=================================================');
  const selectionHandler = (i)=>{
    let arr=con.map((item)=>{
      if(item.index===i.index){
        if(item.isSelected===false){
          item.isSelected=true;
          item.statecon='YES';
          return({...item});
        }else{
          item.isSelected=true;
          item.statecon='NO';
          return({...item});
        }
      }
      return({...item});
    })
    setContacts(arr);
    //console.log('con=> ',con);
  }
  
  return (
    
    <KeyboardAvoidingView style={style.container}>
      {/**uncomment the below code if you dont want to use flatlist */}
      {/**<ListItemView
      data={con}
      key={{item => item.index}}
      display={{item.name}={item.index}}
    /> */}
      {/* <FlatList
        data={con}
        keyExtractor={item => item.index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
            style={style.touchstyle}
            onPress={()=>{
              selectionHandler(item);
              }}
            >
              <Text style={style.title}>
                {item.name}={item.index}
              </Text>
              <Text style={style.title}>{item.statecon}</Text>
            </TouchableOpacity>
            
          );
        }}

      /> */}
       
       {isLoading ?   <ActivityIndicator animating={true} />
 : 
      ( <View >
          <FlatList
            data={data.numbers}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <>
              <View style={style.card}>
                <View style={style.headCard}>
              <Text>{item["method"]}</Text>
              <Headline style={style.head}>{item["title"]}</Headline>
              </View>
              <View style={style.otherData}>
              <Text style={style.colorGreay}>{item["time"]}</Text>
              <Text style={style.colorGreay}> By : {item["By:"]}</Text>
              </View>
              <View >
                <FAB icon="phone"></FAB>
              </View>
             
              </View>
              </>
            )}
          />
        </View>
      )}
      <FAB small icon="plus" style={style.fab} onPress={()=> setIsVisible(!isVisible)} />
      {/* <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal> */}
  {isVisible && <>
      <BottomDrawer startUP ={false} containerHeight={500} offset={49}>
        <ScrollView>
        <View>
          <Text style={{margin:10,marginLeft:20}}>Add User</Text>
          <TextInput
             placeholder="Name :"
          />
          <TextInput
             placeholder="E-mail  :"
          />
          <TextInput
             placeholder="Phone Number :"
          />
          <Button>Submit</Button>
          
          </View>
          </ScrollView>
          </BottomDrawer>
          </>
}
    </KeyboardAvoidingView>
    
    
  );
  
      
      

    
  

};

const style = StyleSheet.create({
  touchstyle:{
    marginTop:'5%',
    marginLeft:'10%',
    marginRight:'10%',
    height:50,
    width:'80%',
    borderRadius:4,
    backgroundColor:'green',
    justifyContent:'space-between',
    paddingHorizontal:25,
    flexDirection:'row',
    alignItems:'center',
  },
  head:{
   color: '#333',
  },
  headCard:{
  marginLeft: 5,
  },
  otherData:{
   color: '#e3e3e3',
   marginTop: '10%',
   

  },
  colorGreay:{
  color : '#757171',
  },
  card:{
    flexDirection: 'row',
    marginBottom: "5%",
    borderLeftWidth: 5,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 10,
    marginLeft: 5, 
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#e3e3e3',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color:'white',
    fontSize: 18,
  },
  
});

export default ContactScreen;
