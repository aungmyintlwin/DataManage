import { memo } from "react"
import { HealthConcern } from "./HealthConcern"
import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist"
import { Pressable, View, ViewStyle } from "react-native"
import { Icon } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, ThemedStyle } from "@/theme"
import HealthSelectItem from "./HealthSelectItem"

const PrioritizeItem = ({ item, drag, isActive }: RenderItemParams<HealthConcern>) => {
  const { themed } = useAppTheme()
  return (
    <ScaleDecorator>
      <View
        // onLongPress={drag}
        // disabled={isActive}
        style={themed([
          $container,
          { backgroundColor: isActive ? colors.palette.secondary200 : colors.palette.neutral100 },
        ])}
      >
        <HealthSelectItem name={item.name} />
        <Pressable onLongPress={drag} disabled={isActive}>
          <Icon icon="menu" />
        </Pressable>
      </View>
    </ScaleDecorator>
  )
}
export default memo(PrioritizeItem)
const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: 52,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.xs,
  borderRadius: spacing.md,
  paddingHorizontal: spacing.md,
  borderWidth: spacing.xxxs,
  borderColor: colors.palette.neutral400,
})
