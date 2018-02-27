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
                    statePath: 'apps.current.data',
                    observer: '_current_appChanged'
                },
                _current_patient_pid: {
                    type: Number,
                    statePath: 'current_patient.pid'
                },
                _app_state: {
                    type: String,
                    observer: '_newPageSelected'
                }
            };
        }

        // ---------------- Functions ----------------

        _newPageSelected(newVal, oldVal) {

            let pages = this.$.pages.children;

            console.warn('ELSE', pages[newVal].className, this._show_help, pages);

            if (this._show_help) {

                // Run the animation on the newly selected page
                if (!pages[newVal].className.includes('zoom-in')) {
                    pages[newVal].className += ' zoom-in';
                }

                if (typeof oldVal !== 'undefined') {
                    // Stop the animation of hidden pages
                    pages[oldVal].className = pages[oldVal].className.split(' zoom-in').join('');
                }
            } else {

                if (!pages[newVal].className.includes('fade-in')) {
                    pages[newVal].className += ' fade-in';
                }

            };
        }

        _toggleHelp() {
            this.set('_show_help', !this._show_help);

            if (this._show_help) {
                Polymer.RenderStatus.afterNextRender(this, function() {


                    var readme = this.$.readme;
                    readme.innerHTML = this._current_app.readme.html;

                    this.set('_app_state', 'help');
                });
            } else {
                this.set('_app_state', 'app');

            };
        }

        _logState() {
            this._debouncer = Polymer.Debouncer.debounce(this._debouncer, Polymer.Async.timeOut.after(250), () => {

                var state = this.getState();
                console.warn('(✔) OpApp-State', state);

            });
        }

        // ---------------- Observers ----------------

        _current_appChanged() {
            this._debouncer = Polymer.Debouncer.debounce(this._debouncer, Polymer.Async.timeOut.after(250), () => {

                try {
                    if (this._current_app.type === 'patient') {
                        this._loadPatientData();
                    };
                } catch (err) {
                    console.warn('_current_appChanged', err, this._current_app);
                };

            });
        }


        // ---------------- Init ----------------


        _loadData() {
            Polymer.RenderStatus.afterNextRender(this, function() {
                console.warn('(START) _loadData');

                // loadData
                this.dispatch('getCurrentUser');
                this.dispatch('getApps');
                this.dispatch('getClinic');

            });
        }

        _loadPatientData() {
            Polymer.RenderStatus.afterNextRender(this, function() {
                console.warn('(START) _loadPatientData');

                if ((this._current_patient_pid !== NaN) && (this._current_patient_pid !== 0) && (this._current_patient_access !== null)) {
                    if (ApiHelpers.shouldCallNow('_loadPatientData_' + helpers.getPatientID(), 2)) {

                        this.dispatch('getCurrentPatient', helpers.getPatientID());
                        this.dispatch('getCurrentPatientStays', helpers.getPatientID());
                        this.dispatch('getStayApps', helpers.getPatientID(), helpers.getStayID());

                    };
                };

            });
        }

        _init() {
            this.set('_show_help', false);
            this.set('_app_state', 'app');

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

            console.log('(✔) OpApp-Init', params, current_patient);

            setTimeout(function() {
                this._logState();
            }.bind(this), 2500);

        }

        // ---------------- Lifecycle ----------------
        ready() {
            super.ready();
            this._init();
            this._loadData();
        }
    }

    window.customElements.define(optinomicApp.is, optinomicApp);
    