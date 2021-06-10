import React, { useState, useEffect } from 'react';
import BottomDrawer from 'react-native-bottom-drawer-view';
import {Button, TextInput, Paragraph, Dialog, Portal ,FAB} from 'react-native-paper';
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
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    });
    Contacts.getAll().then(contacts => {
      // contacts returned
      const modififiedContacts = contacts.map((item, index) => {
        const isSelected=false;
        const statecon='No';
        return { name: item.displayName, index: index, isSelected:isSelected, statecon:statecon };
      });
      setContacts(modififiedContacts);
    });
  }, []);
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
