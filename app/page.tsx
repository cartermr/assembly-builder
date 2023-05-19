'use client'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

export default function Home() {
  const [partNumber, setPartNumber] = useState<string>('')
  const [serialNumber, setSerialNumber] = useState<string>('')
  const [serialList, setSerialList] = useState<Array<string>>([])
  const [unitCount, setUnitCount] = useState<number>(0)

  const serialInputRef = useRef<HTMLInputElement>(null)
  const partInputRef = useRef<HTMLInputElement>(null)

  const handlePartInput = (event: ChangeEvent<HTMLInputElement>) => setPartNumber(event.currentTarget.value)
  const handlePartKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && serialInputRef.current) {
      serialInputRef.current.focus()
      serialInputRef.current.select()
    }
  }

  const handleSerialInput = (event: ChangeEvent<HTMLInputElement>) => setSerialNumber(event.currentTarget.value)

  const addUnit = () => {
    console.log(partNumber)
    console.log(serialNumber)
    if (partNumber && serialNumber) {
      let newList: Array<string> = [...serialList]
      newList.push(serialNumber)
      setUnitCount(unitCount + 1)
      setSerialList(newList)
      setPartNumber('')
      setSerialNumber('')
      partInputRef.current?.focus()
      partInputRef.current?.select()
    }
  }

  return (
    <main className="grid grid-rows-6 grid-cols-2 h-screen w-screen gap-2 p-12">
      <section className='row-span-2 col-span-1 rounded border-solid border-2 hover:border-black flex flex-col p-3'>
          <p className='text-lg font-semibold mb-3'>Product</p>
          <div className='flex space-x-2'>
            <p>Name:</p>
            <p>FPE-351-1317</p>
          </div>
          <div className='flex space-x-2'>
            <p>BOM:</p>
            <p>FPE-351-1317-BOM</p>
          </div>
          <div className='flex space-x-2'>
            <p>Description:</p>
            <p>Cheetah Turbo</p>
          </div>
        </section>
        <section className=' row-span-6 col-span-1 rounded border-solid border-2 hover:border-black flex p-3'>
          <div className='flex flex-col w-1/2'>
            <p className='text-lg font-semibold mb-3'>Unit Count</p>
            <div className='h-full w-1/2 justify-items-center items-center'>
              <p className='text-center text-3xl font-semibold'>{unitCount}</p>
            </div>
          </div>
          <div className='flex flex-col w-1/2'>
            <p className='text-lg font-semibold mb-3'>Serial Numbers</p>
            {serialList.map((serial, index) => {
              return <p key={index}>{serial}</p>
            })}
          </div>
        </section>
      <div className='row-span-4 col-span-1 rounded border-solid border-2 hover:border-black flex flex-col items-center p-10'>
        <section className='flex flex-col p-5'>
          <label>Part Number</label>
          <input autoFocus className='border-2' type='text' ref={partInputRef} onChange={handlePartInput} onKeyDown={handlePartKey} value={partNumber} />
          <label className='mt-10'>Serial Number</label>
          <input className='border-2' type='text' ref={serialInputRef} onChange={handleSerialInput} value={serialNumber} />
          <button className='rounded bg-sky-500 mt-10 p-3 font-semibold' onClick={addUnit}>Add Unit</button>
          <button className='rounded bg-sky-500 mt-10 p-3 font-semibold'>Build Units</button>
        </section>
      </div>
    </main>
  )
}
