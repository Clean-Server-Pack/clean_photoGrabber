import { BackgroundImage } from "@mantine/core"
import { isEnvBrowser } from "../../utils/misc"
import CaptureBar from "./CaptureBar"
import Menu from "../Menu/main"
import useCapture from "../store"
import { GameRender } from "./GameView"


export default function CaptureSystem() {
  const globalOpen = useCapture(state => state.open)


  return (
    <Wrapper>
      {globalOpen &&(
        <>
          <CaptureBar />
          <Menu />
          <GameRender
            height={1920}
            width={1080}
          />
        </>
      )}
    </Wrapper>
  )
}




function Wrapper({ children }: { children: React.ReactNode }) {
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://i.ytimg.com/vi/TOxuNbXrO28/maxresdefault.jpg"
    >  
      {children}
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}
