let generateImageForm = document.getElementById('generate-image-form');
let formInput = document.getElementById('input-value');
let imageContainerText = document.getElementById('imageContainerText');
let imageGenerated = document.getElementById('generated-image');
let imageContainer = document.getElementById('images-visible');

async function fetchImages(prompt) {
    try {
        // Define the API endpoint and request options
        const response = await fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
            method: 'POST',
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt })
        });

        // Check if the response is okay
        if (!response.ok) {
            const errorData = await response.json(); // Get error details
            throw new Error(`Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        // Convert response to a blob
        let blob = await response.blob();
        let imageUrl = URL.createObjectURL(blob);

        // Clear previous image and update UI with the generated image
        imageGenerated.src = "";  // Clear previous image
        imageContainerText.innerText = "Below is your generated image:";
        imageContainer.style.display = "block";
        imageGenerated.src = imageUrl;
    } catch (error) {
        console.error('Fetch Error:', error);
        imageContainerText.innerText = `Error fetching image: ${error.message}`;
        imageContainer.style.display = "block";
        imageGenerated.src = "";  // Clear image display on error
    }
}

generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value.trim();
    if (enteredText !== "") {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = "Input field cannot be empty!";
        imageContainer.style.display = "block";
        imageGenerated.src = "";  // Clear image display if input is empty
    }
});
