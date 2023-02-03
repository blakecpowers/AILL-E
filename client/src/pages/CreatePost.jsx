import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from "../components"

const CreatePost = () => {
  // Estbalish a navigation hook. This will allow us to navigate back to the home page once our post has been created.
  const navigate = useNavigate();
  
  // Create a state for the form. This will be initialized to an object with an empty name, prompt and photo.
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ""
  })

  // Create a state for generating the image. This will make contact with our API when we're waiting to get the img.
  const [generatingImg, setGeneratingImg] = useState(false);

  // Another state for if we're loading or not.
  const [loading, setLoading] = useState(false);

  // 
  const handleSubmit = () => {

  }

  //
  const handleChange = (e) => {

  }

  //
  const handleSurpriseMe = () => {

  }

  return (
    <section className='max-w-7xl mx-auto'>
      {/* The first thing we want to appear is a header of "Create" and a <p> tag of what that looks like. */}
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
            Create imaginitive and visually stunning images through DALL-E AI and share with the community
        </p>
      </div>

      {/* Below the header is two form fields that will execute "handleSubmit" on submit of the form */}
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A synthwave style sunset above the reflecting water of the sea, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            hndleSurpriseMe={handleSurpriseMe}
          />
        </div>
      </form>
    </section>
  )
}

export default CreatePost
