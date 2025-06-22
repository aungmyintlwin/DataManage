import { memo } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, spacing, ThemedStyle } from "@/theme"
type Props = {
  name: string
  isSelected?: boolean
  onPress?: () => void
}
const HealthSelectItem = ({ name, isSelected, onPress }: Props) => {
  const { themed } = useAppTheme()
  if (onPress) {
    return (
      <Pressable
        style={themed([
          $nameWrapper,
          {
            borderColor: colors.palette.neutral400,
            backgroundColor: isSelected
              ? colors.palette.primaryBtnColor
              : colors.palette.neutral100,
            borderWidth: !isSelected ? 1 : 0,
          },
        ])}
        onPress={onPress}
      >
        <Text
          style={themed([
            $nameTxt,
            {
              color: !isSelected ? colors.text : colors.palette.neutral100,
              paddingHorizontal: spacing.xxs,
            },
          ])}
        >
          {name}
        </Text>
      </Pressable>
    )
  }
  return (
    <View style={themed($nameWrapper)}>
      <Text style={themed($nameTxt)}>{name}</Text>
    </View>
  )
}
export default memo(HealthSelectItem)

const $nameWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primaryBtnColor,
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxs,
  borderRadius: spacing.md,
})
const $nameTxt: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
})
