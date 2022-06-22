let app = new Vue({
  el: '#app',
  data: {
    baseurl: '',
    routes: [],
    posts: [],
    loading: false,
    buttonSearch: false,
    post:{},
  },
  _route: '',
  computed: {
    route: {
      set(v) {
        app._route = v;
        app.posts = [];
        app.loading = true;
        fetch(app.baseurl + '/wp-json' + v).then((r) => {
          r.json().then((d) => {
            app.loading = false;
            app.posts = d;
          });
        });
      },
      get() {
        return app._route;
      }
    }
  },
  methods: {
    start() {
      app.routes = [];
      app.loading = true;
      fetch(app.baseurl + '/wp-json/wp/v2').then((r) => {
        r.json().then((d) => {
          app.loading = false;
          app.buttonSearch = true;
          for (var r in d.routes) {
            if (r.indexOf('(') == -1)
              app.routes.push(r);
          }
        });
      });
    },
    rendered(o) {
      if (o == null) return o
      return o.rendered || o
    },
    title(p) {
      if (p.title) return app.rendered(p.title)
      if (p.name) return app.rendered(p.name)
      if (p.id) return app.rendered(p.id)
    },
  }
});
