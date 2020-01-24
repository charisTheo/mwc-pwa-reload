# <p align="center">&lt;mwc-pwa-reload&gt;</p>

<p align="center">
  <img src="https://github.com/charisTheo/mwc-pwa-reload/blob/master/screenshot.png?raw=true" alt="Example material PWA reload snackbar"/>
</p>

A snack-bar for PWAs that gives the user the option to **reload the page on a new version** of the web app.

[![npm version](https://badge.fury.io/js/mwc-pwa-reload.svg)](//npmjs.com/package/mwc-pwa-reload)
[![Dependency status](https://david-dm.org/charisTheo/mwc-pwa-reload.svg)](//npmjs.com/package/mwc-pwa-reload?activeTab=dependencies)

----

## 👷‍ Build with 

### 🧱 [Material Components for the Web](https://github.com/material-components/material-components-web) (on top of [Material Snackbar](https://github.com/material-components/material-components-web-components/tree/master/packages/snackbar)).
### 🧱 [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-window)

<p align="center">
  <img src="https://github.com/charisTheo/mwc-pwa-reload/blob/master/demo.gif?raw=true" alt="A demo of the reload material snackbar"/>
</p>

## 🚀 Getting started

1. Inside your project directory run 

       npm install mwc-pwa-reload

2. Import component

   * Inside your app's JavaScript file _(ex: `app.js`)_

         import 'mwc-pwa-reload';

    **OR**

    * Add a `<script>` tag in an HTML file _(ex: `index.html`)_ 

          <script src="./node_modules/mwc-pwa-reload/dist/index.js"></script>

3. Add this listener to your Service Worker file _(ex: `sw.js`)_

        addEventListener('message', event => {
          if (event.data && event.data.type === 'NEW_VERSION') {
              skipWaiting();
          }
        });

4. Include the `<mwc-pwa-reload>` element inside your app HTML file _(ex: `index.html`)_

        <mwc-pwa-reload></mwc-pwa-reload>

> _**In the above example the component will run on default options that are explained below**_ 👇👇 

## 📚 API Docs
> 💡 _For the full list look at the [Material Snackbar Docs](https://github.com/material-components/material-components-web-components/tree/master/packages/snackbar#example-usage)_

### JavaScript

* `swUrl` - Local Service Worker JavaScript file url
  * **Default = `'./sw.js'`**
  
  
* `swScope` - The scope by which Service Worker has been registered
  * **Default = `'/'`**
  
  
* `labelText` - Snackbar main text
  * **Default = `'A new version is available 💎'`**
  
  
* `reloadTextColor` - Reload action button color
  * **Default = `'#18ffff'`**
  * Change color also with the CSS variable `--mdc-snackbar-action-color`
  > More here 👉 [Material Color Palette](https://material.io/archive/guidelines/style/color.html#color-color-palette)
  
  
* `timeout` - Snackbar's timeout until it is dismissed (ms)
  * **Default = `6000`**
  
  
* `onDismiss` - Callback when snackbar has been dismissed after timeout or by clicking on the **X** button.
  * **Default = `null`**
  * ⚠️ Need to be between 4000 and 10000

#### JavaScript API Example

    const mSnackbar = document.querySelector('mwc-pwa-reload');

    mSnackbar.swUrl = './service-worker.js';
    mSnackbar.swScope = '/';
    mSnackbar.labelText = 'Hello there! New version in town!';
    mSnackbar.timeout = 8000;
    mSnackbar.reloadTextColor = '#d500f9';

  
### HTML

You can either configure the component using JavaScript or even by HTML attributes.

#### HTML API Example
    <mwc-pwa-reload 
      sw-url="./service-worker.js" 
      sw-scope="/"
      timeout="8000"
      reload-text-color="#d500f9"
    ></mwc-pwa-reload>

## Logging

> Logging is enabled only when the component has a `dev` attibute like so:

    <mwc-pwa-reload dev></mwc-pwa-reload>
