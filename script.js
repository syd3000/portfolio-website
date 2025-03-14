/**
 * Dynamically loads images and descriptions from a JSON file.
 * @param {string} folderName - The folder containing images and the JSON file.
 * @param {string} divId - The ID of the div where content should be displayed.
 */
function loadImagesFromFolder(folderName, divId) {
    const jsonFilePath = `${folderName}/descriptions.json`; // JSON file location

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON from ${jsonFilePath}`);
            }
            return response.json();
        })
        .then(data => {
            displayImages(data, folderName, divId); // Call function to render HTML
        })
        .catch(error => console.error(`Error loading data from ${folderName}:`, error));
}

/**
 * Displays images and descriptions inside the given div.
 * @param {Array} data - The JSON data array.
 * @param {string} folderName - The folder containing the images.
 * @param {string} divId - The ID of the div to populate.
 */
function displayImages(data, folderName, divId) {
    const container = document.getElementById(divId);
    if (!container) {
        console.error(`Div with ID "${divId}" not found.`);
        return;
    }

    data.forEach(item => {
        const imgWithInfoDiv = document.createElement('div');
        if (item.yesNo.toLowerCase() === 'yes') {
            imgWithInfoDiv.className = 'img-with-info vertical';
        } else {
            imgWithInfoDiv.className = 'img-with-info';
        }

        // Create description box
        const descriptionBox = document.createElement('div');
        if (item.yesNo.toLowerCase() === 'yes') {
            descriptionBox.className = 'description-box vertical';
        } else {
            descriptionBox.className = 'description-box f';
        }
        descriptionBox.insertAdjacentHTML('beforeend', `
            <h2><i><b>${item.title}</b></i>, ${item.year}</h2>
            <p><h3>${item.description}</h3><br>${item.size}</p>
        `);

        // Append description box
        imgWithInfoDiv.appendChild(descriptionBox);

        // Create container for image with border
        const imgWithBorderDiv = document.createElement('div');
        if (item.yesNo.toLowerCase() === 'yes') {
            imgWithBorderDiv.className = 'img-with-border vertical';
        } else {
            imgWithBorderDiv.className = 'img-with-border';
        }

        // Create wrapper for the image
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';

        // Create image element
        const img = document.createElement('img');
        img.src = `${folderName}/${item.imageName}.jpg`; // Use given folder
        img.alt = item.title;

        // Append image to image wrapper
        imageWrapper.appendChild(img);

        // Append wrapper to imgWithBorderDiv
        imgWithBorderDiv.appendChild(imageWrapper);

        // Append imgWithBorderDiv to imgWithInfoDiv
        imgWithInfoDiv.appendChild(imgWithBorderDiv);

        // Append the entire structure to the main container
        container.appendChild(imgWithInfoDiv);
    });
}




