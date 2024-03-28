import { useCallback, useEffect, useState, useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const [mode, setMode] = useState("dark")
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghiklmnopqrstvxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length, numAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  },
      [length , numAllowed , charAllowed , passwordGenerator])
  
  return (
    <>
    <div className="background h-[100vh] w-screen"
    style={{backgroundColor: (mode=="dark"?"black":"white"), color: (mode=="dark"?"white":"black")}}
    >
    <div className="mode text-end">
      <button 
      className='bg-slate-400 p-2 rounded-md'
      onClick={()=>{
        if (mode == "dark") {
          setMode("light")
        }else{
          setMode("dark")
        }
      }}
      >{mode}</button>
    </div>
     <div className='text-3xl main text-center max-w-5xl mx-auto m-5 flex-wrap bg-gray-500 p-2'>
      <h1>Password Generator</h1>
      <div className='front-input pt-6 pb-2'>
        
        <input className='px-2 py-1 rounded-s-lg text-red-300' type="text" name="" id="" value={password} 
        ref={passwordRef}
        readOnly
        
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='bg-blue-400 rounded-e-lg px-2 py-1'>copy</button>

      </div>
      <div className='gap-x-5 flex flex-wrap justify-center text-[#bca42c] font-bold'>
        
        <input type="range" min={8} max={100}
        value={length} 
        onChange={(e)=>{setLength(e.target.value)}}
        className='cursor-pointer' />
        <label>Length {length}</label>
      
        <input type="checkbox" defaultChecked={numAllowed} 
        id='numberInput' 
        onChange={()=>{
          setNumAllowed( (prev)=> !prev );
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
      
        <input type="checkbox" defaultChecked={numAllowed} 
        id='charInput' 
        onChange={()=>{
          setCharAllowed( (prev)=> !prev)}} />
        <label htmlFor="charInput">Characters</label>

      </div>
      </div>
      </div>
      </>
  )
}

export default App
