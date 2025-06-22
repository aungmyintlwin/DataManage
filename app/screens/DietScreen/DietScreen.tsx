import { FC, useEffect, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { Diet, DietsData } from "./Diet"
import CheckBoxItem from "./CheckBoxItem"
import { useDispatch } from "react-redux"
import { addDietItems } from "@/redux/reducers/dietSlice"

interface DietScreenScreenProps extends AppStackScreenProps<"DietScreen"> {}

export const DietScreen: FC<DietScreenScreenProps> = (_props) => {
  const { themed } = useAppTheme()
  const { navigation } = _props
  const dispatch = useDispatch()

  const [diets, setDiets] = useState<Diet[]>([])
  const [selectNone, setSelectNone] = useState<boolean>(false)
  const [checkedState, setCheckedState] = useState<boolean[]>([])
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    )

    setCheckedState(updatedCheckedState)
    setSelectNone(false)
  }

  useEffect(() => {
    setDiets([...DietsData])
    setCheckedState(new Array(DietsData.length).fill(false))
    return () => {
      setDiets([])
    }
  }, [])

  const onPressNext = () => {
    if (!selectNone && !checkedState.includes(true)) {
      Alert.alert("Validation Error", "Check at least one")
      return
    } else {
      const checkedItems: Diet[] = []
      checkedState.map((item, index) => {
        if (item) {
          checkedItems.push(diets[index])
        }
      })
      console.log(checkedItems)
      dispatch(addDietItems(checkedItems))
      navigation.navigate("AllergiesScreen")
    }
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text text="Select the diet you follow. *" preset="subheading" />
        <View style={themed($topInnerContainer)}>
          <CheckBoxItem
            name="None"
            showTooltip={false}
            value={selectNone}
            onChange={() => {
              setSelectNone(!selectNone)
              setCheckedState(new Array(DietsData.length).fill(false))
            }}
          />
          {diets.map(({ id, name, tool_tip }: Diet, index: number) => {
            return (
              <CheckBoxItem
                key={id}
                name={name}
                tool_tip={tool_tip}
                value={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
            )
          })}
        </View>
      </View>
      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <View style={themed($bottomBtnContainer)}>
          <Button preset="textBtn" onPress={() => navigation.goBack()}>
            Back
          </Button>
          <Button preset="primary" textStyle={themed($bottomNextBtnText)} onPress={onPressNext}>
            Next
          </Button>
        </View>
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
const $topInnerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "20%",
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
})
const $bottomBtnContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
})
const $bottomNextBtnText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})
