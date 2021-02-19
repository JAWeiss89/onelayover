import React, { useState } from 'react';
import "../styles/ActivityPhotos.css"

const ActivityPhotos = ( {activity} ) => {
    const [featuredImage, setFeaturedImage] = useState(activity.photos[0]);
    const handleClick = (e) => {
        console.log(typeof(e.target.attributes.photo_id.value));
        const photoClicked = activity.photos.find((photo)=> {
            return (photo.id === Number(e.target.attributes.photo_id.value));
        })
        setFeaturedImage(photoClicked);
    }
    return (
        <div className="ActivityPhotos">
        <img className="ActivityPhotos-main" src={featuredImage.url} alt={featuredImage.caption} />
        <div className="ActivityPhotos-strip">
            {activity.photos.map((photo) => {
                return (
                    <div onClick={handleClick} className="ActivityPhotos-photo" key={photo.caption} >
                        <img src={photo.url} alt={photo.caption} photo_id={photo.id}/>
                    </div>
                )
            })}
        </div>
        </div>

    )
}

export default ActivityPhotos;