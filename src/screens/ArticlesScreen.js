import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native';

const jokesData = [
    { text: "Why are we laughing? The Science of Humor.", full: 'An article that explains the scientific foundations of humor. What happens in the brain when we laugh? What hormones are released? How does humor affect our health? Various theories of humor (theory of superiority, theory of inconsistency, etc.).Laughter is not just a pleasant reaction, it is a complex neurological process! When we hear a joke, our brain activates a whole network of areas, including the prefrontal cortex (which processes information), the limbic system (which is responsible for emotions) and the motor cortex (which controls our muscles, making us laugh).  Endorphins are released, which reduce stress levels and boost mood.  Superiority theory suggests that we laugh when we feel better or smarter than someone else. The theory of incongruity suggests that laughter arises from an unexpected or illogical turn of events. And the relief theory says that humor helps us release suppressed emotions. Study the science of humor and find out why laughter is so important for our health and well-being!', img: require('../assets/img/cb984b7d29e6cc101c50fefd38a3713cbfec60a0.jpg') },
    {
        text: "Types of humor: from puns to black humor.",
        full: 'An overview of different styles and types of humor. The article describes puns, irony, sarcasm, parody, absurdity, black humor, stand-up, improvisation and other forms. Examples are given for each type and it is explained who might like it. The world of humor is incredibly diverse! From simple puns that make us roll our eyes ("Why do mathematicians always take a ladder with them? Because they need to raise fractions!"), to the point of subtle irony and sharp sarcasm.  Absurd humor makes us laugh at nonsense, and black humor allows us to deal with difficult topics.  Stand-up is the art of storytelling, and improvisation is pure spontaneity and creativity.  In this article, we will look at different types of humor so that you can find what you like the most!',
        img: require('../assets/img/e2356db41b177d9460c9d5f4247eaaba98beeebb.jpg')
    },
    {
        text: "Humor in different cultures: what is funny in one country may be offensive in another.",
        full: ' An exploration of how humor varies across cultures. What topics are taboo in different countries? How do history and traditions influence what is considered funny? Examples of cross-cultural errors in humor.Humor is a reflection of culture. A joke that causes laughter in one country may be incomprehensible or even offensive in another.  For example, in some cultures it is customary to ridicule politicians, while in others it is considered unacceptable.  Sarcasm is appreciated in some countries, while bluntness is appreciated in others.  Ignorance of cultural peculiarities can lead to misunderstandings and conflicts.  Find out how humor varies in different parts of the world, and avoid awkward situations!',
        img: require('../assets/img/037c1e28cea38eca15fdc1f6819ecc9970d5f7c1.jpg')
    },
    {
        text: "How to develop a sense of humor: practical tips and exercises.",
        full:'An article with tips on how to improve your sense of humor. Exercises are offered for the development of observation, the ability to see the absurd in everyday life, making puns and improvising. Do you think a sense of humor is a gift that either exists or not?  It\'s not like that!  A sense of humor can be developed like any other skill.  Start by developing your powers of observation - pay attention to funny moments in everyday life.  Try to come up with puns or funny stories.  Improvise - try to answer questions in a joking way.  Read books and watch comedies that you like.  And most importantly, don\'t be afraid to be stupid and funny!',
        img: require('../assets/img/728886c08bc74051d0409e0136c558d9be63ea1d.jpg')
    },
    {
        text: "The history of humor: from antiquity to the present day.",
        full:'An overview of the evolution of humor throughout history. From jokes and anecdotes of the Ancient world to modern stand-up and Internet memes. How the themes and styles of humor have changed over time. Humor has always existed.  Ancient Egypt and Greece had their own jokes and anecdotes.  In the Middle Ages, jesters entertained kings and nobles.  During the Renaissance, the Commedia dell\'arte Theater appeared.  In the 20th century, stand-up and comedy cinema flourished.  And in the 21st century, humor has moved to the Internet, where memes and viral videos rule the world.  Find out how themes and styles of humor have changed throughout history!',
        img: require('../assets/img/0fedf3d1861624aa4f32eaa6fdaff1dd1cd0b7e5.jpg')
    },

]

const ArticlesScreen = ({navigation}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View>
                    <Text style={styles.header}>Collection of articles</Text>
                </View>


                <ScrollView contentContainerStyle={styles.jokesContainer}>
                    {jokesData.map((joke, index) => (
                        <TouchableOpacity key={index} style={styles.jokeCard} onPress={() => {navigation.navigate('ArtInfoScreen')}}>
                            <Text style={styles.jokeText}>{joke.text}</Text>
                            <Image source={require('../assets/img/Component22.png')} />

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#450000',
        paddingTop: 60,
        flex: 1,
        paddingHorizontal: 16,
    },
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0)',
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 78,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 16,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: '#700000',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        height: 30,
        marginRight: 10,
    },
    activeFilter: {
        backgroundColor: '#ff5500',
    },
    filterText: {
        color: '#fff',
        fontSize: 14,
    },
    jokesContainer: {
        paddingBottom: 80,
    },
    jokeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    jokeText: {
        color: '#fff',
        width: '85%',
        fontSize: 16,
    },
});

export default ArticlesScreen;
