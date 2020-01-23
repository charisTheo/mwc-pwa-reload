import { Workbox } from 'workbox-window';
import { Snackbar } from '@material/mwc-snackbar';
import '@material/mwc-icon-button';
import '@material/mwc-button';

var workbox;

const defaultServiceWorkerFileUrl = './sw.js';
const defaultServiceWorkerScope = '/';
const defaultTimeout = 6000;
const defaultLabelText = 'A new version is available 💎';
const defaultReloadTextColor = '#18ffff';

const snackbarHTMLComponents = `
    <mwc-button slot="action">RELOAD</mwc-button>
    <mwc-icon-button slot="dismiss">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </mwc-icon-button>
`;

class MdcPwaReload extends Snackbar {
    constructor() {
        super();
        // Material config
        this.labelText = defaultLabelText;
        this.innerHTML += snackbarHTMLComponents;
        
        // Custom and default config
        this.timeout = defaultTimeout;
        this.swUrl = this.getAttribute('sw-url');
        this.swScope = this.getAttribute('sw-scope');
        
        this.addEventListener('MDCSnackbar:closed', this.onClose);

        if ('serviceWorker' in navigator) {
            // TODO test in a site that has already a service worker registered. Maybe need to check for a SW registation before registering.
            workbox = new Workbox(this.swUrl, { scope: this.swScope });
            this.listenForNewVersion();
            workbox.register();
        }
    }

    get timeout() {return this.timeoutMs}
    set timeout(timeout) {this.timeoutMs = timeout}

    get swUrl() {return this._swUrl || defaultServiceWorkerFileUrl}
    set swUrl(dir) {this._swUrl = dir}

    get swScope() {return this._swScope || defaultServiceWorkerScope}
    set swScope(scope) {this._swScope = scope}

    get reloadTextColor() {return this._reloadTextColor || defaultReloadTextColor}
    set reloadTextColor(color) {
        this._reloadTextColor = color;
        this.style.setProperty('--mdc-snackbar-action-color', this._reloadTextColor);
    }

    get onDismiss() {return this._onDismiss || null}
    set onDismiss(func) {this._onDismiss = typeof func === 'function' ? func : new Function(func)}

    static get observedAttributes() {
        return ['sw-url', 'sw-scope', 'timeout', 'reload-text-color', 'on-dismiss'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'sw-url':
                this.swUrl = newValue;
                break;
            
            case 'sw-scope':
                this.swScope = newValue;
                break;
            
            case 'timeout':
                this.timeout = newValue;
                break;
            
            case 'reload-text-color':
                this.reloadTextColor = newValue;
                break;

            case 'on-dismiss':
                this.onDismiss = newValue;
                break;
            default:
                console.log(`MdcPwaReload: Unknown attribute has been added`, name);
                break;
        }
    }

    disconnectedCallback() {
        console.log('MdcPwaReload: Custom element removed from page.');
        // TODO Is it necessary to remove Service Worker event listeners?
    }

    async listenForNewVersion() {
        console.log("MdcPwaReload -> Attaching event listeners onto service worker for new versions.");
        workbox.addEventListener('waiting' , () => {
            // !
            console.warn(`Make sure you include the following in your Service Worker JS file:
                addEventListener('message', event => {
                    if (event.data && event.data.type === 'NEW_VERSION') {
                        skipWaiting();
                    }
                });
            `);
            this.onNewVersionFound();
        });
    }

    onNewVersionFound() {
        console.log("MdcPwaReload -> New version has been found! Opening snackbar...");
        this.open();
    }

    async onClose (event) {
        const { reason } = event.detail;
        if (reason === 'action') {
            // * update service worker and reload page
            this.updateAndReload();
            
        } else {
            // ? reason = dismiss
            if (typeof this.onDismiss === 'function') {
                this.onDismiss();
            }
        }
    }

    updateAndReload() {
        console.log("MdcPwaReload -> Updating service worker and reloading the page.");
        workbox.messageSW({ type: 'NEW_VERSION'});
        workbox.addEventListener('controlling', () => window.location.reload());
        
    }
}

window.customElements.define('mdc-pwa-reload', MdcPwaReload);
