import axios from "axios";

export const actions = {
  postTask({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const api_uri = state.api_uri + "/";

      axios({
        method: "post",
        url: api_uri,
        data: {
          title: payload.title,
          description: payload.description,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error("error", error);
          dispatch("errorHandler", error.response.status);
          reject(error);
        });
    });
  },

}
