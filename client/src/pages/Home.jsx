import React, {useState, useEffect} from 'react'
import {Loader, Card, FormField} from '../components'

const Home = () => {

    const [loading, setLoading] = useState(false);  
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState("");

    // Generic React Functional Component to Render Cards. 
    // We accept two parameters: data and title. 
    // If data exists, we want to map over each post/image and render all the cards.
    // The card has a key of "post._id" and we want to spread out the other post properties, so we add "...post"
    const RenderCards = ({data, title}) => {
        if (data?.length > 0) {
            return data.map((post) => <Card key={post._id} {...post} />)
        }

        // Otherwise, return the title.
        return (<h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
            {title}
        </h2>);
    }

    return (
        // Max width of about 80rem and a marginX of auto.
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    The Community Showcase
                </h1>
                <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
                    Browse through a collection of imaginitive and visually stunning images created by DALL-E AI
                </p>
            </div>

            {/* Call form field component */}
            <div className='mt-16'>
                <FormField />
            </div>

            {/* Using the React state, check if we are currently loading. If so, display the loader component. 
            If not, display our images. This can be from our search or just generic images. */}
            <div className='mt-10'>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : (
                    // If we aren't loading, check if we have something inside the search text.
                    // If we do, display an h2 saying 'showing results for' and the searchText field passed in.
                    <>
                        {searchText && (
                            <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                Showing Results for <span className='text-[#222328]'>{searchText}</span>
                            </h2>
                        )}
                        {/* Here we are establishing a css grid of images.  
                        We specify the number of columns based on the size of the device. */}
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {/* In the grid, search if searchText exists. and if it does,
                            we want to render cards and pass the data to it (searched results with image search)
                            If no search results, provide title of no search results found. */}
                            {searchText ? (
                                <RenderCards
                                    data={[]}
                                    title="No search results found"
                                />
                            ) : (
                                // If we're not trying to search for something, then we can render the cards.
                                // Data passed will be all posts and title could be no posts found if there aren't any posts.
                                
                                <RenderCards
                                    data={[]}
                                    title="No posts found"
                                />
                            )}
                        </div>
                    </>
                )}
            </div>

        </section>
  )
}

export default Home
