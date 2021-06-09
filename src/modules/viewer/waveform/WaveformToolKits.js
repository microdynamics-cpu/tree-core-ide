const allStyle = `
<style>
    :host {
        --navBar-height: 24px;
        z-index: 1;
        font-size: 0.65rem;
    }

    #container {
        height: var(--navBar-height);
        width: 70%;
        padding: 4px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        background: var(--navBar-background);
        border-radius: calc(var(--navBar-height));
        box-shadow: var(--shadow) 0 0 8px;
    }

    #zoom-group, #edge-group
    #reload-group {
        flex-flow: row nowrap;
        height: 100%;
        border-radius: 16px;
        padding: 1px;
        box-shadow: var(--shadow) 0 0 3px;
        background: var(--navBar-group-background);
    }

    button {
        display: inline-block;
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        height: 100%;
        width: 24px;
        line-height: 0;
        background: var(--navBar-button);
        border: none;
        opacity: 0.8;
        color: var(--navBar-button-text);
    }

    button:hover {
        cursor: pointer;
        opacity: 1;
        color: var(--button-hover);
    }

    .highlight {
        background-color: var(--accent) !important;
    }

    .highlight button {
        opacity: 0.6;
    }

    .highlight button:hover {
        color: var(--title-color) !important;
        opacity: 1;
    }

    button:hover:active,
    button:active {
        color: var(--button-active);
        opacity: 1;
    }

    #settings {
        margin-right: 6px;
    }

    svg {
        width: 18px;
        height: 18px;
    }
</style>

<svg display="none">
    <defs />
    <symbol id="refresh" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </symbol>
    <symbol id="settings" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </symbol>
    <symbol id="zoom_in" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path fill="currentColor" d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
    </symbol>
    <symbol id="zoom_out" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
    </symbol>
    <symbol id="zoom_out_map" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15,3l2.3,2.3l-2.89,2.87l1.42,1.42L18.7,6.7L21,9V3H15z M3,9l2.3-2.3l2.87,2.89l1.42-1.42L6.7,5.3L9,3H3V9z M9,21 l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3,17.3L3,15v6H9z M21,15l-2.3,2.3l-2.87-2.89l-1.42,1.42l2.89,2.87L15,21h6V15z" />
    </symbol>
</svg>`

const allElement = `
<div id="container" class="darkglass">
    <div id="reload-group">
        <input type="file" id= "select-file">
        <button id="reload"><svg>
                <use xlink:href="#refresh" />
            </svg></button>
        <button id="settings"><svg>
                <use xlink:href="#settings" />
            </svg></button>
    </div>

    <div id="edge-group" class="btn-group">
        <button id="pre-rising-edge"><svg>
                <use xlink:href="#zoom_out" />
            </svg>
        </button>
        <button id="pre-falling-edge"><svg>
                <use xlink:href="#zoom_out_map" />
            </svg>
        </button>
        <button id="aft-rising-edge"><svg>
                <use xlink:href="#zoom_in" />
            </svg>
        </button>
            <button id="aft-falling-edge"><svg>
                <use xlink:href="#zoom_in" />
            </svg>
        </button>
    </div>

    <div id="zoom-group" class="btn-group">
        <button id="zoom-in"><svg>
                <use xlink:href="#zoom_out" />
            </svg></button>
        <button id="zoom-fit"><svg>
                <use xlink:href="#zoom_out_map" />
            </svg></button>
        <button id="zoom-out"><svg>
                <use xlink:href="#zoom_in" />
            </svg></button>
    </div>
</div>`;

class WaveformToolKits extends HTMLElement {
    constructor() {
        super();
        this.fileChanged = false;

        this.innerHTML = `${allStyle}${allElement}
        `;

        document.getElementById('reload').addEventListener('click', this.reload);
        document.getElementById('settings').addEventListener('click', this.settings);
        document.getElementById('zoom-in').addEventListener('click', this.zoom_in);
        document.getElementById('zoom-fit').addEventListener('click', this.zoom_fit);
        document.getElementById('zoom-out').addEventListener('click', this.zoom_out);

        this.addEventListener("click", t => {
            t.stopPropagation();
        });

        this.addEventListener("mousedown", t => {
            t.stopPropagation();
        });
        this.addEventListener("pointerdown", t => {
            t.stopPropagation();
        });
        this.addEventListener("touchstart", t => {
            t.stopPropagation();
        });
        
    }

    reload() {
        console.log('reload');
        this.dispatchEvent(new CustomEvent("file-reload", {
            detail: {},
            bubbles: !0,
            composed: !0
        }))
    }

    settings() {
        console.log('settings');
        this.dispatchEvent(new CustomEvent("settings", {
            detail: {},
            bubbles: !0,
            composed: !0
        }))
    }

    zoom_out() {
        console.log('zoom out');
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                cmd: "zoom_out"
            }
        }))
    }

    zoom_fit() {
        console.log('zoom fit');
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                cmd: "zoom_fit"
            }
        }))
    }

    zoom_in() {
        console.log('zoom in');
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                cmd: "zoom_in"
            }
        }))
    }
}

customElements.define('treecore-waveform-toolkits', WaveformToolKits);