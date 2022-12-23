const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

let blueprints = input.map((lines) => {
  const bp = lines.split(':');
  const rest = bp[1].split('.');

  return {
    id: bp[0].match(/\d+/g).map(Number)[0],
    ore: { ore: rest[0].match(/\d+/g).map(Number)[0] },
    clay: { ore: rest[1].match(/\d+/g).map(Number)[0] },
    obsidian: {
      ore: rest[2].match(/\d+/g).map(Number)[0],
      clay: rest[2].match(/\d+/g).map(Number)[1],
    },
    geode: {
      ore: rest[3].match(/\d+/g).map(Number)[0],
      obsidian: rest[3].match(/\d+/g).map(Number)[1],
    },
  };
});

blueprints = blueprints.filter((bp) => bp.id <= 3);

const res = blueprints.reduce((best, blueprint) => {
  let states = [
    {
      robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      account: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
    },
  ];

  for (let minute = 0; minute < 32; minute++) {
    let newStates = [];
    for (let state of states) {
      // geode
      if (
        state.account.ore >= blueprint.geode.ore &&
        state.account.obsidian >= blueprint.geode.obsidian
      ) {
        newStates.push({
          robots: {
            ore: state.robots.ore,
            clay: state.robots.clay,
            obsidian: state.robots.obsidian,
            geode: state.robots.geode + 1,
          },
          account: {
            ore: state.robots.ore + state.account.ore - blueprint.geode.ore,
            clay: state.robots.clay + state.account.clay,
            obsidian:
              state.robots.obsidian +
              state.account.obsidian -
              blueprint.geode.obsidian,
            geode: state.robots.geode + state.account.geode,
          },
        });
      }
      // obsidian
      if (
        state.account.ore >= blueprint.obsidian.ore &&
        state.account.clay >= blueprint.obsidian.clay
      ) {
        newStates.push({
          robots: {
            ore: state.robots.ore,
            clay: state.robots.clay,
            obsidian: state.robots.obsidian + 1,
            geode: state.robots.geode,
          },
          account: {
            ore: state.robots.ore + state.account.ore - blueprint.obsidian.ore,
            clay:
              state.robots.clay + state.account.clay - blueprint.obsidian.clay,
            obsidian: state.robots.obsidian + state.account.obsidian,
            geode: state.robots.geode + state.account.geode,
          },
        });
      }
      // clay
      if (state.account.ore >= blueprint.clay.ore) {
        newStates.push({
          robots: {
            ore: state.robots.ore,
            clay: state.robots.clay + 1,
            obsidian: state.robots.obsidian,
            geode: state.robots.geode,
          },
          account: {
            ore: state.robots.ore + state.account.ore - blueprint.clay.ore,
            clay: state.robots.clay + state.account.clay,
            obsidian: state.robots.obsidian + state.account.obsidian,
            geode: state.robots.geode + state.account.geode,
          },
        });
      }
      // ore
      if (state.account.ore >= blueprint.ore.ore) {
        newStates.push({
          robots: {
            ore: state.robots.ore + 1,
            clay: state.robots.clay,
            obsidian: state.robots.obsidian,
            geode: state.robots.geode,
          },
          account: {
            ore: state.robots.ore + state.account.ore - blueprint.ore.ore,
            clay: state.robots.clay + state.account.clay,
            obsidian: state.robots.obsidian + state.account.obsidian,
            geode: state.robots.geode + state.account.geode,
          },
        });
      }
      // default (no change)
      newStates.push({
        robots: {
          ore: state.robots.ore,
          clay: state.robots.clay,
          obsidian: state.robots.obsidian,
          geode: state.robots.geode,
        },
        account: {
          ore: state.robots.ore + state.account.ore,
          clay: state.robots.clay + state.account.clay,
          obsidian: state.robots.obsidian + state.account.obsidian,
          geode: state.robots.geode + state.account.geode,
        },
      });
    }

    let score = newStates.map((state) => {
      return (
        (state.account.geode + (32 - minute) * state.robots.geode) * 1000 +
        state.robots.obsidian * 100 +
        state.robots.clay * 10 +
        state.robots.ore
      );
    });

    states = newStates
      .map((state, i) => ({ state, score: score[i] }))
      .sort((a, b) => b.score - a.score)
      .map((t) => t.state)
      .slice(0, 120000);
  }
  states.sort((a, b) => b.account.geode - a.account.geode);
  return best * states[0].account.geode;
}, 1);

console.log(res);
