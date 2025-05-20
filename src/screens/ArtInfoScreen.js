import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ArtInfoScreen = ({navigation}) => {
    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={{ flex: 1,}}
        >
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image source={require('../assets/img/Component20.png')} />
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={() => {navigation.goBack()}}>*/}
                    {/*    <Image source={require('../assets/img/Componentw8.png')} />*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <Text style={styles.quote}>
                    "HUMOR IN DIFFERENT CULTURES: WHAT IS FUNNY IN ONE COUNTRY MAY BE OFFENSIVE IN ANOTHER."
                </Text>

                <View style={styles.imageGrid}>
                    <Image source={require('../assets/img/e2356db41b177d9460c9d5f4247eaaba98beeebb.jpg')} style={styles.image} />
                </View>

                <Text style={styles.text}>
                    An exploration of how humor varies across cultures. What topics are taboo in different
                    countries? How do history and traditions influence what is considered funny? Examples of
                    cross-cultural errors in humor.{"\n\n"}
                    Humor is a reflection of culture. A joke that causes laughter in one country may be
                    incomprehensible or even offensive in another. For example, in some cultures it is
                    customary to ridicule politicians, while in others it is considered unacceptable. Sarcasm
                    is appreciated in some countries, while bluntness is appreciated in others. Ignorance of
                    cultural peculiarities can lead to misunderstandings and conflicts. Find out how humor
                    varies in different parts of the world, and avoid awkward situations!
                </Text>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
};

const { width } = Dimensions.get('window');
const imageSize = width / 4 - 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0)',
        // paddingTop: 60,
        // paddingHorizontal: 16,
    },
    scrollContent: {
        padding: 16,
        alignItems: 'center',
    },
    quote: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'AmaticSC-Bold',
        // fontWeight: 'bold',
        textAlign: 'center',

        marginBottom: 16,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'AmaticSC-Bold',
        fontSize: 30,
        // lineHeight: 22,
    },
});

export default ArtInfoScreen;
