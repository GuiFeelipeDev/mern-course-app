import React from "react"

import "./UserItem.css"
import Avatar from "../../shared/components/UIElements/Avatar"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Card from "../../shared/components/UIElements/Card"

const UserItem = ({ data }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${data.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={process.env.REACT_APP_ASSET_URL + data.image}
              alt={data.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{data.name}</h2>
            <h3>
              {data.places.length} {data.places === 1 ? "Place" : "Places"}{" "}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default UserItem
