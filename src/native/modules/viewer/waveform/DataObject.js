const DISPLAY_CONFIG = {
    WireStyle: {
        renderer: 'wire',
        color: '#00FF00',
        fill: .5,
        fillColor: '#33FF33',
        height: 32,
        strokeWidth: 2,
    },
    BusStyle: {
        renderer: 'bus',
        color: '#00FF00',
        radix: 'hex',
        fill: .5,
        fillColor: '#33FF33',
        height: 32,
        strokeWidth: 2,
    }
}


export class DataObject {
    constructor() {
        this.date = '';
        this.version = '';
        this.timescale = '';
        this.endtime = 0;
        this.scale = '';
        this.signal = [];
        this.firstYIdx = 0;
        this.drawNumber = 0;
        this.displayConfig = {};
        this.orignalData;
    }


    update(obj) {
        this.orignalData = JSON.parse(obj);
        if (this.orignalData) {
            if (this.orignalData.date) {
                this.date = this.orignalData.date;
            }
            if (this.orignalData.version) {
                this.version = this.orignalData.version;
            }
            if (this.orignalData.timescale) {
                this.timescale = this.orignalData.timescale;
            }
            if (this.orignalData.endtime) {
                this.endtime = this.orignalData.endtime;
            }
            if (this.orignalData.scale) {
                this.scale = this.orignalData.scale;
            }
            if (this.orignalData.signal) {
                this.signal = this.orignalData.signal;
            }
        } else {
            console.log('data is wrong!');
        }
    }

    getEndTime() {
        return parseInt(this.endtime, 10);
    }

    getTimeScale() {
        // need to midfy
        if (this.timescale === '') {
            return 0;
        } else {
            // console.log('getTimeScale: ', this.timescale);
            return parseInt(this.timescale.slice(0, -1), 10);
        }
    }

    getSignalAmount() {
        return this.signal.length;
    }

    getSignalName(idx) {
        return this.signal[idx].name;
    }

    getSignalDrawYIdx() {
        return this.firstYIdx;
    }

    setSignalDrawYIdx(delta) {
        if (delta > 0) {
            this.firstYIdx += 1;
        } else if (this.firstYIdx > 0) {
            this.firstYIdx -= 1;
        }
    }

    getSignalDrawNumber() {
        return this.drawNumber;
    }

    resetSignalDrawNumber() {
        this.drawNumber = 0;
    }

    addSignalDrawNumber() {
        this.drawNumber += 1;
    }

    getSignalDrawYAxis() {
        if (!this.drawNumber) {
            return Math.floor(114);
        }
        else {
            return Math.floor((114 + this.drawNumber * 36));
        }
    }

    getSignalDisplayConfig(idx) {
        if (this.signal[idx].size === 1) {
            return DISPLAY_CONFIG.WireStyle;
        } else {
            return DISPLAY_CONFIG.BusStyle;
        }
    }

    getWaveAmount(idx) {
        return this.signal[idx].wave.length;
    }

    getWaveTime(signalIdx, waveIdx) {
        return parseInt(this.signal[signalIdx].wave[waveIdx][0]);
    }

    getWaveValue(signalIdx, waveIdx) {
        return this.signal[signalIdx].wave[waveIdx][1];
    }
}