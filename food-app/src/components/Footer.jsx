import React from 'react'

const Footer = () => {

    const currentYear= new Date().getFullYear()

  return (
    <>
        <div className='bg-gray-800 pt-15 mt-12'>
            <div className='flex flex-row justify-between px-18'>
                <div>
                    <div className='font-bold text-5xl cursor-pointer text-lime-500'>
                        <i class='bx bxs-dish mr-2'></i>
                        GApple
                    </div>
                    <div className='text-white text-lg mt-8'>
                        The restaurant where laughter is the secret ingredient!
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-white font-bold text-2xl'>
                        COMPANY
                    </div>
                    <div className='text-white flex flex-col space-y-2 mt-2'>
                        <a href="#" className='hover:text-lime-400'>Home</a>
                        <a href="#" className='hover:text-lime-400'>About Us</a>
                        <a href="#" className='hover:text-lime-400'>Delivery</a>
                        <a href="#" className='hover:text-lime-400'>Privacy Policy</a>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-white font-bold text-2xl'>
                        GET IN TOUCH
                    </div>
                    <div className='text-white mt-2 space-y-2'>
                        <div>+91-9876543210</div>
                        <div>contact@GApple.com</div>
                    </div>
                </div>
            </div>

            <hr className='border-white border-t-4 mt-6 mx-32'/>

            <div className='text-white py-8 text-center font-bold'>
                Copyright {currentYear} © GApple.com - All Right Reserved
            </div>
        </div>
    </>
  )
}

export default Footer