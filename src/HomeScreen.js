import React, { useEffect, useState } from 'react';
import connectionApi from '../src/api/connection';
import {
  Button,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import Section from './Section';
import SectionRaw from './SectionRaw';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import CallLogs from 'react-native-call-log';
import RecordAudio from './RecordAudio';

const filter = {
  phoneNumbers: '9273651956',
  // minTimestamp: 1554443524241,
  // maxTimestamp: 1556354485386,
};

export default function HomeScreen({ navigation , route }) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Num, setNum] = useState('');

  const [selectedFormat, setSelectedFormat] = useState('');
  const [singleFile, setSingleFile] = useState('');
  const [callLogs, setCallLogs] = useState([]);
  const [reminderVisibility, setreminderVisibility] = useState(false);
  //Write this code inside useEffect
  //console.log(route.params.phone , "phonefromhomescreen")
  useEffect(()=>{
    if(!route.params){
        setNum('0123456789')
    }else{
      setNum(route.params.phone)
    }
})
  //================ Async code get item ==========================
  const gettime = async () => {
    try {
      const value = await AsyncStorage.getAllKeys();
      if (value == null) {
        // hide button reminder
        setreminderVisibility(true);
      }
    } catch (e) {
      // error reading value
    }
  };
  gettime();
  //=======================================================
  const selectOneFile = async () => {

    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CallLogs.load(-1, filter)
            .then(c => setCallLogs(c))
            .catch(err => console.log(err));
        } else {
          console.log('Call Log permission denied');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
 const onSubmit = async () => {
  const data =  {
    name: Name,
    email: Email,
    mobileNo : Num
} 

  try {
    
    const resp = await connectionApi.post('/newApi',  data );
    const name = resp.data.name
    console.log(resp);
} catch (err) {
    console.log(err);
}
navigation.navigate('FollowUp');

 }

 
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Section title="User Profile">
          <Text h1>Fill Details{'\n'}</Text>
        </Section>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={Name}
            placeholder="Enter Name Here"
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={Email}
            placeholder="Enter Email Here"
          />
          
        <Text>{Num}</Text>
        </View>
        
        
        <View style={styles.container}>
          <View style={styles.row}>
            <Button
              style={styles.button}
              title="Camera"
              onPress={() => navigation.navigate('Camera')}
            />
            <Button
              style={styles.button}
              title="Submit"
              onPress={() => onSubmit() }
            />
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  input2: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  button_Reminder: {

  },
});
