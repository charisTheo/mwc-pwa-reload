# <p align="center">&lt;mdc-pwa-reload&gt;</p>

A snack-bar for PWAs that gives the user the option to **reload the page on a new version** of the web app. 

👷‍♂️ Build with [Material Components for the Web](https://github.com/material-components/material-components-web) on top of the [Material Snackbar](https://github.com/material-components/material-components-web-components/tree/master/packages/snackbar).

<p align="center">
  <img src="https://github.com/charisTheo/mdc-pwa-reload/blob/master/screenshot.png?raw=true" alt="Example material PWA reload snackbar"/>
</p>

----
## 🚀 Getting started

1. Add this in your Service Worker (`sw.js`) file:

        addEventListener('message', event => {
          if (event.data && event.data.type === 'NEW_VERSION') {
              skipWaiting();
          }
        });

2. Include the `<mdc-pwa-reload>` element inside your `index.html` file:

        <mdc-pwa-reload></mdc-pwa-reload>

## 📚 API Docs
> 💡 For the full list look at the [Material Snackbar Docs](https://github.com/material-components/material-components-web-components/tree/master/packages/snackbar#example-usage)

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

    const mSnackbar = document.querySelector('mdc-pwa-reload');
    mSnackbar.swUrl = './service-worker.js';
    mSnackbar.swScope = '/';
    mSnackbar.labelText = 'Hello there! New version in town!';
    mSnackbar.timeout = 8000;
    mSnackbar.reloadTextColor = '#d500f9';

  
### HTML

You can either configure the component using JavaScript or even by HTML attributes.

#### HTML API Example
    <mdc-pwa-reload 
      sw-url="./service-worker.js" 
      sw-scope="/"
      timeout="8000"
      reload-text-color="#d500f9"
    ></mdc-pwa-reload>

## Logging

> Logging is enabled only when the component has a `dev` attibute like so:

    <mdc-pwa-reload dev></mdc-pwa-reload>