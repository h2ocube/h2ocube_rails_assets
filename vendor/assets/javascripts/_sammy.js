// name: sammy
// version: 0.7.4

// Sammy.js / http://sammyjs.org

(function($, window) {
  (function(factory){
    // Support module loading scenarios
    if (typeof define === 'function' && define.amd){
      // AMD Anonymous Module
      define(['jquery'], factory);
    } else {
      // No module loader (plain on(array, callback, now) {
      var context = this;
      var coll = function() {
        if (_isFunction(array)) {
          callback = array;
          array = this.content;
        }
        var contents = [], doms = false;
        $.each(array, function(i, item) {
          var returned = callback.apply(context, [i, item]);
          if (returned.jquery && returned.length == 1) {
            returned = returned[0];
            doms = true;
          }
          contents.push(returned);
          return returned;
        });
        return doms ? contents : contents.join('');
      };
      return now ? coll() : this.then(coll);
    },

    // loads a template, and then interpolates it for each item in the `data`
    // array. If a callback is passed, it will call the callback with each
    // item in the array _after_ interpolation
    renderEach: function(location, name, data, callback) {
      if (_isArray(name)) {
        callback = data;
        data = name;
        name = null;
      }
      return this.load(location).then(function(content) {
          var rctx = this;
          if (!data) {
            data = _isArray(this.previous_content) ? this.previous_content : [];
          }
          if (callback) {
            $.each(data, function(i, value) {
              var idata = {}, engine = this.next_engine || location;
              if (name) {
                idata[name] = value;
              } else {
                idata = value;
              }
              callback(value, rctx.event_context.interpolate(content, idata, engine));
            });
          } else {
            return this.collect(data, function(i, value) {
              var idata = {}, engine = this.next_engine || location;
              if (name) {
                idata[name] = value;
              } else {
                idata = value;
              }
              return this.event_context.interpolate(content, idata, engine);
            }, true);
          }
      });
    },

    // uses the previous loaded `content` and the `data` object to interpolate
    // a template. `engine` defines the templating/interpolation method/engine
    // that should be used. If `engine` is not passed, the `next_engine` is
    // used. If `retain` is `true`, the final interpolated data is appended to
    // the `previous_content` instead of just replacing it.
    interpolate: function(data, engine, retain) {
      var context = this;
      return this.then(function(content, prev) {
        if (!data && prev) { data = prev; }
        if (this.next_engine) {
          engine = this.next_engine;
          this.next_engine = false;
        }
        var rendered = context.event_context.interpolate(content, data, engine, this.partials);
        return retain ? prev + rendered : rendered;
      });
    },

    // Swap the return contents ensuring order. See `Application#swap`
    swap: function(callback) {
      return this.then(function(content) {
        this.event_context.swap(content, callback);
        return content;
      }).trigger('changed', {});
    },

    // Same usage as `jQuery.fn.appendTo()` but uses `then()` to ensure order
    appendTo: function(selector) {
      return this.then(function(content) {
        $(selector).append(content);
      }).trigger('changed', {});
    },

    // Same usage as `jQuery.fn.prependTo()` but uses `then()` to ensure order
    prependTo: function(selector) {
      return this.then(function(content) {
        $(selector).prepend(content);
      }).trigger('changed', {});
    },

    // Replaces the `$(selector)` using `html()` with the previously loaded
    // `content`
    replace: function(selector) {
      return this.then(function(content) {
        $(selector).html(content);
      }).trigger('changed', {});
    },

    // trigger the event in the order of the event context. Same semantics
    // as `Sammy.EventContext#trigger()`. If data is omitted, `content`
    // is sent as `{content: content}`
    trigger: function(name, data) {
      return this.then(function(content) {
        if (typeof data == 'undefined') { data = {content: content}; }
        this.event_context.trigger(name, data);
        return content;
      });
    }

  });

  // `Sammy.EventContext` objects are created every time a route is run or a
  // bound event is triggered. The callbacks for these events are evaluated within a `Sammy.EventContext`
  // This within these callbacks the special methods of `EventContext` are available.
  //
  // ### Example
  //
  //       $.sammy(function() {
  //         // The context here is this Sammy.Application
  //         this.get('#/:name', function() {
  //           // The context here is a new Sammy.EventContext
  //           if (this.params['name'] == 'sammy') {
  //             this.partial('name.html.erb', {name: 'Sammy'});
  //           } else {
  //             this.redirect('#/somewhere-else')
  //           }
  //         });
  //       });
  //
  // Initialize a new EventContext
  //
  // ### Arguments
  //
  // * `app` The `Sammy.Application` this event is called within.
  // * `verb` The verb invoked to run this context/route.
  // * `path` The string path invoked to run this context/route.
  // * `params` An Object of optional params to pass to the context. Is converted
  //   to a `Sammy.Object`.
  // * `target` a DOM element that the event that holds this context originates
  //   from. For post, put and del routes, this is the form element that triggered
  //   the route.
  //
  Sammy.EventContext = function(app, verb, path, params, target) {
    this.app    = app;
    this.verb   = verb;
    this.path   = path;
    this.params = new Sammy.Object(params);
    this.target = target;
  };

  Sammy.EventContext.prototype = $.extend({}, Sammy.Object.prototype, {

    // A shortcut to the app's `$element()`
    $element: function() {
      return this.app.$element(_makeArray(arguments).shift());
    },

    // Look up a templating engine within the current app and context.
    // `engine` can be one of the following:
    //
    // * a function: should conform to `function(content, data) { return interpolated; }`
    // * a template path: 'template.ejs', looks up the extension to match to
    //   the `ejs()` helper
    // * a string referring to the helper: "mustache" => `mustache()`
    //
    // If no engine is found, use the app's default `template_engine`
    //
    engineFor: function(engine) {
      var context = this, engine_match;
      // if path is actually an engine function just return it
      if (_isFunction(engine)) { return engine; }
      // lookup engine name by path extension
      engine = (engine || context.app.template_engine).toString();
      if ((engine_match = engine.match(/\.([^\.\?\#]+)$/))) {
        engine = engine_match[1];
      }
      // set the engine to the default template engine if no match is found
      if (engine && _isFunction(context[engine])) {
        return context[engine];
      }

      if (context.app.template_engine) {
        return this.engineFor(context.app.template_engine);
      }
      return function(content, data) { return content; };
    },

    // using the template `engine` found with `engineFor()`, interpolate the
    // `data` into `content`
    interpolate: function(content, data, engine, partials) {
      return this.engineFor(engine).apply(this, [content, data, partials]);
    },

    // Create and return a `Sammy.RenderContext` calling `render()` on it.
    // Loads the template and interpolate the data, however does not actual
    // place it in the DOM.
    //
    // ### Example
    //
    //      // mytemplate.mustache <div class="name">{{name}}</div>
    //      render('mytemplate.mustache', {name: 'quirkey'});
    //      // sets the `content` to <div class="name">quirkey</div>
    //      render('mytemplate.mustache', {name: 'quirkey'})
    //        .appendTo('ul');
    //      // appends the rendered content to $('ul')
    //
    render: function(location, data, callback, partials) {
      return new Sammy.RenderContext(this).render(location, data, callback, partials);
    },

    // Create and return a `Sammy.RenderContext` calling `renderEach()` on it.
    // Loads the template and interpolates the data for each item,
    // however does not actual place it in the DOM.
    //
    // ### Example
    //
    //      // mytemplate.mustache <div class="name">{{name}}</div>
    //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}])
    //      // sets the `content` to <div class="name">quirkey</div><div class="name">endor</div>
    //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}]).appendTo('ul');
    //      // appends the rendered content to $('ul')
    //
    renderEach: function(location, name, data, callback) {
      return new Sammy.RenderContext(this).renderEach(location, name, data, callback);
    },

    // create a new `Sammy.RenderContext` calling `load()` with `location` and
    // `options`. Called without interpolation or placement, this allows for
    // preloading/caching the templates.
    load: function(location, options, callback) {
      return new Sammy.RenderContext(this).load(location, options, callback);
    },

    // create a new `Sammy.RenderContext` calling `loadPartials()` with `partials`.
    loadPartials: function(partials) {
      return new Sammy.RenderContext(this).loadPartials(partials);
    },

    // `render()` the `location` with `data` and then `swap()` the
    // app's `$element` with the rendered content.
    partial: function(location, data, callback, partials) {
      return new Sammy.RenderContext(this).partial(location, data, callback, partials);
    },

    // create a new `Sammy.RenderContext` calling `send()` with an arbitrary
    // function
    send: function() {
      var rctx = new Sammy.RenderContext(this);
      return rctx.send.apply(rctx, arguments);
    },

    // Changes the location of the current window. If `to` begins with
    // '#' it only changes the document's hash. If passed more than 1 argument
    // redirect will join them together with forward slashes.
    //
    // ### Example
    //
    //      redirect('#/other/route');
    //      // equivalent to
    //      redirect('#', 'other', 'route');
    //
    redirect: function() {
      var to, args = _makeArray(arguments),
          current_location = this.app.getLocation(),
          l = args.length;
      if (l > 1) {
        var i = 0, paths = [], pairs = [], params = {}, has_params = false;
        for (; i < l; i++) {
          if (typeof args[i] == 'string') {
            paths.push(args[i]);
          } else {
            $.extend(params, args[i]);
            has_params = true;
          }
        }
        to = paths.join('/');
        if (has_params) {
          for (var k in params) {
            pairs.push(this.app._encodeFormPair(k, params[k]));
          }
          to += '?' + pairs.join('&');
        }
      } else {
        to = args[0];
      }
      this.trigger('redirect', {to: to});
      this.app.last_location = [this.verb, this.path];
      this.app.setLocation(to);
      if (new RegExp(to).test(current_location)) {
        this.app.trigger('location-changed');
      }
    },

    // Triggers events on `app` within the current context.
    trigger: function(name, data) {
      if (typeof data == 'undefined') { data = {}; }
      if (!data.context) { data.context = this; }
      return this.app.trigger(name, data);
    },

    // A shortcut to app's `eventNamespace()`
    eventNamespace: function() {
      return this.app.eventNamespace();
    },

    // A shortcut to app's `swap()`
    swap: function(contents, callback) {
      return this.app.swap(contents, callback);
    },

    // Raises a possible `notFound()` error for the current path.
    notFound: function() {
      return this.app.notFound(this.verb, this.path);
    },

    // Default JSON parsing uses jQuery's `parseJSON()`. Include `Sammy.JSON`
    // plugin for the more conformant "crockford special".
    json: function(string) {
      return $.parseJSON(string);
    },

    // //=> Sammy.EventContext: get #/ {}
    toString: function() {
      return "Sammy.EventContext: " + [this.verb, this.path, this.params].join(' ');
    }

  });

  return Sammy;
});
})(jQuery, window);