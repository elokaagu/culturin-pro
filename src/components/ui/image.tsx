
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "portrait" | "square" | "video" | "wide"
  cover?: boolean
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, aspectRatio, cover = true, alt = "", ...props }, ref) => {
    const aspectRatioClass = {
      portrait: "aspect-[3/4]",
      square: "aspect-square",
      video: "aspect-video",
      wide: "aspect-[16/9]",
    }

    return (
      <img
        ref={ref}
        className={cn(
          "w-full",
          cover && "object-cover",
          aspectRatio && aspectRatioClass[aspectRatio],
          className
        )}
        alt={alt}
        {...props}
      />
    )
  }
)

Image.displayName = "Image"

export default Image
