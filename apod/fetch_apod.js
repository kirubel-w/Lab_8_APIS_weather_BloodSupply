let apodApiUrl = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic/261018?api_key=GcjHmJfng6hnLBBMzWBgD8DTq7MQJLG6wq8TFLF7'
// Request for a "picture" of the day that returns a video. Use your own key 

// Get the HTML elements we want to update.
let apodTitle = document.querySelector('#apod-title')
let apodExplanation = document.querySelector('#apod-explanation')
let apodImage = document.querySelector('#apod-image')
let apodVideo = document.querySelector('#apod-video')

fetch(apodApiUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data) // Check what the API sends back.

        // Display the title and explanation.
        let title = data.title
        apodTitle.innerHTML = title

        let explanation = data.explanation
        apodExplanation.innerHTML = explanation

        let mediaType = data.media_type
        let url = data.hdurl

        if (mediaType === 'image') {
            // Show the image if this entry is a picture.
            apodImage.src = url
            apodImage.style.display = 'block'
        }
        else if (mediaType === 'video') {
            // Find the iframe's src inside the HTML returned by NASA.
            let videoMatch = data.basic_html.match(/<iframe[^>]+src=["']([^"']+)["']/i)

            if (videoMatch) {
                // Get the video URL from the iframe's src attribute.
                let videoUrl = videoMatch[1].startsWith('//')
                    // Add https: if the URL starts with //.
                    ? 'https:' + videoMatch[1]
                    // Otherwise, keep the URL as it is.
                    : videoMatch[1]

                // Load the video into our iframe and make it visible.
                apodVideo.src = videoUrl
                apodVideo.style.display = 'block'
            }
        }

    })
    .catch(err => {
        // Show a message if the request fails.
        console.log(err)
        apodExplanation.innerHTML = 'Sorry, could not fetch today\'s astronomy picture.'
    })