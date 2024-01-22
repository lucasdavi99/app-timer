import Contador from './Contador';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {

  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [estado, setEstado] = useState('selecionar');
  const [alarmeSound, setAlarmeSound] = useState([
    {
      selecionado: true,
      som: 'alarme1',
      file: require('./assets/alarme_alanzoka.mp3')
    }
  ]);

  var numeros = [];
  for (var i = 0; i <= 60; i++) {
    numeros.push(i);
  }

  function setAlarme() {
    let alarme = alarmeSound.map(function (alarme) {
      if (alarme.selecionado) {
        alarme.selecionado = false;
      } else {
        alarme.selecionado = true;
      }
      return alarme;
    });
    setAlarmeSound(alarme);
  }

  


  if (estado == 'selecionar') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        />
        <Text style={styles.textPrincipal}>Selecione seu Tempo</Text>
        <View style={styles.viewPicker}>
          <Text style={{ color: 'white' }}>Min:</Text>
          <Picker style={styles.picker} selectedValue={minutos} onValueChange={(itemValue) => setMinutos(itemValue)}>
            {
              numeros.map((numero) => { return <Picker.Item label={numero.toString()} value={numero} /> })
            }
          </Picker>
          <Text style={{ color: 'white' }}>Seg:</Text>
          <Picker style={styles.picker} selectedValue={segundos} onValueChange={(itemValue, itemIndex) => setSegundos(itemValue)}>
            {
              numeros.map((numero) => { return <Picker.Item label={numero.toString()} value={numero} /> })
            }
          </Picker>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {
            alarmeSound.map(function (alarme) {
              if (alarme.selecionado) {
                return (<TouchableOpacity onPress={() => setAlarme()} style={styles.btnAlarmeEscolhido}><Text style={styles.textAlarme}>{alarme.som}</Text></TouchableOpacity>)
              } else {
                return (<TouchableOpacity onPress={() => setAlarme()} style={styles.btnAlarme}><Text style={styles.textAlarme}>{alarme.som}</Text></TouchableOpacity>)
              }
            })
          }
        </View>

        <View>
          <TouchableOpacity onPress={() => {setEstado('iniciar')}} style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (estado == 'iniciar') {
    return (
      <Contador alarme={alarmeSound} setMinutos={setMinutos} setSegundos={setSegundos} setEstado={setEstado} minutos={minutos} segundos={segundos}></Contador>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#430380',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    colors: ['#000', 'transparent'],
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('100%'),
  },
  textPrincipal: {
    fontSize: hp('4%'),
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: hp('2.5%'),
  },
  picker: {
    width: wp('25%'),
    height: hp('7%'),
    color: '#fff'
  },
  viewPicker: {
    flexDirection: 'row',
  },
  startButton: {
    backgroundColor: '#fff',
    width: wp('30%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp('3%'),
  },
  startButtonText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#430380',
  },
  btnAlarme: {
    backgroundColor: '#fff',
    width: wp('30%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp('3%'),
    marginRight: wp('2%'),
  },
  btnAlarmeEscolhido: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: wp('30%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp('3%'),
    marginRight: wp('2%'),
    borderWidth: 2,
    borderColor: '#7b00f0',
  },
  textAlarme: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#430380',
  },
});
