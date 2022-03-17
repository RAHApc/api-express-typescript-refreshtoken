import { v4 as uuidV4 } from "uuid";

export const hashFromUUID = (): string => {
    return uuidV4();
}