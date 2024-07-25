import { Button, Input, SizeTokens, XStack } from "tamagui";

export const InputField = (props: { size: SizeTokens }) => {
  return (
    <XStack alignItems="center" gap="$2">
      <Input flex={1} size={props.size} placeholder={'https://example.com'} />
      <Button size={props.size}>Add</Button>
    </XStack>
  )
}
