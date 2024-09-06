/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/6 PM 7:52:10
 * @filename vue-audio-tapir.d.ts
 * @description vue-audio-tapir库的TS声明文件
 *
 */

// vue-audio-tapir.d.ts

declare class Service {


    constructor(backendEndpoint: string);

    postBackend(recordedBlob: Blob): Promise<boolean>;


}


declare class WavEncoder {


    constructor(options: { bufferSize: number; sampleRate: number; samples: Float32Array[] });


    finish(): {

        id: number;
        blob: Blob;
        url: string;

    };


    _floatTo16BitPCM(output: DataView, offset: number, input: Float32Array): void;


    _joinSamples(): void;


    _writeString(view: DataView, offset: number, string: string): void;


}


declare class Recorder {


    constructor(options?: {

        beforeRecording?: () => void;
        pauseRecording?: () => void;
        afterRecording?: (record: { id: number; blob: Blob; url: string; duration: string }) => void;
        micFailed?: (error: Error) => void;
        bitRate?: number;
        sampleRate?: number;

    });


    start(): void;


    stop(): void;


    pause(): void;


    recordList(): Array<{ id: number; blob: Blob; url: string; duration: string }>;


    lastRecord(): { id: number; blob: Blob; url: string; duration: string } | null;


    _micCaptured(stream: MediaStream): void;


    _micError(error: Error): void;


}


declare const INSTRUCTION_MESSAGE: string;
declare const INSTRUCTION_MESSAGE_STOP: string;
declare const ERROR_MESSAGE: string;
declare const SUCCESS_MESSAGE: string;
declare const SUCCESS_MESSAGE_SUBMIT: string;
declare const ERROR_SUBMITTING_MESSAGE: string;


declare module "vue-audio-tapir" {


    import {VueElement} from "vue";


    export default class TapirWidget extends VueElement {


        time: number;
        bitRate: number;
        sampleRate: number;
        backendEndpoint: string;
        buttonColor: string;
        recording: boolean;
        recordedAudio: string | null;
        recordedBlob: Blob | null;
        recorder: Recorder | null;
        successMessage: string | null;
        errorMessage: string | null;
        instructionMessage: string;
        buttonClass: string;
        recordedTime: string | null;


        afterRecording?: () => void;


        successfulUpload?: () => void;


        failedUpload?: () => void;


        customUpload?: (blob: Blob) => Promise<boolean>;


        toggleRecording(): void;


        initRecorder(): void;


        stopRecording(): void;


        sendData(): Promise<void>;


        micFailed(): void;


    }


}
