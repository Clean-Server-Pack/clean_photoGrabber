import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import BorderedIcon from "../Generic/BorderedIcon";
import Button from "../Generic/Button";


type TitleProps = {
  title: string
  description?: string;
  icon: string;
  backButton?: boolean;
  onBack?: () => void;
  mt?: string;
  closeButton?: boolean;
  onClose?: () => void;
};

export function Title(props: TitleProps) {
  
  const theme = useMantineTheme();
  return (
    <Flex
      mt={props.mt}
      direction='column'
      align='center'
      gap='xs'
      w='90%'
      
      pb='md'
      style={{
       
      }}
    >
      <Flex
   
        align='center'
        justify={'center'}
        w='90%'
      >

        <Flex
          align='center'
          gap='sm'
        >
          <BorderedIcon
            icon={props.icon as IconName}
            fontSize={theme.fontSizes.md}
          />
          <Flex
            direction='column'
            gap='0.25vh'
          >
            <Text p='0' size='sm' style={{
              lineHeight: theme.fontSizes.xs,
              fontFamily: 'Akrobat Bold'
            }}>{props.title}</Text>
            {props.description && (
              <Text 
                size='xs'
                c='grey'
              >{props.description}</Text>
            )}
          </Flex>


        </Flex>
        
        <Flex
          ml='auto'
          align='center'
          gap='xs'
        >
        {props.backButton && (
          <Button icon='fa-arrow-left' onClick={props.onBack}/> 
        )}

        {props.closeButton && (
          <Button icon='fa-times' onClick={props.onClose} 
        hoverColor='red'
          />
        )}

        </Flex>
      </Flex>
    </Flex>
  );
}
