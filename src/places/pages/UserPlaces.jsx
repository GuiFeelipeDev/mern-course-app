import React, { useEffect, useState } from "react"
import PlaceList from "../components/PlaceList"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useHttpClient } from "../../shared/hooks/http-hook"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const userId = useParams().userId

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const resData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/places/user/" + userId
        )
        setLoadedPlaces(resData.places)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlaces()
  }, [sendRequest, userId])

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
    </>
  )
}

export default UserPlaces
