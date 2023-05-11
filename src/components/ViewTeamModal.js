import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "90%",
  overflow: "scroll",
};

export default function ViewTeamModal(props) {
  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={props.closeViewteamModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Team
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            {props.selectedUsers.map((user) => {
              return (
                <div key={user.id} className="card-wrapper">
                  <Avatar src={user.avatar} />
                  <div className="card-text">
                    <div>
                      <p>Name:</p>
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                    </div>
                    <div>
                      <p>Email:</p> <span>{`${user.email}`}</span>
                    </div>
                    <div>
                      <p>Gender:</p> <span>{`${user.gender}`}</span>
                    </div>
                    <div>
                      <p>Domain:</p> <span>{`${user.domain}`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
