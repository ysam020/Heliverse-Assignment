import React from "react";

function useViewTeamModal(
  setSelectedUsers,
  setIsSelectUser,
  isSelectUser,
  selectedUsers
) {
  // View Team Modal
  const [openModal, setOpenModal] = React.useState(false);
  const openViewteamModal = () => {
    setOpenModal(true);
  };
  const closeViewteamModal = () => {
    setOpenModal(false);
    setSelectedUsers([]); // clear selected users on close
  };

  const handleViewTeam = () => {
    if (!isSelectUser) {
      setIsSelectUser(true); // show checkboxes to select users
    } else if (selectedUsers.length === 0) {
      alert("Select atleast 1 member to view team"); // if no user is selected, show alert
    } else {
      setOpenModal(true); // show team modal
      setIsSelectUser(false); // hide checkboxes
    }
  };
  return {
    openModal,
    openViewteamModal,
    closeViewteamModal,
    handleViewTeam,
  };
}

export default useViewTeamModal;
