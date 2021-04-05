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
    SERVER_SEND_ACK_CONTROLLER_CONNECT: "server-send-ack-controller-connect",
};

// Client event
export const ClientEvent = {
    CLIENT_SEND_MESSAGE: "client-send-message",
};

export const ControllerEvent = {
    CONTROLLER_CONNECT: "controller-connect",
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
