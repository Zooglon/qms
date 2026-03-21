class SpiritLevelElement extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          padding: 32px 24px;
          gap: 32px;
          background: #ffffff;
          font-family: 'Nunito Sans', sans-serif;
          color: #000000;
        }

        /* ── Title ── */
        .title {
          font-size: 16px;
          letter-spacing: 4px;
          color: #000000;
          font-weight: 700;
        }

        /* ── Tube ── */
        .tube-wrapper {
          width: 100%;
          max-width: 340px;
        }

        .tube {
          position: relative;
          height: 60px;
          border-radius: 30px;
          background: #f4f4f4;
          border: 2px solid #D9D9D9;
          box-shadow: inset 0 3px 8px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .tube::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px, transparent 18px,
            rgba(0,0,0,0.06) 18px, rgba(0,0,0,0.06) 19px
          );
        }

        .tube-center {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 70px; height: 42px;
          border-radius: 21px;
          border: 1.5px solid #ED6A20;
          opacity: 0.3;
          pointer-events: none;
        }

        .tube-line {
          position: absolute;
          left: 50%; top: 8px; bottom: 8px;
          width: 1.5px;
          background: #ED6A20;
          opacity: 0.25;
          pointer-events: none;
        }

        .bubble {
          position: absolute;
          top: 50%; left: 50%;
          width: 42px; height: 42px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: #ED6A20;
          box-shadow: 0 2px 12px rgba(237,106,32,0.4);
          transition: left 0.08s linear;
          pointer-events: none;
        }

        /* ── Angle display ── */
        .angle-display {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          line-height: 1;
        }

        .angle-value {
          font-size: 80px;
          font-weight: 800;
          letter-spacing: -3px;
          color: #ED6A20;
          line-height: 1;
        }

        .angle-symbol {
          font-size: 56px;
          font-weight: 700;
          color: #ED6A20;
          margin-top: 6px;
          margin-left: 2px;
        }

        .pitch-label {
          font-size: 11px;
          letter-spacing: 3px;
          color: #000000;
          font-weight: 300;
        }

        .permission-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
        }

        .permission-screen p {
          font-size: 14px;
          color: #000000;
          max-width: 260px;
          line-height: 1.7;
          font-weight: 300;
        }

        .btn {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          padding: 14px 36px;
          border-radius: 8px;
          border: none;
          background: #ED6A20;
          color: #ffffff;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .btn:active { opacity: 0.75; }
      </style>

      <div class="container">

        <!-- iOS permission prompt -->
        <div class="permission-screen" id="permScreen" style="display:none">
          <div class="title">Roof Pitch</div>
          <p>Tap to activate the gyroscope sensor and measure your roof pitch.</p>
          <button class="btn" id="permBtn">Activate Sensor</button>
        </div>

        <!-- Main UI -->
        <div id="levelUI" style="display:none; width:100%; flex-direction:column; align-items:center; gap:32px">
          <div class="title">Roof Pitch</div>

          <div class="tube-wrapper">
            <div class="tube">
              <div class="tube-line"></div>
              <div class="tube-center"></div>
              <div class="bubble" id="bubble"></div>
            </div>
          </div>

          <div class="angle-display">
            <div class="angle-value" id="angleVal">0.0</div>
            <div class="angle-symbol">°</div>
          </div>

          <div class="pitch-label">pitch angle</div>
        </div>

      </div>
    `;

        const sr = this.shadowRoot;
        const bubble = sr.getElementById('bubble');
        const angleVal = sr.getElementById('angleVal');
        const levelUI = sr.getElementById('levelUI');
        const permScreen = sr.getElementById('permScreen');
        const permBtn = sr.getElementById('permBtn');

        const TRAVEL = 120;
        let smoothed = 0;

        const applyAngle = (gamma) => {
            const raw = Math.max(-90, Math.min(90, gamma));
            smoothed = smoothed * 0.7 + raw * 0.3;
            const deg = smoothed;
            const absDeg = Math.abs(deg);

            const ratio = Math.max(-1, Math.min(1, deg / 45));
            const tubeWidth = bubble.parentElement.offsetWidth;
            bubble.style.left = (tubeWidth / 2 + ratio * TRAVEL) + 'px';

            // Show absolute angle — pitch is always positive
            angleVal.textContent = absDeg.toFixed(1);
        };

        const startListening = () => {
            window.addEventListener('deviceorientation', (e) => {
                if (e.gamma !== null) applyAngle(e.gamma);
            });
            permScreen.style.display = 'none';
            levelUI.style.display = 'flex';
        };

        if (
            typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function'
        ) {
            permScreen.style.display = 'flex';
            permBtn.addEventListener('click', () => {
                DeviceOrientationEvent.requestPermission()
                    .then(state => {
                        if (state === 'granted') startListening();
                        else permBtn.textContent = 'Permission Denied';
                    })
                    .catch(console.error);
            });
        } else {
            startListening();
        }
    }

    disconnectedCallback() {
        window.removeEventListener('deviceorientation', this._handler);
    }
}

customElements.define('spirit-level-element', SpiritLevelElement);