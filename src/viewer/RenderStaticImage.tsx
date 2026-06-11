import { Image } from "react-konva";
import useImage from "use-image";
import type { ImageElement} from "../types/template";


export default function RenderStaticImage({
  element,
}: {
  element: ImageElement;
}){
    const [image] = useImage(element.src)
    return (      
        <Image 
            x = {element.x}
            y = {element.y}

            width={element.width}
            height={element.height}

            image={ image }
        />

    )
}