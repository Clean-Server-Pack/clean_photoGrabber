import { Flex, Text, Transition, useMantineTheme } from "@mantine/core";
import useCapture from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CaptureBar(){
  const theme = useMantineTheme()
  const capture = useCapture(state => state.capture)
  return (
    <Transition
  
      duration={500}
      transition='slide-right'
      mounted={capture}
    >
      {(transitionStyles) => (
        <Flex
          w='35vh'
          direction='column'
          pos='absolute'

          left='4vh'
          bottom='4vh'
          gap='xs'
          p='xs'
          bg='rgba(0,0,0,0.5)'
          style={{
            borderRadius: theme.radius.xxs,
            transition: 'all 0.5s ease-in-out',
            ...transitionStyles,
          }}
        >
          
          <Title/>
          <Flex
            justify='space-between'
          >
            <Text
              size='xs'
            >CATEGORY</Text>
      
            <Text
              size='xs'
            >
              5/10
            </Text>
          </Flex>
        </Flex>  
      )}
    </Transition>
  )
}

function Title(){
  const theme = useMantineTheme()
  return (
    <Flex
      align='center'
      gap='xxs'
    >
      <FontAwesomeIcon icon='circle' color='rgba(255,0,0,0.5)'
        style={{
          fontSize: theme.fontSizes.sm,
        }}
      />  
      <Text size='sm'>CAPTURING</Text>
    </Flex>
  )
}
