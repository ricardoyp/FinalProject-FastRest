import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useMemo } from 'react'
import { Adapt, Select, Sheet, YStack, getFontSize } from 'tamagui'

export const SelectComponent = ({ value, onValueChange, ...props }) => {

    return (
        <Select value={value} onValueChange={onValueChange} disablePreventBodyScroll {...props}>
            <Select.Trigger width={'100%'} iconAfter={ChevronDown}>
                <Select.Value placeholder="Selec a option" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native={!!props.native}
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronUp size={20} />
                    </YStack>
                    {/* <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['$background', 'transparent']}
                        borderRadius="$4"
                    /> */}
                </Select.ScrollUpButton>

                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>
                            Collection
                        </Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {useMemo(
                            () =>
                                props.items.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.name}
                                            value={item.name}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [props.items]
                        )}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    {props.native && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            width={'$4'}
                            pointerEvents="none"
                        >
                            <ChevronDown
                                size={getFontSize((props.size) ?? '$true')}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronDown size={20} />
                    </YStack>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    )
}

