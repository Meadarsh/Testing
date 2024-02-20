"use client"
import { useState } from "react"
import { MdOutlineUploadFile } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import Loader from "./components/loader";
export default function Home() {
  
const [file, setFile] = useState()
const [text, setText] = useState()
const [data, setData] = useState()
const [loading, setLoading] = useState(false)
const [generating, setGenerating] = useState(false)

 const Generate =async () => {
  setLoading(true)
   if (!text){ 
    alert("Enter prompt")
    return;}
    const formData = new FormData();
    formData.set('file', file);
    formData.set('prompt', text);
   

    const res = await fetch('/api/visionmodel', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const resp = await res.json()
      const concatenatedString = resp.result.join(' ');
      setData(concatenatedString)
      setFile(null)
    }
    
  //  if(data.ok) return window.location.href="/result";
  // const res = await data.json()


}
  return (
    <>
    <div className="flex flex-col items-center">
    <div className="h-[85vh] w-[100vw] relative px-8">

  <div className="textarea absolute w-[90%] bottom-5 overflow-clip">
  {loading&&<div><Loader/></div>}
 {data&&<TypeAnimation
      sequence={[
        data, 
        () => { setLoading(false)
          console.log('Sequence completed');
        },
      ]}
      wrapper="p"
      cursor={true}
      speed={50}
      style={{ fontSize: '1.1em', display: 'inline-block' }}
    />}
  </div>

    </div>
    <div className="flex justify-between items-center w-[80%] border-2 border-blue-400 p-1 rounded-2xl">
   <div className="h-12 w-[calc(100%-200px)]"> <input placeholder="Enter your prompt"  type="text" className=" pl-2 bg-transparent  focus:outline-none h-full w-full" onChange={e => setText(e.target.value)} /></div>
   <div className="h-12  relative overflow-hidden rounded-full w-12"> <input className="h-full opacity-0 w-full" type="file" onChange={e => setFile(e.target?.files[0])} /><MdOutlineUploadFile className={`absolute top-3 left-2  ${file?'text-blue-500':'text-black'}  pointer-events-none`} size={30}/></div>
    <button className="h-12 w-36 font-semibold text-white rounded-2xl bg-blue-500" onClick={Generate}>
      Generate
    </button>
    </div>
    </div>
   
   
    </>
  )

  }
