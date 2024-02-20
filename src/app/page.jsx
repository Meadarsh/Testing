"use client"
import { useState } from "react"
import { MdOutlineUploadFile } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import Loader from "./components/loader";
import Button from "./components/button";
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
    <div className="main"> </div>
    <div className="hero flex w-[calc(100vw-20px)] h-[calc(100vh-20px)] rounded-xl flex-col absolute left-[10px] top-[10px] items-center">
    <div className=" h-[85vh] w-[80vw] relative px-8">
  <div className="textarea absolute w-[90%]  bottom-5 overflow-clip">
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
      style={{ fontSize: '1.1em',color:"white", display: 'inline-block' }}
    />}
  </div>

    </div>
    <div className="flex justify-between items-center  w-[80%] border-2 border-white p-1 rounded-2xl">
   <div className="h-12 w-[calc(100%-200px)]"> <input placeholder="Enter your prompt"  type="text" className=" pl-2 bg-transparent text-white focus:outline-none h-full w-full" onChange={e => setText(e.target.value)} /></div>
   <div className="h-12  relative overflow-hidden rounded-full w-12"> <input className="h-full opacity-0 w-full" type="file" onChange={e => setFile(e.target?.files[0])} /><MdOutlineUploadFile className={`absolute top-3 left-2  ${file?'text-red-500':'text-white'}  pointer-events-none`} size={30}/></div>
  <div onClick={Generate} > <Button /></div>
    </div>
    </div>
   
   
    </>
  )

  }
