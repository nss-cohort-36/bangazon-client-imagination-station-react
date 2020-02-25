const remoteURL = "http://localhost:8000";

export default {
  async get(route, id = null) {
    let results;
    if (id !== null) {
      results = await fetch(`${remoteURL}/${route}/${id}`);
    } else {
      results = await fetch(`${remoteURL}/${route}`);
    }
    return results.json();
  },

  async delete(route, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "DELETE"
    });
    return results.json();
  },

  async post(route, newItem) {
    const results = await fetch(`${remoteURL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    });
    return results.json();
  },

  async update(route, editedItem, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    });
    return results.json();
  },

  async patch(route, editedItem, id) {
    const results = await fetch(`${remoteURL}/${route}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    });
    return results.json();
  }
};
