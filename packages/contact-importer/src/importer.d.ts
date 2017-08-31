declare interface ContactImporterOptions {
    batchSize?: number;
    rateLimitLimit?: number;
    rateLimitPeriod?: number;
}

declare interface Contact {
    email: string;
    first_name?: string;
    last_name?: string;
    age?: number;
}

declare class ContactImporter {
    constructor(sg, options?: ContactImporterOptions);

    push(data: Contact|Contact[])

    on(event: "success", cb: (result: any, batch: Contact[]) => void): void;
    on(event: "error", cb: (err: Error, batch?: Contact[]) => void): void;
    on(event: "drain", cb: () => void): void;
    on(event: string, cb: (data: any) => void): void;

    once(event: "success", cb: (result: any, batch: Contact[]) => void): void;
    once(event: "error", cb: (err: Error, batch?: Contact[]) => void): void;
    once(event: "drain", cb: () => void): void;
    once(event: string, cb: (data: any) => void): void;
}

export = ContactImporter;