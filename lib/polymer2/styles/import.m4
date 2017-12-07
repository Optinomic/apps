body,
html {
  padding: 8px 2px 24px;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Roboto', sans-serif !important;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  min-height: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media only screen and (min-width: 641px) and (max-width: 1023px) {
  body,
  html {
    padding-top: 12px;
    padding-left: 12px;
    padding-right: 12px;
  }
}
@media only screen and (min-width: 1024px) {
  body,
  html {
    padding-top: 24px;
    padding-left: 24px;
    padding-right: 24px;
  }
}

include(../lib/polymer/styles/shared-style-typography.css)
include(../lib/polymer/styles/shared-style-paper-button.css)
include(../lib/polymer/styles/shared-style-paper-icon-button.css)
include(../lib/polymer/styles/shared-style-paper-progress.css)
include(../lib/polymer/styles/shared-style-specials.css)
