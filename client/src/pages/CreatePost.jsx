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

  // Integrate frontend with backend here.
  // On click of generate, call this function. (function is async because we have an await below)
  const generateImage = async () => {
    if (form.prompt) {
      try {
        // Set the loading icon to true.
        setGeneratingImg(true);

        // Fetch the response from our dalle server endpoint.
        // Method is type post. 
        // Pass headers of Content-Type: JSON.
        // Pass the body of the prompt set from the form.
        const response = await fetch('https://aille.onrender.com/api/v1/dalle' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        })
        // Get data from the response and set the form to have this photo.
        const data = await response.json();
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  // Handle submiting of the post to share with the community.
  // Pass in the "submit" event.
  const handleSubmit = async (e) => {
    // Disabling the following for now until regulations are put into play - 
    // // Prevent browser from reloading on submit.
    // e.preventDefault();

    // if (form.prompt && form.photo) {
    //   setLoading(true);

    //   try {
    //     // Call the post image route.
    //     const response = await fetch('https://aille.onrender.com/api/v1/post',
    //     {
    //       method: 'POST',
    //       headers : {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(form)
    //     })

    //     // Wait for the response to come back.
    //     await response.json();

    //     // Navigate to the home to see the image.
    //     navigate('/');
      
    //   } catch (err) {
    //     alert(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   alert('Please enter a prompt and generate an image')
    // }
    alert('Sorry! Posting to the Community Showcase is prevented until we implement Community Showcase Guideline Regulations.')
  }

  // This function actually lets us type in the form fields.
  // It takes the event and calls set form state where we keep all existing data on the event,
  // but add onto it the "e.target.value" (what the user typed) and set that to either Name or Prompt.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Adding support for the surprise me button.
  const handleSurpriseMe = () => {
    // Get a random prompt.
    const randomPrompt = getRandomPrompt(form.prompt);

    // Set the form prompt from that random prompt.
    setForm({...form, prompt: randomPrompt})
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
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Here is the place where an AI generated image will be shown. Or, if it hasn't yet, a container */}
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ): (
              <img 
                src={preview}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {/* If the image is generating, then we want to put the loader over the stock image. */}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button 
          type="button"
          onClick={generateImage}
          className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once you have created the image, you can share it with others in the community!
          </p>
          <button
          type="submit"
          className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>

      </form>
    </section>
  )
}

export default CreatePost
