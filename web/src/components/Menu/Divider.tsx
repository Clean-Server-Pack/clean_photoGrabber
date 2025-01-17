import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";

type DividerProps = {
  title: string;
}

export default function Divider(props: DividerProps){

  const theme = useMantineTheme()
  return (
    <Flex
      direction={'column'}
      w='100%'
      h='20vh'
      bg='rgba(77,77,77,0.8)'
  

      align='center'
    >
    <Text
      ta='center'
      w='70%'
      size='sm'
      c='rgba(255,255,255,0.8)'
      pb='xxs'
      style={{
        borderBottom: `0.2vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.5)}`,
      }}
    >{props.title.toUpperCase()}</Text>
    </Flex>
  )
}