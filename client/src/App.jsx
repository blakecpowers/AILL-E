import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {logo} from './assets'
import { Home, CreatePost } from './pages';

const App = () => {
  return (

    <BrowserRouter>
      {/* In the header, create link buttons to home page and to the create-post page */}
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        {/* Link Component to our home page */}
        <Link to="/">
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>

        {/* Link to Create Post */}
        <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Create 
        </Link>
      </header>

      {/* On small devices, give padding of 8. Normally padding of 4. Width of the full screen, grayish color, min height 100vh - the navbar pixels. */}
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        {/* Establish routes to the home component and create-post component. */}
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
