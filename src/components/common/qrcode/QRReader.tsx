"use client"
import { setDefaultResultOrder } from "dns"
import QrScanner from "qr-scanner"
import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react"
import { Dialog, DialogContent } from "../dialog/FullDialog"
import { useToaster } from "../toaster/Toaster"

interface QRReaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const QRReader = ({ open, onOpenChange }: QRReaderProps) => {
  const toast = useToaster()
  const [data, setData] = useState("No result")

  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [scanner, setScanner] = useState<QrScanner | null>(null)
  const [cameras, setCameras] = useState<QrScanner.Camera[]>([])

  const handleClick = () => {
    QrScanner.listCameras(true).then(setCameras).catch(alert)
  }

  const handleCameraSelected = (id: string) => {
    scanner?.setCamera(id)
  }

  const handleStart = () => {
    if (scanner) {
      // scanner?.$canvas.style.display = "block"
      scanner?.start().catch(alert)
    }
  }

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
        if (sections.length !== 3) {
          // unsupport qrcode
          return
        }
        if (sections[0] !== "car") {
          // unsupport qrcode
          return
        }
        // action should be one of (highway,charge,park)
        const action = sections[1]
        switch (action) {
          case "highway":
            // quest for highway
            toast.success("highway")
            break

          case "charge":
            // quest for charge
            toast.success("charge")
            break

          case "park":
            // quest for park
            toast.success("park")
            break
          default:
            // unsupport qrcode
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
          <div className="">
            <video id="qr-video" ref={videoRef} className="w-full h-full pt-11" />
          </div>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QRReader
