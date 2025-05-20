// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     ImageBackground, Image,
// } from 'react-native';
//
// const allJokes = [
//     {
//         text: "Two friends meet. One says, 'I'm getting married!' The second one: 'On whom?' The first one: 'On yourself! We got it all!' The second one: 'What about the parents?' The first one: 'They are against marriage. They say let him get divorced first!'",
//         category: 'Favorite'
//     },
//     {
//         text: "Two crows are talking: – Kar! 'What, Kar?' 'It's nothing...Oil painting.'",
//         category: 'Sad and cheerful'
//     },
//     {
//         text: "I always listen to the advice of others. I just do everything my own way later, but with the realization that I could have done worse.",
//         category: 'Evening wear'
//     }
// ];
//
// const categories = ['Favorite', 'Evening wear', 'Sad and cheerful'];
//
// const MyCollectionScreen = ({navigation}) => {
//     const [search, setSearch] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState(null);
//
//     const filteredJokes = allJokes.filter(joke =>
//         (!selectedCategory || joke.category === selectedCategory) &&
//         joke.text.toLowerCase().includes(search.toLowerCase())
//     );
//
//     return (
//       <ImageBackground
//         source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
//         style={styles.background}
//         resizeMode="cover">
//         <ScrollView style={styles.overlay}>
//           <View style={styles.headerRow}>
//             <Text style={styles.title}>
//               MY{'\n'}COLLECTION{'\n'}OF HUMOR
//             </Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => {
//                 navigation.navigate('NewJokeScreen');
//               }}>
//               <Image source={require('../assets/img/Component82.png')} />
//             </TouchableOpacity>
//           </View>
//
//           <View style={styles.searchSection}>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search"
//               placeholderTextColor="#ccc"
//               value={search}
//               onChangeText={setSearch}
//             />
//           </View>
//
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.categoryScroll}>
//             {categories.map(cat => (
//               <TouchableOpacity
//                 key={cat}
//                 style={[
//                   styles.categoryButton,
//                   selectedCategory === cat && styles.activeCategory,
//                 ]}
//                 onPress={() =>
//                   setSelectedCategory(selectedCategory === cat ? null : cat)
//                 }>
//                 <Text style={styles.categoryText}>{cat}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//
//           <ScrollView contentContainerStyle={styles.jokeContainer}>
//             {filteredJokes.map((joke, index) => (
//               <View key={index} style={styles.jokeCard}>
//                 <Text style={styles.jokeText}>{joke.text}</Text>
//                   <Image source={require('../assets/img/Component8.png')} />
//
//               </View>
//             ))}
//           </ScrollView>
//         </ScrollView>
//       </ImageBackground>
//     );
// };
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0)',
//         paddingTop: 60,
//         paddingHorizontal: 16
//     },
//     headerRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start'
//     },
//     title: {
//         fontSize: 58,
//         color: '#fff',
//         fontWeight: 'bold',
//         fontFamily: 'AmaticSC-Bold',
//         alignSelf: 'center',
//         marginBottom: 16,
//         textAlign: 'left',
//     },
//     addButton: {
//         backgroundColor: 'transparent',
//         padding: 10,
//         alignSelf: 'center',
//     },
//     addIcon: {
//         fontSize: 28,
//         color: '#fff'
//     },
//     searchSection: {
//         marginTop: 20
//     },
//     searchInput: {
//         backgroundColor: '#300000',
//         borderRadius: 20,
//         paddingHorizontal: 16,
//         paddingVertical: 20,
//         color: '#fff'
//     },
//     categoryScroll: {
//         marginTop: 16,
//         marginBottom: 8
//     },
//     categoryButton: {
//         backgroundColor: '#500000',
//         paddingVertical: 6,
//         paddingHorizontal: 14,
//         borderRadius: 20,
//         marginRight: 10
//     },
//     activeCategory: {
//         backgroundColor: '#ff5500'
//     },
//     categoryText: {
//         color: '#fff',
//         fontSize: 14
//     },
//     jokeContainer: {
//         paddingBottom: 100
//     },
//     jokeCard: {
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: 16,
//         padding: 14,
//         marginBottom: 12,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     jokeText: {
//         color: '#fff',
//         width: '85%',
//         fontSize: 15
//     }
// });
//
// export default MyCollectionScreen

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';

const categories = ['Favorite', 'Evening wear', 'Sad and cheerful'];

const MyCollectionScreen = ({ navigation }) => {
    const jokes = useSelector(state => state.jokes.list); // <-- Получение шуток из Redux
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredJokes = jokes.filter(joke =>
        (!selectedCategory || joke.category === selectedCategory) &&
        joke.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ImageBackground
            source={require('../assets/img/0e2dac62064077cb5876e816dbde3e6de782b7dc.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView style={styles.overlay}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>MY{'\n'}COLLECTION{'\n'}OF HUMOR</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('NewJokeScreen')}
                    >
                        <Image source={require('../assets/img/Component82.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#ccc"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                >
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.activeCategory,
                            ]}
                            onPress={() =>
                                setSelectedCategory(selectedCategory === cat ? null : cat)
                            }
                        >
                            <Text style={styles.categoryText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ScrollView contentContainerStyle={styles.jokeContainer}>
                    {filteredJokes.map((joke, index) => (
                        <View key={joke.id || index} style={styles.jokeCard}>
                            <Text style={styles.jokeText}>{joke.text}</Text>
                            <Image source={require('../assets/img/Component8.png')} />
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0)',
        paddingTop: 60,
        paddingHorizontal: 16
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 58,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        alignSelf: 'center',
        marginBottom: 16,
        textAlign: 'left',
    },
    addButton: {
        backgroundColor: 'transparent',
        padding: 10,
        alignSelf: 'center',
    },
    addIcon: {
        fontSize: 28,
        color: '#fff'
    },
    searchSection: {
        marginTop: 20
    },
    searchInput: {
        backgroundColor: '#300000',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
        color: '#fff'
    },
    categoryScroll: {
        marginTop: 16,
        marginBottom: 8
    },
    categoryButton: {
        backgroundColor: '#500000',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 10
    },
    activeCategory: {
        backgroundColor: '#ff5500'
    },
    categoryText: {
        color: '#fff',
        fontSize: 14
    },
    jokeContainer: {
        paddingBottom: 100
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
        fontSize: 15
    }
});

export default MyCollectionScreen;
