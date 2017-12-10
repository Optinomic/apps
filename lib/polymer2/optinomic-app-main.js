/**
 * @customElement
 * @polymer
 */
class optinomicApp extends ReduxBehavior(Polymer.Element) {
  static get is() {
    return 'optinomic-app';
  }

  static get actions() {
    return AsyncActionsBehavior.actions;
  }

  static get properties() {
    return {

      _loading: {
        type: Boolean,
        statePath: 'loading'
      },
      _user: {
        type: Object,
        statePath: '_app_user.data'
      },
      _current_app: {
        type: Object,
        statePath: 'apps.current.data'
      }
    };
  }

  // Functions

  _toggleHelp() {
    this.set('_show_help', !this._show_help);

    if (this._show_help) {
      Polymer.RenderStatus.afterNextRender(this, function() {
        var readme = this.$.readme;
        readme.innerHTML = this._current_app.readme.html;
      });
    };
  }

  _logState() {
    var state = this.getState();
    console.warn('(✔) App-State', state);
  }

  _loadData() {
    Polymer.RenderStatus.afterNextRender(this, function() {
      console.warn('(START) _loadData');

      // loadData
      this.dispatch('getCurrentUser');
      this.dispatch('getApps');
      this.dispatch('getClinic');

      setTimeout(function() {
        this._logState();
      }.bind(this), 1000);

    });
  }

  _init() {

    var params = {
      "userID": parseInt(helpers.getUserID()),
      "patientID": parseInt(helpers.getPatientID()),
      "stayID": parseInt(helpers.getStayID()),
      "token": helpers.getToken(),
      "appName": helpers.getAppName(),
      "appID": helpers.getAppID(),
      "apiURL": helpers.getApiURL()
    };

    this.set('params', params);
    this.dispatch('actionSaveParams', params);
    console.log('(✔) App-Params', this.params);

    this.set('_show_help', false);
  }

  // Lifecycle
  ready() {
    super.ready();
    this._init();
    this._loadData();
  }
}

window.customElements.define(optinomicApp.is, optinomicApp);
