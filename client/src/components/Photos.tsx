import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { deletePhoto, getPhotos } from '../api/photos-api'
import { Photo } from '../types/Photo'
import Auth from '../auth/Auth'

const Photos = ({ auth }: { auth: Auth }) => {
  const history = useHistory()
  const [photos, setPhotos] = React.useState<Photo[]>([])
  const [loading, setLoading] = React.useState(true)
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    getPhotos(auth.idToken).then((data) => {
      setLoading(false)
      setPhotos(data)
    })
  }, [auth.idToken, count])

  async function handleDeletePhoto(key: string) {
    deletePhoto(auth.idToken, key).then(() => {
      setCount(count + 1)
    })
  }
  return (
    <div>
      <h1> Photos:</h1>
      <h3>Click on a photo to start editing its name</h3>
      {!!loading && <p>Loading...</p>}
      <div>
        {photos.map((photo) => {
          return (
            <>
              <div
                key={photo.photoKey}
                style={{
                  cursor: 'pointer',
                  marginBottom: '3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h3>
                  <b> {photo.photoName}</b>
                </h3>
                <img
                  onClick={() => {
                    history.push(`/photos/edit/${photo.photoKey}`)
                  }}
                  width={300}
                  height={300}
                  src={photo.photoUrl}
                  alt={photo.photoName}
                />
                <button
                  onClick={() => {
                    handleDeletePhoto(photo.photoKey)
                  }}
                  style={{
                    width: '5rem',
                    padding: '5px 15px',
                    marginTop: '15px'
                  }}
                >
                  Delete
                </button>
                <div>
                  <button
                    onClick={() => history.push('/photos/add')}
                    style={{
                      width: '10rem',
                      padding: '5px 15px',
                      marginTop: '15px'
                    }}
                  >
                    Add a photo
                  </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Photos
