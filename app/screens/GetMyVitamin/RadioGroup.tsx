import { Radio, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { View, ViewStyle } from "react-native"

type Props = {
  title: string
  value: string
  setValue: (text: string) => void
}

const RadioGroup = ({ title, value, setValue }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($topRadioContainer)}>
      <Text text={title} preset="subheading" />
      <Radio
        value={value === "Yes" ? true : false}
        onValueChange={() => setValue("Yes")}
        label="Yes"
      />
      <Radio
        value={value === "No" ? true : false}
        onValueChange={() => setValue("No")}
        label="No"
      />
    </View>
  )
}

export default RadioGroup

const $topRadioContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  rowGap: spacing.sm,
  marginTop: spacing.lg,
})
