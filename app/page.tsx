'use client'
import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'

const currentPart = 'FPE-351-1317'
export default function Home() {
    const [partNumber, setPartNumber] = useState<string>('')
    const [serialNumber, setSerialNumber] = useState<string>('')
    const [serialList, setSerialList] = useState<Array<string>>([])
    const [unitCount, setUnitCount] = useState<number>(0)
    const [remaining, setRemaining] = useState<number>(5)

    const serialInputRef = useRef<HTMLInputElement>(null)
    const partInputRef = useRef<HTMLInputElement>(null)

    const handlePartInput = (event: ChangeEvent<HTMLInputElement>) => setPartNumber(event.currentTarget.value)
    const handlePartKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            serialInputRef.current?.focus()
            serialInputRef.current?.select()
        }
    }

    const handleSerialInput = (event: ChangeEvent<HTMLInputElement>) => setSerialNumber(event.currentTarget.value)
    const handleSerialKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addUnit()
        }
    }

    const addUnit = () => {
        if (partNumber && serialNumber && partNumber === currentPart) {
            let newList: Array<string> = [...serialList]
            newList.push(serialNumber)
            setUnitCount(unitCount + 1)
            setRemaining(remaining - 1)
            setSerialList(newList)
            setPartNumber('')
            setSerialNumber('')
            partInputRef.current?.focus()
            partInputRef.current?.select()
        }
    }

    return (
        <main className="flex flex-col md:flex-row min-h-screen min-w-screen p-2 md:p-5 gap-2 border-2 border-red-500">
            <div className='md:w-4/6 flex flex-col gap-4 md:gap-14 rounded border-2 hover:border-black'>
                <section className='flex flex-col md:flex-row p-3'>
                    <div className='flex flex-col w-full'>
                        <p className='text-md font-semibold mb-3'>Current Build</p>
                        <div className='flex w-full'>
                            <div className='flex flex-col w-1/2'>
                                <div className='text-sm flex space-x-2'>
                                    <p>Name:</p>
                                    <p>{currentPart}</p>
                                </div>
                                <div className='text-sm flex space-x-2'>
                                    <p>Description:</p>
                                    <p>Cheetah Turbo</p>
                                </div>
                                <div className='text-sm flex space-x-2'>
                                    <p>Work Order:</p>
                                    <p>WO123456</p>
                                </div>
                                <div className='text-sm flex space-x-2'>
                                    <p>BOM:</p>
                                    <p>FPE-351-1317-BOM</p>
                                </div>
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <div className='text-sm flex space-x-2'>
                                    <p>Qty Ordered:</p>
                                    <p>10</p>
                                </div>
                                <div className='text-sm flex space-x-2'>
                                    <p>Qty Built:</p>
                                    <p>5</p>
                                </div>
                                <div className='text-sm flex space-x-2'>
                                    <p>Qty Remaining:</p>
                                    <p>{remaining}</p>
                                </div>
                                <div className='text-sm flex space-x-2'>
                                    <p>Current Qty To Build:</p>
                                    <p>{unitCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='flex flex-col items-center py-3'>
                    <section className='flex flex-col gap-10 w-10/12 lg:w-2/4'>
                        <div className='flex flex-col'>
                            <label>Part Number</label>
                            <input autoFocus className='border-2' type='text' ref={partInputRef} onChange={handlePartInput} onKeyDown={handlePartKey} value={partNumber}/>
                            <label className='mt-2'>Serial Number</label>
                            <input className='border-2' type='text' ref={serialInputRef} onChange={handleSerialInput} onKeyDown={handleSerialKey} value={serialNumber}/>
                        </div>
                        <button className='rounded bg-sky-500 p-10 font-semibold' onClick={addUnit}>Add Unit</button>
                        <button className='rounded bg-sky-500 mb-auto p-10 font-semibold'>Build Units</button>
                    </section>
                </div>
            </div>
            <section className='md:w-2/6 flex flex-col rounded border-solid border-2 hover:border-black p-3'>
                <p className='text-center font-semibold mb-3'>Serial Numbers Entered</p>
                <ul className='list-disc list-inside ml-6'>
                    {serialList.map((serial, index) => {
                        return <li key={index}>{serial}</li>
                    })}
                </ul>
            </section>
        </main>
    )
}