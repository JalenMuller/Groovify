interface StatusMessageInterface {
    type: null | "error" | "success" | "deletion" | "info";
    message: null | string;
}
export type { StatusMessageInterface };
