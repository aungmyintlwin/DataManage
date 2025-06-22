import { FC, useEffect, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import DraggableFlatList from "react-native-draggable-flatlist"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { HealthConcern, HealthConcernData, PriotizeHealthConcern } from "./HealthConcern"
import PrioritizeItem from "./PrioritizeItem"
import HealthSelectItem from "./HealthSelectItem"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { addItems } from "@/redux/reducers/healthSlice"

interface HealthConcernScreenProps extends AppStackScreenProps<"HealthConcern"> {}

const jsonData = HealthConcernData

export const HealthConcernScreen: FC<HealthConcernScreenProps> = (_props) => {
  const { themed } = useAppTheme()
  const { navigation } = _props
  const data = useSelector((state: RootState) => state.health.data)
  const dispatch = useDispatch()

  const [healthConcerns, setHealthConcerns] = useState<HealthConcern[]>([])
  const [selectedPriotizeHealthConcern, setSelectedPriotizeHealthConcern] = useState<
    PriotizeHealthConcern[]
  >([...data])
  // const [data, setData] = useState<HealthConcern[]>([...jsonData])

  useEffect(() => {
    setHealthConcerns([...jsonData])
    return () => {
      setHealthConcerns([])
    }
  }, [])

  const onSelect = (item: HealthConcern) => {
    const currentItem = selectedPriotizeHealthConcern.find(
      (hItem: PriotizeHealthConcern) => hItem.id === item.id,
    )
    if (currentItem) {
      const higherPriotyItmes: PriotizeHealthConcern[] = []
      const lowerPriotyItmes: PriotizeHealthConcern[] = []
      selectedPriotizeHealthConcern.map((hItem: PriotizeHealthConcern) => {
        if (hItem.priority < currentItem.priority) {
          higherPriotyItmes.push(hItem)
        }
        if (hItem.priority > currentItem.priority) {
          higherPriotyItmes.push({ ...hItem, priority: hItem.priority-- })
        }
      })
      setSelectedPriotizeHealthConcern([...higherPriotyItmes, ...lowerPriotyItmes])
    } else {
      setSelectedPriotizeHealthConcern([
        ...selectedPriotizeHealthConcern,
        { ...item, priority: ++selectedPriotizeHealthConcern.length },
      ])
    }
  }

  const sortPriority = (data: PriotizeHealthConcern[]) => {
    const sortData = data.map((hItem: PriotizeHealthConcern, index: number) => {
      return { ...hItem, priority: ++index }
    })
    setSelectedPriotizeHealthConcern(sortData)
  }

  const onPressNext = () => {
    // console.log(selectedPriotizeHealthConcern, "onNext")
    if (!selectedPriotizeHealthConcern.length) {
      Alert.alert("Validation Error", "Select at least one")
      return
    } else {
      dispatch(addItems(selectedPriotizeHealthConcern))
      navigation.navigate("DietScreen")
    }
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text text="Select the top healthconcerns. *" preset="subheading" />
        <Text text="(up to 5)" size="sm" />
        <View style={themed($topInnerContainer)}>
          {healthConcerns &&
            healthConcerns.map((healthItem: HealthConcern) => {
              return (
                <HealthSelectItem
                  key={healthItem.id}
                  name={healthItem.name}
                  isSelected={selectedPriotizeHealthConcern.some(
                    (hItem: PriotizeHealthConcern) => hItem.id === healthItem.id,
                  )}
                  onPress={() => onSelect(healthItem)}
                />
              )
            })}
        </View>
      </View>

      <View style={themed($middleContainer)}>
        <Text text="Prioritize" preset="subheading" />
        <DraggableFlatList
          data={selectedPriotizeHealthConcern}
          onDragEnd={({ data }) => sortPriority(data)}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, drag, isActive, getIndex }) => (
            <PrioritizeItem item={item} drag={drag} isActive={isActive} getIndex={getIndex} />
          )}
        />
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
  flexBasis: "45%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  // paddingTop: spacing.xl,
})
const $topInnerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: spacing.md,
  rowGap: spacing.md,
})

const $middleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "45%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "15%",
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
