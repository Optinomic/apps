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

      _user: {
        type: Object,
        statePath: 'user.info.data'
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
    // Save Params
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

    // Save Params @ current_patient
    // So we can share Behaviors from /client
    var href = window.location.href;
    var start = href.search("view/") + 5;
    var end = href.search("#patient_id=");
    var template = href.substr(start, (end - start));

    var current_patient = {
      "pid": parseInt(helpers.getPatientID()),
      "fid": parseInt(helpers.getStayID()),
      "aid": helpers.getAppID(),
      "template": template
    };
    this.dispatch('setObject', 'current_patient', current_patient);

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
