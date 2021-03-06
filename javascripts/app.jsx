const m        = require("mithril");
const Layout   = require("./layout.jsx");
const Topics   = require("./topics.jsx");
const Topic    = require("./topic.jsx");
const Replies  = require("./replies.jsx");
const User     = require("./user.jsx");

m.route(document.body, "/", {
  "/": {
    onmatch: function() {
      Layout.activePath("/");
      Topics.loadList();
    },
    render: function() {
      return m(Layout, m(Topics))
    }
  },
  "/topics/:type": {
    onmatch: function(params, path) {
      var mdata;

      Layout.activePath(path);
      if (mdata = params.type.match(/node(\d+)/)) {
        Topics.loadList(null, mdata[1]);
      } else {
        Topics.loadList(params.type);  
      }
    },
    render: function() {
      return m(Layout, m(Topics))
    }
  },
  "/topic/:id": {
    onmatch: function(params) {
      Topic.load(params.id);
      Replies.loadList(params.id);
    },
    render: function() {
      return m(Layout, m(Topic))
    }
  },
  "/:login": {
    onmatch: function(params) {
      User.load(params.login);
    },
    render: function() {
      return m(Layout, m(User))
    }
  }
});
