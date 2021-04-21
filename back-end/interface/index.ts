import { IncomingMessage } from "node:http";
import { Controller } from "../database/models/Controller";
import { Light } from "../database/models/Light";
import { Room } from "../database/models/Room";
import { Script } from "../database/models/Script";
import { User } from "../database/models/User";

// Type
export const RoleType = {
    CUSTOMER: "customer",
    ADMIN: "admin",
};

// StatusType
export const StatusType = {
    ON: "on",
    OFF: "off",
};

// Server event
export const ServerEvent = {
    SERVER_SEND_ACK_CONNECTION: "server-send-ack-connection",
    SERVER_SEND_MESSAGE: "server-send-message",
    SERVER_SEND_ACK_CONNECTED: "server-send-ack-connected",
    SERVER_SEND_ACK_CONTROLLER_CONNECT: "server-send-ack-controller-connect",
    SERVER_SEND_CONTROL_LIGHT: "server-send-control-light",
    SERVER_SEND_CONTROL_ROOM: "server-send-control-room",
    SERVER_SEND_ACK_CONTROL_LIGHT: "server-send-ack-control-light",
    SERVER_SEND_ACK_CONTROL_ROOM: "server-send-ack-control-room",
};

// Client event
export const ClientEvent = {
    CLIENT_SEND_MESSAGE: "client-send-message",
    CLIENT_SEND_CONTROL_LIGHT: "client-send-control-light",
    CLIENT_SEND_CONTROL_ROOM: "client-send-control-room",
};

export const ControllerEvent = {
    CONTROLLER_CONNECT: "controller-connect",
    CONTROLLER_SEND_ACK_CONTROL_LIGHT: "controller-send-ack-control-light",
    CONTROLLER_SEND_ACK_CONTROL_ROOM: "controller-send-ack-control-room",
    CONTROLLER_SEND_MESSAGE: "controller-send-message",
};

export interface LightInterface {
    lightId?: number;
    name?: string;
    status?: boolean;
}

export interface RoomInterface {
    roomId?: number;
    name?: string;
    lights?: Array<LightInterface>;
}

// ResponseType
export interface ResponseType {
    isUserExist?: boolean;
    isValid?: boolean;
    isSuccess?: boolean;
    message?: string;
    userId?: number;
    fullName?: string;
    email?: string;
    role?: string;
    users?: Array<User>;
    controllers?: Array<Controller>;
    scripts?: Array<Script>;
    rooms?: Array<Room>;
    lights?: Array<Light>;
    user?: User | null;
    roomList?: Array<RoomInterface>;
}

// UserType
export interface UserType {
    userId?: number;
    fullName?: string;
    email?: string;
    password?: string;
    role?: string;
    mcuId?: number;
    info?: object;
    createAt?: string;
    updateAt?: string;
}

// UserInfo
export interface UserInfo {
    userId?: number;
    fullName?: string;
    email?: string;
    role?: string;
    mcuId: number;
}

// ControllerType
export interface ControllerType {
    mcuId?: number;
    code?: string;
    type?: string;
}

export interface StatusLight {
    lightId?: number;
    status?: boolean;
}

// ScriptType
export interface ScriptType {
    scriptId?: number;
    name?: string;
    userId?: number;
    timeOn?: string;
    timeOff?: string;
}

//
interface CustomerType {
    cookies?: object;
}

export type RequestType = IncomingMessage & CustomerType;

// RoomType
export interface RoomType {
    roomId?: number;
    name?: string;
    mcuId?: number;
}

// LightType
export interface LightType {
    lightId?: number;
    name?: string;
    mcuId?: number;
    roomId?: number;
}

// ControllerInterface
export interface ControllerInterface {
    status?: boolean;
    mcuId?: number;
    code?: string;
    rooms?: Array<RoomInterface>;
}

// ControlerListType
export interface ControllerListType {
    controllerList?: Array<ControllerInterface>;
}

export interface CaseInterface {
    lightId: number;
    status: boolean;
}
export interface ScriptInterface {
    scriptId: number;
    name: string;
    cases: CaseInterface[];
}
