import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Col } from "react-bootstrap";

function UserCard(props) {
  function createTeam(e, user) {
    // check if the user is available
    if (!user.available) {
      return; // do not add to selectedUsers if user is not available
    }

    // check if the domain has already been selected
    const domainSelected = props.selectedUsers.some(
      (selectedUser) => selectedUser.domain === user.domain
    );

    if (domainSelected && e.target.checked) {
      return; // do not add to selectedUsers if domain has already been selected
    }

    // add user to selectedUsers
    if (e.target.checked) {
      props.setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        user,
      ]);
    } else {
      props.setSelectedUsers(
        props.selectedUsers.filter(
          (selectedUser) => selectedUser.id !== user.id
        )
      );
    }
  }

  return props.data
    .slice(props.cardsVisited, props.cardsVisited + props.cardsPerPage)
    .map((card) => {
      return (
        <Col lg={6} key={card.id} className="card-col">
          <div className="card-wrapper">
            <Avatar src={card.avatar} />
            <div className="card-text">
              <div>
                <p>Name:</p>{" "}
                <span>{`${card.first_name} ${card.last_name}`}</span>
              </div>

              <div>
                <p>Email:</p> <span>{`${card.email}`}</span>
              </div>
              <div>
                <p>Gender:</p> <span>{`${card.gender}`}</span>
              </div>
              <div>
                <p>Domain:</p> <span>{`${card.domain}`}</span>
              </div>
            </div>
            <Tooltip title={card.available ? "Available" : "Unavailable"}>
              <div
                className="user-status"
                style={
                  card.available
                    ? { backgroundColor: "#6CB763" }
                    : { backgroundColor: "#F15C6D" }
                }
              ></div>
            </Tooltip>
            {props.isSelectUser && (
              <Checkbox
                sx={{
                  color: "#252E3E",
                  "&.Mui-checked": {
                    color: "#252E3E",
                  },
                }}
                disableRipple={true}
                onChange={(e) => {
                  createTeam(e, card);
                }}
                disabled={
                  !card.available ||
                  props.selectedUsers.some(
                    (selectedUser) =>
                      selectedUser.domain === card.domain &&
                      selectedUser.id !== card.id
                  )
                }
              />
            )}
          </div>
        </Col>
      );
    });
}

export default UserCard;
