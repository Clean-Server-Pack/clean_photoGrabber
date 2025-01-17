import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";

type ButtonProps = {
  direction?: 'row' | 'column';
  disabled?: boolean;
  text?: string;
  icon?: string;
  selected?: boolean;
  h?: string;
  w?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mr?: string;
  mb?: string;
  mt?: string;
  ml?: string;
  bg?: string;
  radius?: string;
  onClick?: () => void;
  rectangle?: boolean;
  color?: string;
  hoverColor?: string;
  fontSize?: string;
  iconSize?: string;
  
  // style css properties 
  style?: React.CSSProperties;

}

export default function Button(props: ButtonProps) {

  const theme = useMantineTheme();
  const {hovered, ref} = useHover();
  const colors = {
    iconColor: {
      hovered: 'rgba(255,255,255,0.8)',
      normal: 'rgba(255,255,255,0.5)',
    },

    textColor: {
      hovered: 'rgba(255,255,255,0.8)',
      normal: 'rgba(255,255,255,0.5)',
    },

    borderColor: {
      hovered: colorWithAlpha(theme.primaryColor, 0.3),
      normal: theme.primaryColor,
    },
  }

  return (
    <Flex
      direction={props.direction || 'row'}
      
      ref={ref}
      w={props.w || 'fit-content'}
      h={props.h || 'fit-content'}
      mr={props.mr || '0'}
      mb={props.mb || '0'}
      mt={props.mt || '0'}
      ml={props.ml || '0'}
      

      
      bg={ !props.disabled && (props.selected || hovered) ? colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.4) : 'rgba(66, 66, 66, 0.5)'}
      gap='xs'

      style={{
        aspectRatio: !props.rectangle && '1/1' || 'auto',
        borderRadius: props.radius || '0.2vh',
        cursor: !props.disabled ? 'pointer' : 'not-allowed',
        padding: props.p || theme.spacing.xs,
        outline: !props.disabled && (props.selected || hovered)? `0.1rem solid ${colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.8)}`: "0.25rem solid transparent",
        transition: 'all 0.1s ease-in-out',
        ...props.style,
      }}
      align='center'
      justify='center'
      onClick={props.onClick}
    >
      {props.icon && (
        <FontAwesomeIcon icon={props.icon as IconName || 'fa-play'} style={{ 
          color: (props.selected || hovered) && !props.disabled ? colors.iconColor.hovered : colors.iconColor.normal,
          fontSize: props.iconSize || props.fontSize || '2vh',
          aspectRatio: '1/1',
        }} 
        
        />

      )}

      {props.text && (
        <Text
          style={{
            fontFamily: 'Akrobat Bold',
            color: !props.disabled && (props.selected || hovered) ? colors.textColor.hovered : colors.textColor.normal,
            fontSize: props.fontSize || theme.fontSizes.xs
          }}
        >{props.text}</Text>
      )}

    </Flex>
  )
}