import { FC, useEffect, useState } from "react"
import {
  FlatList,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  ListRenderItem,
  Pressable,
} from "react-native"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { Allergie, AllergieData } from "./Allergie"
import HealthSelectItem from "../HealthConcern/HealthSelectItem"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { addAllergieItems } from "@/redux/reducers/allergieSlice"

interface AllergiesScreenScreenProps extends AppStackScreenProps<"AllergiesScreen"> {}

export const AllergiesScreen: FC<AllergiesScreenScreenProps> = (_props) => {
  const { themed } = useAppTheme()
  const { navigation } = _props
  const data = useSelector((state: RootState) => state.allergie.data)
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState<string>("")

  const [allergies, setAllergies] = useState<Allergie[]>([])
  const [selectedAllergies, setSelectedAllergies] = useState<Allergie[]>([])

  useEffect(() => {
    setAllergies([...AllergieData])
    if (data) {
      setSelectedAllergies(data)
    }
    return () => {
      setAllergies([])
    }
  }, [])

  const filteredData = allergies.filter((item: Allergie) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderItem: ListRenderItem<Allergie> = ({ item }) => {
    return (
      <Pressable
        style={themed($renderItemStyle)}
        onPress={() => {
          setSelectedAllergies([...selectedAllergies, item])
          setSearchQuery("")
        }}
      >
        <Text text={item.name} preset="subheading" />
      </Pressable>
    )
  }

  const onPressNext = () => {
    dispatch(addAllergieItems(selectedAllergies))
    navigation.navigate("GetMyVitaminScreen")
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text
          text="Write any specific allergies or sensitivity toward specific things. ( Optional )"
          preset="subheading"
        />
        <View style={themed($topInnerContainer)}>
          <View style={themed($searchWrapper)}>
            {selectedAllergies.map((item: Allergie) => (
              <HealthSelectItem key={item.id} name={item.name} />
            ))}
            <TextInput
              style={themed($searchInput)}
              placeholder="Write any specific allergies..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onEndEditing={() => console.log(searchQuery)}
            />
          </View>
          <View style={themed($renderItemWrapperStyle)}>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
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
const $searchWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  columnGap: spacing.xs,
  height: spacing.xxxl,
  borderColor: colors.border,
  borderWidth: 1,
  margin: spacing.xxs,
  paddingLeft: spacing.sm,
  borderTopEndRadius: spacing.md,
  borderTopStartRadius: spacing.md,
})
const $searchInput: ThemedStyle<TextStyle> = ({ spacing }) => ({
  height: spacing.xxxl,
  borderWidth: 0,
  paddingLeft: spacing.sm,
})
const $renderItemWrapperStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingLeft: spacing.sm,
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.border,
  borderWidth: 1,
  borderBottomEndRadius: spacing.md,
  borderBottomStartRadius: spacing.md,
  marginTop: -5,
  margin: spacing.xxs,
})
const $renderItemStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  padding: spacing.xxxs,
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
