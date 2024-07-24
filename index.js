const { Permit } = require("permitio");
require('dotenv').config();

const express = require("express");
const app = express();
const port = 4000;

const permit = new Permit({
  pdp: "https://cloudpdp.api.permit.io",
  token:
    process.env.PERMIT_API_KEY,
  log: {
    level: "debug",
  },
});

const newResource={
  key: "r1",
  name: "r1",
  urn: "r1",
  description: "this is description for r1",
  actions: {},
  attributes: {},
  roles: {},
  relations: {}
}

const response = await permit.api.createResource(JSON.stringify(newResource));



const ayushUser = {
  key: "iamayushsharma.io",
  email: "iamayushsharma60@gmail.com",
  first_name: "Ayush",
  last_name: "Sharma",
  attributes: {},
};

(async () => {permit.api.createUser(ayushUser).then((response) => {
  console.log("this is create user response:::::)   "+response);
});
})();


const roleAssign = {
    role: "viewer",
    tenant:"newtenant",
    user: ayushUser.key
}
permit.api.assignRole(JSON.stringify(roleAssign)).then((assignmentResponse)=>{
    console.log("this is assignment response:::)  "+assignmentResponse);
})

const permitted = await permit.check(userKey, "create", );

app.get("/", async (req, res) => {
  const permitted = await permit.check('iamayushsharma.io', "create", {
    type: "r1", // The resource name
    tenant: "default", // The tenant key
  });
  if (permitted) {
    res.send("Ayush is PERMITTED to create a credential");
  } else {
    res.send("Ayush is NOT PERMITTED to create a credential");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
