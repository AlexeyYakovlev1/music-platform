import { IPlaylist } from "../interfaces/audio.interfaces";
import React from "react";

<<<<<<< HEAD
const { REACT_APP_API_URL } = process.env;

=======
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
type TSpanEl = HTMLSpanElement | null;
type TDivEl = HTMLDivElement | null;
type TMusic = HTMLAudioElement | null;
type TInputRange = React.FormEvent<HTMLInputElement>;

interface IPlayer {
<<<<<<< HEAD
    play(play: boolean, src: string): void;
=======
    play(play: boolean): void;
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    volume(muted: boolean, event?: TInputRange): void;
    getProcent(value: number, endPoint: number): number;
    changeLine(line: TSpanEl): void;
    setProgress(wrapper: TDivEl, event: any): void;
    getTime(): string;
<<<<<<< HEAD
    init(fileName: string, play: boolean): Promise<any>;
=======
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
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

<<<<<<< HEAD
    // for put src in audio
    public async init(fileName: string, play: boolean): Promise<any> {
        const audio = this.music;
        if (!audio) return;

        const promise = fetch(`${REACT_APP_API_URL}/audio/track/file/${fileName}`)
            .then(response => response.json())
            .then(data => {
                audio.src = data.src;
                audio.play();
            })
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
=======
    // play/pause
    public play(play: boolean): void {
        if (!this.music) return;

        if (!play) {
            this.music.pause();
            return;
        }

        if (this.music !== undefined) {
            this.music.play()
                .then(() => {
                    this.music && this.music.play();
                })
                .catch((err: any) => {
                    throw new Error(`Ошибка при воспроизведении трека: ${err.message}`);
                });
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
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