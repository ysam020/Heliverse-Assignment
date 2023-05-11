import axios from "axios";

export const fetchUsersRequest = () => {
  return {
    type: "FETCH_USERS_REQUEST",
  };
};

export const fetchUsersSuccess = (data) => {
  return {
    type: "FETCH_USERS_SUCCESS",
    payload: data,
  };
};

export const fetchUsersError = (error) => {
  return {
    type: "FETCH_USERS_ERROR",
    payload: error,
  };
};

export const fetchUsers = (
  searchInput,
  selectedDomain,
  selectedGender,
  selectedAvailability
) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("/data.json")
      .then((res) => {
        let data = res.data;
        if (searchInput) {
          data = data.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`;
            return fullName.toLowerCase().includes(searchInput.toLowerCase());
          });
        }

        if (selectedDomain !== "") {
          data = data.filter((user) => user.domain === selectedDomain);
        }

        if (selectedGender !== "") {
          data = data.filter((user) => user.gender === selectedGender);
        }

        if (selectedAvailability !== "") {
          data = data.filter(
            (user) => user.available.toString() === selectedAvailability
          );
        }

        dispatch(fetchUsersSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchUsersError(err.message));
      });
  };
};
