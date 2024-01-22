import { Audio } from 'expo-av';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Contador(props) {
    var done = false;

    useEffect(() => {
        const timer = setInterval(() => {
            if (props.segundos > 0) {
                props.setSegundos(props.segundos - 1);
            } else {
                if (props.minutos > 0) {
                    props.setMinutos(props.minutos - 1);
                    props.setSegundos(59);
                } else if (!done) {
                    props.setEstado('selecionar');
                    props.setMinutos(0);
                    props.setSegundos(0);
                    playSound();
                }
            }
        }, 1000);
        return () => clearInterval(timer);
    })

    function zerar() {
        props.setEstado('selecionar');
        props.setMinutos(0);
        props.setSegundos(0);
    }

    function formatarNumero(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    async function playSound() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('./assets/alarme_alanzoka.mp3'));
            await soundObject.playAsync();
        } catch (error) {
            console.log(error);
        }
    }

    var segundos = formatarNumero(props.segundos);
    var minutos = formatarNumero(props.minutos);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <Text style={styles.textPrincipal}>{minutos}:{segundos}</Text>
            <View>
                <TouchableOpacity onPress={() => zerar()} style={styles.startButton}>
                    <Text style={styles.startButtonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
});
