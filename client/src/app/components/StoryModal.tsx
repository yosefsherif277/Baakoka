'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { ArrowLeft, TextIcon, Upload, Sparkle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

const StoryModal = ({ setShowModal }: { setShowModal: (show: boolean) => void }) => {
  const bgColors = ["#4f46e5", "#7c3aed", "#d02777", "#e11d48", "#ca8a04", "#dd9488"]
  const [mode, setMode] = useState<'text' | 'media'>('text')
  const [background, setBackground] = useState(bgColors[0])
  const [text, setText] = useState('')
  const [media, setMedia] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMedia(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleCreateStory = async () => {
    try {
      // Logic to create story
      return Promise.resolve()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  return (
    <div className='fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-4 flex items-center justify-between'>
          <button 
            onClick={() => setShowModal(false)} 
            className='text-white p-2 cursor-pointer'
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className='text-lg font-semibold'>Create Story</h2>
          <span className="w-10"></span>
        </div>

        {/* Content Area */}
        <div 
          className='rounded-lg h-96 flex items-center justify-center relative' 
          style={{ backgroundColor: mode === 'text' ? background : 'transparent' }}
        >
          {mode === 'text' ? (
            <textarea 
              className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' 
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            previewUrl && (
              media?.type.startsWith('image') ? (
                <Image 
                  src={previewUrl} 
                  alt="" 
                  className='object-contain max-h-full' 
                  width={640}
                  height={256}
                />
              ) : (
                <video 
                  src={previewUrl} 
                  className='object-contain max-h-full'
                />
              )
            )
          )}
        </div>

        {/* Color Picker */}
        <div className='flex mt-4 gap-2'>
          {bgColors.map((color) => (
            <button
              key={color}
              className='w-6 h-6 rounded-full ring cursor-pointer'
              style={{ backgroundColor: color }}
              onClick={() => setBackground(color)}
            />
          ))}
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null) }} 
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'text' ? "bg-white text-black" : "bg-zinc-800"}`}
          >
            <TextIcon size={18} /> Text
          </button>
          
          <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
            <Upload size={18} /> Photo/Video
            <input 
              ref={fileInputRef}
              onChange={(e) => { handleMediaUpload(e); setMode('media') }} 
              type="file" 
              accept='image/*, video/*' 
              className='hidden' 
            />
          </label>
        </div>

        {/* Create Button */}
        <button 
          onClick={() => toast.promise(handleCreateStory(), {
            loading: 'Saving...',
            success: <p>Story Added</p>,
            error: (e) => <p>{e.message}</p>,
          })}
          className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer'
        >
          <Sparkle size={18} /> Create Story
        </button>
      </div>
    </div>
  )
}

export default StoryModal