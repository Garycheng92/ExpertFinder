//Get profile by ID
export const getProfileById = userId => async dispatch => {

  try {
    const res = await axios.get(`/api/profiles/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }