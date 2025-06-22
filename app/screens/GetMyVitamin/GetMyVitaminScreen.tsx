import { FC, useState } from "react"
import { Alert, View, ViewStyle } from "react-native"
import { Text, Screen, Button, Radio } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import RadioGroup from "./RadioGroup"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { addItems } from "@/redux/reducers/healthSlice"
import { addDietItems } from "@/redux/reducers/dietSlice"
import { addAllergieItems } from "@/redux/reducers/allergieSlice"

interface GetMyVitaminScreenScreenProps extends AppStackScreenProps<"GetMyVitaminScreen"> {}

export const GetMyVitaminScreen: FC<GetMyVitaminScreenScreenProps> = (_props) => {
  const { themed } = useAppTheme()
  const { navigation } = _props
  const healthDataFinal = useSelector((state: RootState) => state.health)
  const dietDataFinal = useSelector((state: RootState) => state.diet)
  const allergieDataFinal = useSelector((state: RootState) => state.allergie)
  const dispatch = useDispatch()

  const [isDailyExposure, setIsDailyExposure] = useState("Yes")
  const [isSomke, setIsSomke] = useState("No")
  const [alchol, setAlchol] = useState("0-1")

  const onPressGetVitamin = () => {
    const is_daily_exposure = isDailyExposure === "Yes" ? true : false
    const is_somke = isDailyExposure === "Yes" ? true : false
    const showData = {
      health_concerns: healthDataFinal?.data,
      diets: dietDataFinal?.data,
      is_daily_exposure,
      is_somke,
      alchol,
      allergies: allergieDataFinal?.data,
    }
    Alert.alert(
      "Infor",
      JSON.stringify(showData),
      [
        {
          text: "OK",
          onPress: () => {
            console.log(showData)
            dispatch(addItems([]))
            dispatch(addDietItems([]))
            dispatch(addAllergieItems([]))
            navigation.navigate("Welcome")
          },
        },
      ],
      { cancelable: true },
    )
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <RadioGroup
          title="Is your daily exposure to sun is limited ?"
          value={isDailyExposure}
          setValue={setIsDailyExposure}
        />
        <RadioGroup
          title="Do you current smoke ( tobacco or marijuana )?"
          value={isSomke}
          setValue={setIsSomke}
        />
        <View style={themed($topRadioContainer)}>
          <Text
            text="On averarge, how many alcoholic beverages do you have in a week ?"
            preset="subheading"
          />
          <Radio
            value={alchol === "0-1" ? true : false}
            onValueChange={() => setAlchol("0-1")}
            label="0-1"
          />
          <Radio
            value={alchol === "2-5" ? true : false}
            onValueChange={() => setAlchol("2-5")}
            label="2-5"
          />
          <Radio
            value={alchol === "5+" ? true : false}
            onValueChange={() => setAlchol("5+")}
            label="5+"
          />
        </View>
      </View>
      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Button preset="primary" onPress={onPressGetVitamin}>
          Get my personalize vitamin
        </Button>
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "80%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxxl,
})
const $topRadioContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  rowGap: spacing.sm,
  marginTop: spacing.lg,
})
const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "20%",
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
})
