"use client"
import QrScanner from "qr-scanner"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent } from "../dialog/FullDialog"
import { useToaster } from "../toaster/Toaster"

interface QRReaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResult: (params: { type: string; action: string; data: string }) => void
}

const QRReader = ({ open, onOpenChange, onResult }: QRReaderProps) => {
  const toast = useToaster()
  const [data, setData] = useState("")

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [scanner, setScanner] = useState<QrScanner | null>(null)

  // car:highway:(base64(rsa(cityid:regionid:placeid)))
  // car:charge:(base64(rsa(cityid:regionid:placeid)))
  // car:park:(base64(rsa(cityid:regionid:placeid)))

  useEffect(() => {
    // when component mounts
    const s = new QrScanner(
      videoRef.current!,
      (result) => {
        // setResult(result)
        console.log(result)
        const sections = result.data.split(":")
        console.log(sections)
        if (sections.length !== 4) {
          // unsupport qrcode
          toast.error("不支持的二维码类型：" + result)
          return
        }
        if (sections[0] !== "car") {
          // unsupport qrcode
          toast.error("不支持的二维码类型：" + result)
          return
        }
        // ['car', 'highway', 'start', 'Y2FyOmhpZ2h3YXk6c3RhcnQ6MToxOjEwMDE']
        // action should be one of (highway,charge,park)
        const type = sections[1]
        const action = sections[2]
        const data = sections[3]
        switch (type) {
          case "highway":
            // quest for highway
            if (action === "start") {
              // start highway
              onResult({
                action,
                data,
                type,
              })
              onOpenChange(false)
            } else if (action === "end") {
              // end highway
              onResult({
                action,
                data,
                type,
              })
              onOpenChange(false)
            } else {
              toast.error("不支持的二维码类型：" + result)
            }
            break

          case "charge":
            // quest for charge
            if (action === "start") {
              // start charge
              onResult({
                action,
                data,
                type,
              })
              onOpenChange(false)
            } else if (action === "end") {
              // end charge
              onResult({
                action,
                data,
                type,
              })
              onOpenChange(false)
            } else {
              toast.error("不支持的二维码类型：" + result)
            }
            break

          case "park":
            // quest for park
            if (action === "start") {
              // start park
              onResult({
                action,
                data,
                type,
              })
              onOpenChange(false)
            } else if (action === "end") {
              // end park
              onResult({
                action,
                data,
                type,
              })
              onOpenChange(false)
            } else {
              toast.error("不支持的二维码类型：" + result)
            }
            break
          default:
            // unsupport qrcode
            toast.error("不支持的二维码类型：" + result)
            return
        }
      },
      {
        maxScansPerSecond: 1,
        onDecodeError: (error) => {
          console.log(error)
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    )
    setScanner(s)
    s.start().catch(alert)
    // cleanup function when component will unmount
    return () => {
      setScanner(null)
      s.destroy()
    }
  }, [])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-screen min-h-screen px-0"
          onCancel={() => onOpenChange(false)}
        >
          {!data && (
            <div className="">
              <video
                id="qr-video"
                ref={videoRef}
                className="w-full h-full pt-11"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QRReader
