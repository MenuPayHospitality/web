import Image from 'next/image'
import React from 'react'

const SplashScreen = () => {
  return (
    <div className='w-full h-full bg-[#F9E154] flex justify-center items-center'>
        <Image
        src="/assest/menupay-logo.png" 
        alt='menupay'
        className='w-[100px] h-[100px]'
        width={200}
        height={200}
        />
    </div>
  )
}

export default SplashScreen