import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DpdHeader() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>Header</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  rootContainer: {
    height: 50,
    paddingVertical: 16,
    backgroundColor: "red"
  },
  text: {
    
  }
})

