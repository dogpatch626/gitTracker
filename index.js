const { request } = require("@octokit/request");
const getEvents = async (name) => {
  const returned = await request(`GET /users/${name}/events`);
  const eventMap = new Map();
  for (x in returned.data) {
    if (!eventMap.has(returned.data[x].type.toString())) {
      eventMap.set(returned.data[x].type.toString(), { val: 1 });
    } else {
      eventMap.get(returned.data[x].type.toString()).val++;
    }
  }
  return eventMap;
};

const getEventsRepos = async (name) => {
  const returned = await request(`GET /users/${name}/events`);
  const eventMap = new Map();
  console.log(returned.data[1].repo, "------");
  console.log(returned.data[1].payload, "------");
  //   for (x in returned.data) {

  //   }
  return eventMap;
};

(async () => {
  console.log(await getEventsRepos("dogpatch626"));
})();
