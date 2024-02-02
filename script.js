document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('photo-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.close-button');
    const downloadButton = document.getElementById('download-button');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let images = [];
    let currentIndex = 0;

    function updateImage(index) {
        lightboxImage.src = images[index].src;
        downloadButton.href = images[index].src; 
        downloadButton.download = `downloaded_image_${index}.jpg`; 
    }

    for (let i = 0; i < 30; i++) {
        fetch('https://source.unsplash.com/random/1000x1500')
            .then((response) => {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                const img = document.createElement('img');
                img.src = response.url;
                photoItem.appendChild(img);
                gallery.appendChild(photoItem);
                images.push(img);

                setTimeout(() => {
                    photoItem.classList.add('fade-in');
                }, i * 200);
            });
    }

    gallery.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            currentIndex = images.indexOf(event.target);
            updateImage(currentIndex);
            lightbox.classList.add('active');
        }
    });

    lightboxPrev.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateImage(currentIndex);
        }
    });

    lightboxNext.addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateImage(currentIndex);
        }
    });

    downloadButton.addEventListener('click', function(event) {
        event.preventDefault();
        const url = lightboxImage.src; 
        const filename = downloadButton.download; 

        fetch(url, {
            method: 'GET',
            headers: {}
        })
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(link.href);
        })
        .catch(e => console.error('Ошибка при скачивании файла:', e));
    });

    closeButton.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});
