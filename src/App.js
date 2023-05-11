import React, { useState, useEffect } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Filters from "./components/Filters";
import UserCard from "./components/UserCard";
import { Row } from "react-bootstrap";
import Pagination from "./components/Pagination";
import { fetchUsers } from "./redux/actions/fetchUsers";
import { connect } from "react-redux";
import ViewTeamModal from "./components/ViewTeamModal";
import useViewTeamModal from "./customHooks/useViewTeamModal";
import usePagination from "./customHooks/usePagination";

const drawerWidth = 240;

function App(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [searchInput, setSearchInput] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [isSelectUser, setIsSelectUser] = useState(false); // to conditionally show checkboxes to select users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Modal
  const { openModal, openViewteamModal, closeViewteamModal, handleViewTeam } =
    useViewTeamModal(
      setSelectedUsers,
      setIsSelectUser,
      isSelectUser,
      selectedUsers
    );

  // Pagination
  const { cardsPerPage, cardsVisited, pageCount, changePage } = usePagination(
    props.users.data
  );

  useEffect(() => {
    props.fetchUsers(
      searchInput,
      selectedDomain,
      selectedGender,
      selectedAvailability
    );
    // eslint-disable-next-line
  }, [searchInput, selectedDomain, selectedGender, selectedAvailability]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            backgroundColor: "rgba(249, 250, 251, 0.3)",
            backdropFilter: "blur(6px) !important",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon sx={{ color: "#252E3E" }} />
            </IconButton>
            <h3
              style={{ color: "#000", marginLeft: "20px", overflow: "hidden" }}
            >
              Heliverse Assignment
            </h3>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Drawer mobile */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#252E3E !important",
              },
            }}
          >
            <div className="filters">
              <Filters
                setSelectedDomain={setSelectedDomain}
                setSelectedGender={setSelectedGender}
                setSelectedAvailability={setSelectedAvailability}
              />
              <button
                className="create-team-btn"
                onClick={() => setIsSelectUser(!isSelectUser)}
              >
                {isSelectUser ? "View Team" : "Create Team"}
              </button>
            </div>
          </Drawer>

          {/* Drawer desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#252E3E !important",
              },
            }}
            open
          >
            <div className="filters">
              <Filters
                setSelectedDomain={setSelectedDomain}
                setSelectedGender={setSelectedGender}
                setSelectedAvailability={setSelectedAvailability}
              />
              <button
                className="create-team-btn"
                onClick={() => handleViewTeam()}
              >
                {isSelectUser ? "View Team" : "Create Team"}
              </button>
            </div>
          </Drawer>
        </Box>

        {/* Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "#F8F9FB",
            height: "100vh",
          }}
        >
          <Toolbar />
          <Typography component="div">
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Row>
              <UserCard
                data={props.users.data}
                cardsVisited={cardsVisited}
                cardsPerPage={cardsPerPage}
                isSelectUser={isSelectUser}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
              <Pagination pageCount={pageCount} changePage={changePage} />
            </Row>
          </Typography>
        </Box>
      </Box>

      <ViewTeamModal
        openModal={openModal}
        openViewteamModal={openViewteamModal}
        closeViewteamModal={closeViewteamModal}
        selectedUsers={selectedUsers}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (
      searchInput,
      selectedDomain,
      selectedGender,
      selectedAvailability
    ) =>
      dispatch(
        fetchUsers(
          searchInput,
          selectedDomain,
          selectedGender,
          selectedAvailability
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
