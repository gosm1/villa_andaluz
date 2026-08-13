import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from '../components/Lightbox.jsx'
import Icon from '../components/Icons.jsx'
import { photos } from '../data/photos.js'
import { villa } from '../data/villa.js'

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const rooms = useMemo(() => ['All', ...new Set(photos.map((p) => p.room))], [])
  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.room === filter)),
    [filter],
  )

  return (
    <div className="shell gallery">
      <Link to="/" className="checkout__back">
        <Icon name="chevronLeft" size={14} /> Back to the villa
      </Link>

      <div className="gallery__head">
        <div>
          <p className="eyebrow">{villa.location}</p>
          <h1 className="gallery__title">
            Photo <em className="serif-italic">tour</em>
          </h1>
        </div>
        <p className="section__lede" style={{ margin: 0 }}>
          {visible.length} of {photos.length} photos
        </p>
      </div>

      <div className="gallery__filters">
        {rooms.map((room) => (
          <button
            key={room}
            type="button"
            className={`chip ${filter === room ? 'is-active' : ''}`}
            onClick={() => setFilter(room)}
          >
            {room}
          </button>
        ))}
      </div>

      <div className="gallery__grid">
        {visible.map((photo) => (
          <button
            key={photo.src}
            type="button"
            className="gallery__cell"
            onClick={() => setLightboxIndex(visible.indexOf(photo))}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <Lightbox
        photos={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  )
}
