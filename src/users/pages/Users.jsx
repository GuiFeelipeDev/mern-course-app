import React, { useEffect, useState } from "react"
import UsersList from "../components/UsersList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        )
        setLoadedUsers(resData.users)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [sendRequest])

  const errorHandler = () => {
    clearError()
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}

      {!isLoading && loadedUsers[0] && <UsersList items={loadedUsers} />}
    </>
  )
}

export default Users
