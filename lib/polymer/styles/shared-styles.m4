<dom-module id="shared-styles">
    <template>
        <style>
        
        body {
            display: block;
            margin: 0;
            min-height: 100%;
            background-color: #FFFFFF;
            font-family: 'Roboto', 'Noto', sans-serif;
            line-height: 1.5;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        include(../lib/polymer/styles/shared-style-typography.css) 
        include(../lib/polymer/styles/shared-style-paper-button.css) 
        include(../lib/polymer/styles/shared-style-paper-icon-button.css) 
        include(../lib/polymer/styles/shared-style-paper-progress.css) 
        include(../lib/polymer/styles/shared-style-specials.css)
        
        </style>
    </template>
</dom-module>
