import { KeysOfType, PickMembers } from "@telokys/ts-meta-types";

export interface TypedEventEmitter<
    Events,
    VoidKeys extends KeysOfType<Events, void> = KeysOfType<Events, void>,
    NotVoidKeys extends Exclude<keyof Events, VoidKeys> = Exclude<keyof Events, VoidKeys>,
> {
    on<K extends NotVoidKeys>(eventName: K, callback: (payload: Events[K]) => void): void;
    on<K extends VoidKeys>(eventName: K, callback: () => void): void;

    once<K extends NotVoidKeys>(eventName: K, callback: (payload: Events[K]) => void): void;
    once<K extends VoidKeys>(eventName: K, callback: () => void): void;

    emit<K extends NotVoidKeys>(eventName: K, payload: Events[K]): void;
    emit<K extends VoidKeys>(eventName: K): void;
}

export type StrictEventEmitter<Events, EventEmitter> = TypedEventEmitter<Events> &
    PickMembers<EventEmitter, Exclude<keyof EventEmitter, keyof TypedEventEmitter<Events>>>;

export type StrictEventEmitterPicked<
    Events,
    EventEmitter,
    Picked extends keyof TypedEventEmitter<Events>,
    TEE extends TypedEventEmitter<Events> = TypedEventEmitter<Events>,
> = PickMembers<TEE, Extract<keyof TEE, Picked>> &
    PickMembers<EventEmitter, Exclude<keyof EventEmitter, keyof Pick<TEE, Picked>>>;
