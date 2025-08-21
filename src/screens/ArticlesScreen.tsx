import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Animated,
    Dimensions,
    Image,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    image: any;
    isBookmarked: boolean;
}

const articlesData: Article[] = [
    {
        id: '1',
        title: 'The Art of Timing in Comedy',
        excerpt: 'Discover how perfect timing can transform a good joke into a great one. Learn the secrets of professional comedians...',
        category: 'Comedy Tips',
        readTime: '5 min read',
        image: require('../assets/img/Component21.png'),
        isBookmarked: false,
    },
    {
        id: '2',
        title: 'Building Your Comedy Routine',
        excerpt: 'Step-by-step guide to creating a compelling comedy routine that keeps audiences engaged and laughing...',
        category: 'Performance',
        readTime: '8 min read',
        image: require('../assets/img/Component322.png'),
        isBookmarked: false,
    },
    {
        id: '3',
        title: 'Dealing with Hecklers',
        excerpt: 'Professional strategies for handling difficult audience members while maintaining your composure...',
        category: 'Stage Presence',
        readTime: '6 min read',
        image: require('../assets/img/Component24.png'),
        isBookmarked: false,
    },
    {
        id: '4',
        title: 'Writing Jokes That Land',
        excerpt: 'Master the art of joke writing with proven techniques used by successful comedians worldwide...',
        category: 'Writing',
        readTime: '7 min read',
        image: require('../assets/img/Component25.png'),
        isBookmarked: false,
    },
    {
        id: '5',
        title: 'The Psychology of Laughter',
        excerpt: 'Understand what makes people laugh and how to use this knowledge to improve your comedy...',
        category: 'Theory',
        readTime: '9 min read',
        image: require('../assets/img/Component8.png'),
        isBookmarked: false,
    },
    {
        id: '6',
        title: 'Marketing Yourself as a Comedian',
        excerpt: 'Learn how to build your brand and get noticed in the competitive world of comedy...',
        category: 'Business',
        readTime: '6 min read',
        image: require('../assets/img/Component82.png'),
        isBookmarked: false,
    },
];

const categories: string[] = ['All', 'Comedy Tips', 'Performance', 'Stage Presence', 'Writing', 'Theory', 'Business'];

const ArticlesScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [articles, setArticles] = useState<Article[]>(articlesData);
    const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Appearance animation
        Animated.parallel([
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const toggleBookmark = (articleId: string) => {
        setBookmarkedArticles(prev => {
            if (prev.includes(articleId)) {
                return prev.filter(id => id !== articleId);
            } else {
                return [...prev, articleId];
            }
        });
        
        setArticles(prev => 
            prev.map(article => 
                article.id === articleId 
                    ? { ...article, isBookmarked: !article.isBookmarked }
                    : article
            )
        );
    };

    const filteredArticles = selectedCategory === 'All' 
        ? articles 
        : articles.filter(article => article.category === selectedCategory);

    const renderArticleCard = (article: Article, index: number) => (
        <Animated.View
            key={article.id}
            style={[
                styles.articleCard,
                {
                    opacity: fadeAnim,
                    transform: [{ 
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50 * (index + 1), 0]
                        })
                    }],
                }
            ]}
        >
            <View style={styles.articleImageContainer}>
                <Image source={article.image} style={styles.articleImage} resizeMode="cover" />
                <View style={styles.articleOverlay} />
                <TouchableOpacity 
                    style={styles.bookmarkButton} 
                    onPress={() => toggleBookmark(article.id)}
                >
                    <Text style={styles.bookmarkIcon}>
                        {article.isBookmarked ? '🔖' : '📖'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{article.category}</Text>
                </View>
            </View>

            <View style={styles.articleContent}>
                <View style={styles.articleHeader}>
                    <Text style={styles.articleTitle} numberOfLines={2}>
                        {article.title}
                    </Text>
                    <Text style={styles.readTime}>{article.readTime}</Text>
                </View>

                <Text style={styles.articleExcerpt} numberOfLines={3}>
                    {article.excerpt}
                </Text>

                <TouchableOpacity style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Read More</Text>
                    <Text style={styles.readMoreArrow}>→</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2C0000" />
            
            <Animated.View 
                style={[
                    styles.header,
                    {
                        opacity: headerAnim,
                        transform: [{ translateY: headerAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0]
                        })}]
                    }
                ]}
            >
                <Text style={styles.headerTitle}>Comedy Articles</Text>
                <Text style={styles.headerSubtitle}>
                    Learn from the best in the business
                </Text>
            </Animated.View>

            <View style={styles.categoriesContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesScroll}
                >
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.activeCategoryButton
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[
                                styles.categoryButtonText,
                                selectedCategory === category && styles.activeCategoryButtonText
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView 
                contentContainerStyle={styles.articlesContainer}
                showsVerticalScrollIndicator={false}
            >
                {filteredArticles.map((article, index) => renderArticleCard(article, index))}
                
                {filteredArticles.length === 0 && (
                    <Animated.View 
                        style={[
                            styles.emptyState,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: fadeAnim }]
                            }
                        ]}
                    >
                        <Text style={styles.emptyStateIcon}>📚</Text>
                        <Text style={styles.emptyStateTitle}>No articles found</Text>
                        <Text style={styles.emptyStateText}>
                            Try selecting a different category or check back later for new content!
                        </Text>
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C0000',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(44, 0, 0, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#E6B34A',
    },
    headerTitle: {
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'AmaticSC-Bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#E6B34A',
        textAlign: 'center',
        fontWeight: '600',
    },
    categoriesContainer: {
        paddingVertical: 20,
        backgroundColor: 'rgba(74, 4, 4, 0.3)',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 15,
    },
    categoriesScroll: {
        paddingHorizontal: 20,
    },
    categoryButton: {
        backgroundColor: 'rgba(106, 5, 5, 0.6)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    activeCategoryButton: {
        backgroundColor: 'rgba(230, 179, 74, 0.3)',
        borderColor: '#E6B34A',
        borderWidth: 2,
        transform: [{ scale: 1.05 }],
    },
    categoryButtonText: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    activeCategoryButtonText: {
        color: '#E6B34A',
        fontWeight: 'bold',
    },
    articlesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    articleCard: {
        backgroundColor: 'rgba(74, 4, 4, 0.9)',
        borderRadius: 20,
        marginBottom: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 15,
    },
    articleImageContainer: {
        position: 'relative',
        height: 200,
    },
    articleImage: {
        width: '100%',
        height: '100%',
        tintColor: '#E6B34A',
    },
    articleOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(44, 0, 0, 0.4)',
    },
    bookmarkButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
    },
    bookmarkIcon: {
        fontSize: 16,
    },
    categoryBadge: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        backgroundColor: 'rgba(230, 179, 74, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E6B34A',
    },
    categoryText: {
        color: '#2C0000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    articleContent: {
        padding: 20,
    },
    articleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    articleTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        lineHeight: 26,
        marginRight: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    readTime: {
        fontSize: 12,
        color: '#E6B34A',
        fontWeight: '600',
        backgroundColor: 'rgba(230, 179, 74, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.2)',
    },
    articleExcerpt: {
        fontSize: 16,
        color: '#E0E0E0',
        lineHeight: 22,
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(230, 179, 74, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 179, 74, 0.3)',
    },
    readMoreText: {
        color: '#E6B34A',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
    readMoreArrow: {
        color: '#E6B34A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 60,
    },
    emptyStateIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    emptyStateTitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default ArticlesScreen;
