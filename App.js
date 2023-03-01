import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';


export default function App() {
  const [started, setStarted] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Axelo</Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 100,
          height: 100,
          backgroundColor: '#fff',
          borderRadius: 100,
          backgroundColor: 'red'
        }}
        onPress={() => {
          {
            if (started) {
              Accelerometer.removeAllListeners();
              setStarted(false);
            } else {
              Accelerometer.addListener((x, y, z) => {
                fetch('http://192.168.0.179:3000/acceleration', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify([x, y, z])
                })
                  .then(response => console.log(response))
                  .catch(error => console.error(error))
              })
            }
          }
        }
        }
      >
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 48
  }
});
