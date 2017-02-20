<base href="https://polygit.org/components/">
<script src="webcomponentsjs/webcomponents-lite.min.js"></script>
<link rel="import" href="app-layout/app-drawer/app-drawer.html">
<link rel="import" href="app-layout/app-drawer-layout/app-drawer-layout.html">
<link rel="import" href="app-layout/app-header/app-header.html">
<link rel="import" href="app-layout/app-header-layout/app-header-layout.html">
<link rel="import" href="app-layout/app-scroll-effects/app-scroll-effects.html">
<link rel="import" href="app-layout/app-toolbar/app-toolbar.html">
<link rel="import" href="app-route/app-location.html">
<link rel="import" href="app-route/app-route.html">
<link rel="import" href="iron-pages/iron-pages.html">
<link rel="import" href="iron-selector/iron-selector.html">
<link rel="import" href="iron-icons/iron-icons.html">
<link rel="import" href="paper-icon-button/paper-icon-button.html">
<link rel="import" href="paper-button/paper-button.html">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500">

<dom-module id="shared-styles">
    <template>
        <style>
        .circle {
            display: inline-block;
            width: 58px;
            height: 58px;
            text-align: center;
            color: #424242;
            border-radius: 50%;
            background: #E0E0E0;
            font-size: 28px;
            font-weight: 100;
            font-family: 'Roboto', sans-serif;
            line-height: 60px;
        }
        
        h1 {
            margin: 24px 0 0;
            color: #212121;
            font-size: 32px;
            font-weight: 100;
            font-family: 'Roboto', sans-serif;
        }
        
        p {
            margin: 3px 0 0;
            color: #212121;
            font-size: 16px;
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
        }
        
        #container {
            display: flex;
        }
        
        paper-icon-button {
            color: var(--paper-pink-a200);
            --paper-icon-button-ink-color: var(--paper-pink-a200);
        }
        
        paper-icon-button.indigo {
            color: var(--paper-grey-400);
            --paper-icon-button-ink-color: var(--paper-indigo-a200);
        }
        
        paper-icon-button.indigo:hover {
            color: var(--paper-indigo-500);
        }
        
        paper-button {
            font-family: 'Roboto', 'Noto', sans-serif;
            font-weight: normal;
            font-size: 14px;
            -webkit-font-smoothing: antialiased;
        }
        
        paper-button.pink {
            color: var(--paper-pink-a200);
            --paper-button-ink-color: var(--paper-pink-a200);
        }
        
        paper-button.pink:hover {
            background-color: var(--paper-pink-100);
        }
        
        paper-button.indigo {
            background-color: var(--paper-indigo-500);
            color: white;
            --paper-button-raised-keyboard-focus: {
                background-color: var(--paper-pink-a200) !important;
                color: white !important;
            }
            ;
        }
        
        paper-button.indigo:hover {
            background-color: var(--paper-indigo-400);
        }
        
        paper-button.green {
            background-color: var(--paper-green-500);
            color: white;
        }
        
        paper-button.green[active] {
            background-color: var(--paper-red-500);
        }
        
        paper-button.disabled {
            color: white;
        }
        </style>
    </template>
</dom-module>
<dom-module id="optinomic-app">
    <template>
        <style include="shared-styles">
        :host {
            display: block;
            padding: 10px;
        }
        </style>
        <div class="">
            <div class="circle">12</div>
            <h1>View One</h1>
            <p>Now is labores minimum atomorum pro. Laudem tibique ut has.</p>
        </div>
        <div id="container">
            <paper-button class="pink">link</paper-button>
            <paper-button raised class="indigo">raised</paper-button>
            <paper-button toggles raised class="green">toggles</paper-button>
            <paper-button disabled class="disabled">disabled</paper-button>
        </div>
        <div>
            <paper-icon-button icon="favorite"></paper-icon-button>
            <paper-icon-button icon="menu" class="indigo"></paper-icon-button>
            <paper-icon-button icon="star"></paper-icon-button>
        </div>
    </template>
    <script>
    Polymer({
        is: 'optinomic-app'
    });
    </script>
</dom-module>
<optinomic-app name="main"></optinomic-app>
