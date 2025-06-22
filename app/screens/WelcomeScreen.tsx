import { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Image } from "expo-image"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"

const sampleImg = require("../../assets/images/interview.svg")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = (_props) => {
  const { themed } = useAppTheme()
  const { navigation } = _props

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          text="Welcome to Daily Vita"
          preset="heading"
        />
        <Text
          text="Hello we are here to make your life healthier and happier"
          preset="subheading"
        />
      </View>

      <View style={themed($bodyContainer)}>
        <Image style={themed($welcomeImgStyle)} source={sampleImg} contentFit="contain" />
        <Text
          text="We will ask couple of questions to better understand your vitamin need"
          size="md"
        />
      </View>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Button preset="primary" onPress={() => navigation.navigate("HealthConcern")}>
          Get started
        </Button>
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "30%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxl,
})
const $bodyContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "50%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "20%",
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
})

const $welcomeImgStyle: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 252,
  width: "100%",
  marginVertical: spacing.xxl,
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
