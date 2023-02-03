import { surpriseMePrompts } from "../constant";

// Get a random prompt from the hard coded prompts file.
export function getRandomPrompt(prompt) {
    // Get a random number (index) from 1-49.
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    // Retrieve the random prompt
    const randomPrompt = surpriseMePrompts[randomIndex];

    // Check if out prompt is the same as before, if so, generate another. 
    if (randomPrompt === prompt) {
        return getRandomPrompt;
    }

    return randomPrompt;
}