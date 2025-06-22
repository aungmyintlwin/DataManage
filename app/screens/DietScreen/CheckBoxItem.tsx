import { memo, useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { Checkbox, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, spacing, ThemedStyle } from "@/theme"
import Tooltip, { Placement } from "react-native-tooltip-2"
import AntDesign from "@expo/vector-icons/AntDesign"
type Props = {
  name?: string
  tool_tip?: string
  showTooltip?: boolean
  value?: boolean
  checked?: boolean
  onChange?: () => void
}
const CheckBoxItem = ({ name, tool_tip, showTooltip = true, value, onChange }: Props) => {
  const { themed } = useAppTheme()
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false)

  return (
    <View style={themed($wrapper)}>
      <View style={themed($wrappeCheckbox)}>
        <Checkbox value={value} onValueChange={onChange} label={name} />
      </View>
      {showTooltip && (
        <Tooltip
          isVisible={toolTipVisible}
          content={<Text text={tool_tip} size="xxs" />}
          placement={Placement.RIGHT}
          onClose={() => setToolTipVisible(false)}
        >
          <Pressable onPress={() => setToolTipVisible(true)}>
            <AntDesign name="infocirlce" size={spacing.lg} color={colors.tint} />
          </Pressable>
        </Tooltip>
      )}
    </View>
  )
}
export default memo(CheckBoxItem)

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: spacing.md,
})
const $wrappeCheckbox: ThemedStyle<ViewStyle> = () => ({
  minWidth: "40%",
})
