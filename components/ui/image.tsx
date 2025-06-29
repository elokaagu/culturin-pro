
import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "portrait" | "square" | "video" | "wide"
  cover?: boolean
  fill?: boolean
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, aspectRatio, cover = true, fill = false, alt = "", ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    })
    
    // Prefetch image when in viewport
    React.useEffect(() => {
      if (inView && props.src && !isLoaded) {
        const img = new window.Image(); // Use window.Image to avoid name conflict
        img.src = props.src.toString();
        img.onload = () => setIsLoaded(true);
      }
    }, [inView, props.src, isLoaded]);
    
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
      <div className={cn(
        "relative w-full h-full overflow-hidden",
        aspectRatio && !fill && aspectRatioClass[aspectRatio],
        fill && "h-full w-full"
      )}>
        {!isLoaded && inView && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          ref={setRefs}
          className={cn(
            "w-full h-full transition-opacity duration-700",
            cover && "object-cover",
            fill && "absolute inset-0 object-cover w-full h-full",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          alt={alt}
          onLoad={handleLoad}
          loading="lazy"
          {...props}
        />
      </div>
    )
  }
)

Image.displayName = "Image"

export default Image
