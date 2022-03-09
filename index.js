const { request } = require("@octokit/request");

var reg = new RegExp(/.+?(?=T)/);

const getEventsTypes = async (name) => {
  const returned = await request(`GET /users/${name}/events`, {
    per_page: 150,
  });
  const eventMap = new Map();
  for (x in returned.data) {
    if (!eventMap.has(returned.data[x].repo.name)) {
      eventMap.set(returned.data[x].repo.name, {
        interactions: 1,
        list: [
          returned.data[x].type,

          returned.data[x].created_at.match(reg)[0],
        ],
      });
    } else {
      eventMap.get(returned.data[x].repo.name).interactions++;
      eventMap.get(returned.data[x].repo.name).list.push(
        returned.data[x].type,

        returned.data[x].created_at.match(reg)[0]
      );
    }
  }
  return eventMap;
};

const getEventsRepos = async (name) => {
  const returned = await request(`GET /users/${name}/events`, {
    per_page: 101,
  });
  const eventMap = new Map();
  //   console.log(returned.data[1].payload, "------");
  for (x in returned.data) {
    console.log(returned.data[x].repo, "------");
    console.log(x);
  }

  return eventMap;
};

(async () => {
  console.log(await getEventsTypes("char"));
})();
