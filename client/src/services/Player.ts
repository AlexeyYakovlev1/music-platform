import { IPlaylist } from "../interfaces/audio.interfaces";
import React from "react";

const { REACT_APP_API_URL } = process.env;

type TSpanEl = HTMLSpanElement | null;
type TDivEl = HTMLDivElement | null;
type TMusic = HTMLAudioElement | null;
type TInputRange = React.FormEvent<HTMLInputElement>;

interface IPlayer {
    play(play: boolean, src: string): void;
    volume(muted: boolean, event?: TInputRange): void;
    getProcent(value: number, endPoint: number): number;
    changeLine(line: TSpanEl): void;
    setProgress(wrapper: TDivEl, event: any): void;
    getTime(): string;
    init(fileName: string, play: boolean): Promise<any>;
}

class Player implements IPlayer {
    constructor(
        public music: TMusic,
        public idxTrack: number,
        public playlist?: IPlaylist
    ) {
        this.music = music;
        this.playlist = playlist;
        this.idxTrack = idxTrack;
    }

    // for put src in audio
    public async init(fileName: string): Promise<any> {
        const audio = this.music;
        if (!audio) return;

        fetch(`${REACT_APP_API_URL}/audio/track/file/${fileName}`)
            .then(response => response.json())
            .then(data => {
                audio.src = data.src;
                audio.play();
            })
            .catch(err => {
                throw new Error(`Video playback failed: ${err.message}`);
            });
    }

    // play/pause
    public play(play: boolean, src: string): void {
        const audio = this.music;

        if (!audio) return;

        const promise = fetch(`${REACT_APP_API_URL}/audio/track/file/${src}`)
            .then(response => response.json())
            .then(() => audio.play())
            .catch(err => {
                throw new Error(`Video playback failed: ${err.message}`);
            });

        if (promise !== undefined) {
            promise.then(() => {
                audio[play ? "play" : "pause"]();
            }).catch((err) => {
                throw new Error(`Video playback failed: ${err.message}`);
            });
        }
    };

    // muted/unmuted/change volume
    public volume(muted: boolean, event?: TInputRange): void {
        if (!this.music) return;
        this.music.muted = muted;

        if (!event) return;
        const { value } = event.currentTarget;
        this.music.volume = +value;
    };

    // change width for line track
    public changeLine(line: HTMLSpanElement | null): void {
        if (!line || !this.music) return;

        const { duration, currentTime } = this.music;
        const progressProcent = this.getProcent(currentTime, duration);

        line.style.width = `${progressProcent}%`;
    };

    // switching time for song
    public setProgress(wrapper: HTMLDivElement | null, event: any): void {
        if (!this.music || !wrapper) return;

        const { clientWidth } = wrapper;
        const { offsetX } = event.nativeEvent;
        const duration = this.music.duration

        this.music.currentTime = (offsetX / clientWidth) * duration;
    };

    // get procent for line track
    public getProcent(value: number, endPoint: number): number {
        return Math.ceil((value / endPoint) * 100);
    };

    // get full time for this song
    public getTime(): string {
        let res = "0:00";
        let minutes, seconds = 0;

        if (!this.music) return res;

        const { duration } = this.music;

        seconds = Math.floor(duration % 60);
        minutes = Math.floor((duration / 60) % 60);

        res = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

        return res;
    };
}

export default Player;