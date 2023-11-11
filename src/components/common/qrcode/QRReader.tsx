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
          {/* <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader> */}
          {/* <button onClick={handleClick}>Scan QR Code</button>
      <button onClick={handleStart}>Start</button> */}
          {/* {cameras.map(camera => (<div key={camera.id} onClick={() => handleCameraSelected(camera.id)}>{camera.label}</div>))} */}
          {/* <div className='mt-4'> */}
          <div className="">
            <video id="qr-video" ref={videoRef} className="w-full h-full" />
          </div>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QRReader

/*
const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Partial<Html5QrcodeCameraScanConfig>): Html5QrcodeCameraScanConfig => {
  const config: Html5QrcodeCameraScanConfig = {
    fps: undefined,
    aspectRatio: undefined,
    disableFlip: undefined,
    qrbox: undefined,
    videoConstraints: undefined
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

interface Html5QrcodePluginProps extends Partial<Html5QrcodeCameraScanConfig> {
  verbose?: boolean
  qrCodeSuccessCallback: QrcodeSuccessCallback
  qrCodeErrorCallback?: QrcodeErrorCallback
}

const Html5QrcodePlugin = (props: Html5QrcodePluginProps) => {

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!(props.qrCodeSuccessCallback)) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div id={qrcodeRegionId} />
  );
};

export default Html5QrcodePlugin;
*/
