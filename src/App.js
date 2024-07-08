import React, { lazy, Suspense } from "react"
import { Route, BrowserRouter as Router } from "react-router-dom"
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from "./shared/hooks/auth-hook"
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner"

const Users = lazy(() => import("./users/pages/Users"))
const NewPlace = lazy(() => import("./places/pages/NewPlace"))
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"))
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"))
const Auth = lazy(() => import("./users/pages/Auth"))

function App() {
  const { token, login, logout, userId } = useAuth()

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
