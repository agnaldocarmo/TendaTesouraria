/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,


} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'core-js/full/symbol/async-iterator';


import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';

import awsconfig from './src/aws-exports';

import "@aws-amplify/ui-react/styles.css";
import { studioTheme } from "./ui-components";
import {
  ProfileCard 
 } from './ui-components';

Amplify.configure(awsconfig);




Amplify.configure(awsconfig);

import { DataStore } from '@aws-amplify/datastore';
import { Pessoas } from './src/models';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  var num = 0;

  async function query(){
    const models = await DataStore.query(Pessoas);
    console.log(models);
  }

  async function insert(){
    await DataStore.save(
      new Pessoas({
      "nome": "Lorem ipsum dolor sit amet",
      "data_nasc": "1970-01-01Z",
      "cpf": "Lorem ipsum dolor sit amet",
      "movimentacoess": []
    })
  );

  }

 



  return (
    <ThemeProvider theme={studioTheme}>
      <ProfileCard />
    </ThemeProvider>
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        <TouchableOpacity style={styles.button} onPress={insert}>
          <Text>insere </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={query}>
          <Text>query</Text>
        </TouchableOpacity>        
        <View>
          <Text>You clicked {num} times</Text>
        </View>
          <Section title="Step One1">
            Edit <Text style={styles.highlight}>App.tsx</Text>  to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
