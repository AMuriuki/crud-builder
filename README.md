# CRUD Builder

If you are developing a front-end application that uses a back-end with RESTFUL APIs then this simple `crudBuilder` function will help you avoid writing functions for each & every endpoint.

For example, if you have the following functions:

```js
// apis/users.js

// create
export function createUser(userFormValues) {
  return fetch("/users", { method: "POST", body: userFormValues });
}

// read
export function getListOfUsers(keyword) {
  return fetch(`/users?keyword=?${keyword}`);
}

export function getUser(id) {
  return fetch(`/users/${id}`);
}

// update
export function updateUser(id, userFormValues) {
  return fetch(`/users/${id}`, { method: "PUT", body: userFormValues });
}

// destroy
export function removeUser(id) {
  return fetch(`/users/${id}`, { method: "DELETE" });
}
```

We can replace them all with a simple function call

```js
// apis/users.js

export const users = crudBuilder("/users");
```

And use it like this:

```js
users.create(values);
users.show(1);
users.list("john");
users.update(values);
users.remove(1);
```

# But Why
* To reduce lines of code - which is more easy to maintain
* Enforce a naming convention - increasing code readability


