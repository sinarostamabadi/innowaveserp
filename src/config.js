const config = () => {
  switch (process.env.REACT_APP_LANG) {
    case "fa":
      return fa_v1;
    case "tr":
      return tr_v1;
    default:
      return null;
  }
};

const fa_v1 = {
  date: process.env.REACT_APP_DATE,
  bowling: {
    create: 0,
    players: 0,
    list: "v1"
  },
};

const tr_v1 = {
  date: process.env.REACT_APP_DATE,
  bowling: {
    create: 1,
    players: 1,
    list: "v2"
  },
};

export default config;
