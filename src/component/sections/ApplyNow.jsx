import React from 'react'
import ApplyNowForm from '../forms/apply-now/ApplyNow'
import Image from 'next/image'
import { IMAGES } from '../../assets/images'

const ApplyNow = ({ page = null }) => {
  return (
    <div className='apply-now-custom'>
        <div className='form-container'>
            <ApplyNowForm page={page}/>
        </div>
        <div className='image-container'>
            <Image src={IMAGES.mask} width={500} height={550} alt='mask' className='apply-now-image' />
        </div>
    </div>
  )
}

export default ApplyNow
