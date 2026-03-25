import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MainColors, EraColors, QuizResultColors, Typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';



export default function GuideScreen() {
  return (
    <View style={styles.container}>

        <View style ={styles.titleContainer}>
      <Text style={styles.title}>Do You Know {"\n"}Who Your Guide Is?</Text>
        </View>
        <View style={styles.cardsContainer}>
        
        {/* Educator card */}
        <Link
        href={{ pathname: '/', params: { year: '1914' } }}
        asChild
        >
        <TouchableOpacity style ={styles.card}>
        <View style={styles.diagonal} />
            <View style ={styles.goCircle}>
                <Ionicons name="arrow-forward" size={24} color="white" style={{ alignSelf: "center", marginTop: 18,  transform: [{ rotate: "-45deg" }]}} />

            </View>

            <View style={{ marginVertical: 30, alignSelf: "flex-start" }}>
            <Text style={styles.cardText}>
                <Text style={{ color: QuizResultColors.educatorGold }}>
                The Culture Buff
                </Text>{" "}
                from the
            </Text>
            <Text style={[styles.cardText, styles.fullLine, { color: QuizResultColors.educatorGold}]}>
            Golden Age
            </Text>
            </View>
            <Image source={require("../assets/images/Academic.png")} style={{ width: "90%", height: "60%", borderRadius: 24, marginTop: 2 }} />
            </TouchableOpacity>
        </Link>
        
        {/* Writer card */}
        <Link
        href={{ pathname: '/', params: { year: '1939' } }}
        asChild
        >
        <TouchableOpacity style ={styles.card}>
        <View style={styles.diagonal} />
            <View style ={styles.goCircle}>
                <Ionicons name="arrow-forward" size={24} color="white" style={{ alignSelf: "center", marginTop: 18,  transform: [{ rotate: "-45deg" }]}} />

            </View>
            <View style={{ marginVertical: 30, alignSelf: "flex-start" }}>
            <Text style={[styles.cardText, {paddingRight: 12}]}>
                <Text style={{ color: QuizResultColors.writerBlue }}>
                The Unsung Hero Guide
                </Text>{" "}
                from the
            </Text>
            <Text style={[styles.cardText, styles.fullLine, { color: QuizResultColors.writerBlue}]}>
            Era of War & Partitions
            </Text>
            </View>
            <Image source={require("../assets/images/Writer.png")} style={{ width: "90%", height: "60%", borderRadius: 24, marginTop: -2 }} />
            </TouchableOpacity>
        </Link>
        
        {/* Crafter card */}
        <Link
        href={{ pathname: '/', params: { year: '1686' } }}
        asChild
        >
        <TouchableOpacity style ={styles.card}>
        <View style={styles.diagonal} />
            <View style ={styles.goCircle}>
                <Ionicons name="arrow-forward" size={24} color="white" style={{ alignSelf: "center", marginTop: 18,  transform: [{ rotate: "-45deg" }]}} />

            </View>
            <View style={{ marginVertical: 30, alignSelf: "flex-start" }}>
            <Text style={styles.cardText}>
                <Text style={{ color: QuizResultColors.crafterGreen }}>
                The Crafter
                </Text>{" "}
                from the
            </Text>
            <Text style={[styles.cardText, styles.fullLine, { color: QuizResultColors.crafterGreen }]}>
            Rebirth of Poland
            </Text>
            </View>
            <Image source={require("../assets/images/Crafting.png")} style={{ width: "90%", height: "60%", borderRadius: 24, marginTop: -2 }} />
            </TouchableOpacity>
        </Link>

        {/* Explorer card */}
        <Link
        href={{ pathname: '/', params: { year: '1948' } }}
        asChild
        >
        <TouchableOpacity style ={styles.card}>
        <View style={styles.diagonal} />
            <View style ={styles.goCircle}>
                <Ionicons name="arrow-forward" size={24} color="white" style={{ alignSelf: "center", marginTop: 18,  transform: [{ rotate: "-45deg" }]}} />

            </View>

            <View style={{ marginVertical: 30, alignSelf: "flex-start" }}>
            <Text style={styles.cardText}>
                <Text style={{ color: QuizResultColors.explorerRed }}>
                The Adventurer
                </Text>{" "}
                from the
            </Text>
            <Text style={[styles.cardText, styles.fullLine, {color:QuizResultColors.explorerRed}]}>
                World War II & Occupation
            </Text>
            </View>

            <Image source={require("../assets/images/Explorer.png")} style={{ width: "90%", height: "60%", borderRadius: 24, marginTop: -2 }} />

            </TouchableOpacity>
        </Link>

    {/* Button */}
    </View>

        <View style={{ alignSelf: "flex-end", marginTop: 24, marginHorizontal: 54 }}>
        <Link
        href={{ pathname: '/', params: { year: '1635' } }}
        asChild
        >
            <TouchableOpacity style={{ backgroundColor: MainColors.pointRed, paddingHorizontal: 40, paddingVertical: 12, borderRadius: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Link href="/">
                <Text style={{ color: "white", fontSize: Typography.button.fontSize, fontWeight: "black", fontFamily: Typography.button.fontFamily }}>Explore the map yourself</Text>
                <Ionicons name="arrow-forward" size={18} color="white" style={{ marginLeft: 8,}} />
                </Link>
            </TouchableOpacity>
            </Link>
        </View>
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MainColors.backgroundBeige,
  },
    card: {
        width: 300,
        height: 340,
        backgroundColor: "white",
        borderRadius: 24,
        marginVertical: 20,
        alignItems: "center",
        zIndex: 1,
        shadowColor: "#3d3d3d",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 3.84,
        elevation: 8,

    },
    cardsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        paddingHorizontal: 40,
        marginTop: 40,
    },
    cardText: {
        fontSize: 18,
        fontWeight: "black",
        fontFamily: "Inter-Black",
        textAlign: "left",
        marginHorizontal: 20,
        width: "60%",
        alignSelf: "flex-start",
        color: "#000",
        lineHeight: 26,
      },
    diagonal: {
        position: "absolute",
        top: -40,
        right: -40,
        width: 80,
        height: 80,
        backgroundColor: MainColors.backgroundBeige,
        transform: [{ rotate: "45deg" }],
        zIndex: 2,
      },
      fullLine: {
        width: "100%",
        alignSelf: "stretch",
        marginTop: -24,
      },

    goCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 3,
    },
  title: {
    fontSize: 70,
    fontWeight: "black",
    fontFamily: "Inter-Black",
    zIndex: 3,
  },
    titleContainer: {
        marginHorizontal: 60,
        width: "60%",
        zIndex: 3,
        alignSelf: "flex-start",
    },
});