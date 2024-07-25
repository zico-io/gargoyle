import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack,
  SizeTokens,
  InputField,
  Accordion,
  Square,
} from '@my/ui'
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { color } from '@tamagui/themes'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'

let endpoints: { url: string, status?: number }[] = [
  {
    "url": "https://www.google.com/",
    "status": 403
  }
]

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const statusColor = (status?: number) => {
    if (!status) return color.gray10Light
    else if (status >= 300) return color.red10Light
    return color.green10Light
  }

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <H1>Monitor your applications</H1>
      <YStack gap="$2">
        <Paragraph>Enter the application's endpoint to get started</Paragraph>
        <InputField size="$4" />
      </YStack>
      <Accordion overflow="hidden" width={480} type="multiple">
        {endpoints.map((endpoint, index) => (
          <Accordion.Item value={index.toString()}>
            <Accordion.Trigger flexDirection='row' jc='space-between'>
              {({ open }: { open: boolean }) => (
                <>
                  <XStack ai="center" gap="$4">
                    <Square size="$1" borderRadius="100%" background={statusColor(endpoint.status)} />
                    <Paragraph>{endpoint.url}</Paragraph>
                  </XStack>
                  <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.HeightAnimator animation="medium">
              <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                <Paragraph>Status Code: {endpoint.status}</Paragraph>
              </Accordion.Content>
            </Accordion.HeightAnimator>
          </Accordion.Item>
        ))}
      </Accordion>
    </YStack>
  )
}

