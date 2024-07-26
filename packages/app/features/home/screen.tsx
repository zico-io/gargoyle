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
  Accordion,
  Square,
  Input,
} from '@my/ui'
import { ChevronDown, PlusCircle, Trash } from '@tamagui/lucide-icons'
import { color } from '@tamagui/themes'
import { useGargoyleStore } from '../../lib/store'
import { useShallow } from 'zustand/react/shallow'
import { FormEvent, useState } from 'react'
import { Spinner } from '@my/ui'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const { addEndpoint, clearEndpoints } = useGargoyleStore(
    useShallow((state) => ({ addEndpoint: state.addEndpoint, clearEndpoints: state.clearEndpoints }))
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/endpoints/add', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Failed to add the endpoint. Please try again.')

      const data = await response.json()
      addEndpoint(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <H1>Monitor your applications</H1>
      <YStack gap="$2">
        <Paragraph>Enter the application's endpoint to get started</Paragraph>
        <form onSubmit={handleSubmit}>
          <XStack gap="$2">
            <Button disabled={isSubmitting} size="$4" onPress={() => clearEndpoints()}>{isSubmitting ? (<Spinner />) : (<Trash />)}</Button>
            <Input flex={1} size="$4" placeholder={'https://example.com'} id="url" />
            <Button disabled={isSubmitting} size="$4">{isSubmitting ? (<Spinner />) : (<PlusCircle />)}</Button>
          </XStack>
        </form>
        <EndpointList />
      </YStack>
    </YStack>
  )
}

const EndpointList = () => {
  const endpoints = useGargoyleStore((state) => state.endpoints)

  const statusColor = (status?: number) => {
    if (!status) return color.gray10Light
    else if (status >= 300) return color.red10Light
    return color.green10Light
  }

  return (
    <Accordion overflow="hidden" width={480} type="multiple">
      {endpoints.map((endpoint, index) => (
        <Accordion.Item value={index.toString()} key={index}>
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
  )
}

