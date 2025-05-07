
import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "portrait" | "square" | "video" | "wide"
  cover?: boolean
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, aspectRatio, cover = true, alt = "", ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    })
    
    const aspectRatioClass = {
      portrait: "aspect-[3/4]",
      square: "aspect-square",
      video: "aspect-video",
      wide: "aspect-[16/9]",
    }
    
    const handleLoad = () => {
      setIsLoaded(true)
    }
    
    const setRefs = React.useCallback(
      (node: HTMLImageElement | null) => {
        // Pass to both refs
        inViewRef(node)
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [inViewRef, ref]
    )

    return (
      <img
        ref={setRefs}
        className={cn(
          "w-full transition-opacity duration-700",
          cover && "object-cover",
          aspectRatio && aspectRatioClass[aspectRatio],
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        alt={alt}
        onLoad={handleLoad}
        loading="lazy"
        {...props}
      />
    )
  }
)

Image.displayName = "Image"

export default Image
