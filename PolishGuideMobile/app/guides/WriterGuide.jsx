import { Text, View, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { colors } from "../../theme/colors";
import {typography} from "../../theme/typography";
import RetryButton from "../../components/Buttons/RetryButton";

export default function Index() {
  return (
    <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
    }}
      >
        <Text style={[typography.h2, { textAlign: "center", width: 350,       marginTop: 40 }]}>
        Your Guide: 
        <Text style={[typography.h2, { color: "#4E6CD8" }]}> The Unsung Hero Guide </Text>from the{" "}
        <Text style={[typography.h2, { color: "#4E6CD8" }]}>
        Era of Wars & Partitions
        </Text>
        </Text>
        <Image
          source={require("../../assets/images/WriterMobile.png")}
          style={{ width: 260, height: 260, marginTop: 40 }}
        />
        <Text style={[typography.p, { textAlign: "center", width: 320, marginTop: 20, }]}>
        Based on your answers, your Polish history guide is <Text style={typography.pBold}>The Unsung Hero Guide.</Text>
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 360, marginTop: 20, }]}>
        Explore how Poland’s identity was maintained throughout this era through
        the resilience, courage and hearts of its people.
        </Text>

        {/* You May Like */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#4E6CD8" }]}>
          You May Like
        </Text>
        <View style = {{width: 360, backgroundColor: colors.white, height: 48, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style = {typography.p}> Cultural resistance</Text>
        </View>
        <View style = {{width: 360, backgroundColor: colors.white, height: 48, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style = {typography.p}>Hope for independence</Text>
        </View>

        {/* Historical Events */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#4E6CD8" }]}>
        Historical events to explore
        </Text>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
          <View style ={{width: 64, height: 42, backgroundColor: "#4E6CD8", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1772</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>First Partition </Text> 
            {"\n"}
            Russia, Prussia, and Austria take parts of Poland.
          </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#4E6CD8", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1793</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Second Partition </Text> 
            {"\n"}
            More Polish land is taken.
          </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#4E6CD8", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1795</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Third Partition  </Text> 
            {"\n"}
            Poland is completely erased from the map.
          </Text>
        </View>


        {/* Contents you can explore */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#4E6CD8" }]}>
        Contents you can explore        
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 350, marginTop: 10, marginBottom: 20, }]}>
        Click on the links below to explore more!
        </Text>

        <TouchableOpacity 
        onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Partitions_of_Poland")}
        style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Partitions1.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>Partitions of Poland </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://www.youtube.com/watch?v=ftmoWPu81j4")}       
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Partitions2.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
          Partitions of Poland: 
            {"\n"}
            Every Day
              </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://urbanlabsce.eu/the-mark-of-partitions-on-polish-identity/")}  
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Partitions3.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
            The Mark of Partitions 
            {"\n"}
            on Polish Identity
              </Text> 
        </TouchableOpacity>

        <RetryButton onPress={() => {}} />

    </ScrollView>
  );
}
