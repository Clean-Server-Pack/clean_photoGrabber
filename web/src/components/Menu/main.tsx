import { Flex, useMantineTheme } from "@mantine/core";
import Button from "../Generic/Button";
import { Title } from "../Generic/Title";
import Divider from "./Divider";

export default function Menu(){
  const theme = useMantineTheme()
  return (
    <Flex
      direction='column'
      pos='absolute'
      left='4vh'
      bottom='12vh'
      bg='rgba(0,0,0,0.5)'
      w='35vh'
      h='70vh'
      style={{
        // transform: 'translateY(0%)',
        borderRadius: theme.radius.xxs,
      }}
      pt='sm'
      align='center'
    >
      <Title
        title='Picture Capture System'
        icon='bars'
        description="You can use this tool to capture PNG images of clothing, objects or vehicles."
      />
      <Flex
        direction={'column'}
        flex={1}
        m='xxs'
        w='100%'
        p='xs'
        align='center'
        style={{
          overflowY: 'auto',
        }}
        // bg='red'
      >
        <Divider
          title='Vehicles'
        />

      </Flex>

      <Flex
        mt='auto'
        p='xs'
        justify={'space-between'}
        w='90%'
      >
        <Button
          rectangle
          icon='fa-arrow-left'
          text='Quit'
        />
        <Button
          rectangle
          icon='camera'
          text='Capture'
        />
      </Flex>
    </Flex>
  )
}

