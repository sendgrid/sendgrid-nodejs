declare namespace SendGrid.Helpers.Error {
    export interface SendGridError extends Error {

    }
}

declare namespace SendGrid.Helpers.Mail {
    export interface Helper {
        Email: typeof Email;
        Mail: typeof Mail;
        Personalization: typeof Personalization;
        Content: typeof Content;
        Header: typeof Header;
        Substitution: typeof Substitution;
        CustomArgs: typeof CustomArgs;
        Attachment: typeof Attachment;
        Section: typeof Section;
        Category: typeof Category;
        Asm: typeof Asm;
        Bcc: typeof Bcc;
        BypassListManagement: typeof BypassListManagement;
        Footer: typeof Footer;
        SandBoxMode: typeof SandBoxMode;
        SpamCheck: typeof SpamCheck;
        MailSettings: typeof MailSettings;
        ClickTracking: typeof ClickTracking;
        OpenTracking: typeof OpenTracking;
        SubscriptionTracking: typeof SubscriptionTracking;
        Ganalytics: typeof Ganalytics;
        TrackingSettings: typeof TrackingSettings;
    }

    export class Mail {
        constructor();
        constructor(from: Email, subject: string, to: Email, content: Content);

        getFrom(): Email;
        setFrom(email: Email): void;

        addPersonalization(personalization: Personalization): void;
        getPersonalizations(): Personalization[];

        setSubject(subject: string): void;
        getSubject(): string;

        addContent(content: Content): void;
        getContents(): Content[];

        addAttachment(attachment: Attachment): void;
        getAttachments(): Attachment[];

        setTemplateId(templateId: string): void;
        getTemplateId(): string;

        addSection(section: Section): void;
        getSections(): Section[];

        addHeader(header: Header): void;
        getHeaders(): Header[];

        addCategory(category: Category): void;
        getCategories(): Category[];

        addCustomArg(customArg: CustomArgs): void;
        getCustomArgs(): CustomArgs[];

        setSendAt(sendAt: number): void;
        getSendAt(): number;

        setBatchId(batch_id: string): void;
        getBatchId(): string;

        setAsm(asm: Asm): void;
        getAsm(): Asm;

        setIpPoolName(name: string): void;
        getIpPoolName(): string;

        addMailSettings(settings: MailSettings): void;
        getMailSettings(): MailSettings;

        addTrackingSettings(settings: TrackingSettings): void;
        getTrackingSettings(): TrackingSettings;

        setReplyTo(email: Email): void;
        getReplyTo(): Email;

        toJSON(): {
            from: any;
            personalizations: any[];
            subject: string;
            content: string;
            attachments: any[];
            template_id: string;
            sections: any[];
            headers: any[];
            categories: any[];
            custom_args: any[];
            send_at: number;
            batch_id: string;
            asm: any;
            ip_pool_name: string;
            mail_settings: any;
            tracking_settings: any;
            reply_to: any;
        };
    }

    export class Email {
        constructor(address: string, name?: string);

        name: string;
        email: string;
    }

    export class Content {
        constructor(mimetype: string, text: string);

        type: string;
        value: string;
    }

    export interface SendGrid {
        (apiKey: string): SendGrid;
    }

    export class ClickTracking {
        constructor(enable: boolean, enableText: boolean);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getEnableText(): boolean;
        setEnableText(enableText: boolean): void;

        toJSON(): {
            enable: boolean;
            enable_text: boolean;
        };
    }

    export class OpenTracking {
        constructor(enable: boolean, subscriptionTag: string);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getSubscriptionTag(): string;
        setSubscriptionTag(subscriptionTag: string): void;

        toJSON(): {
            enable: boolean;
            substitution_tag: string;
        };
    }

    export class SubscriptionTracking {
        constructor(enable: boolean, text: string, html: string, substitution_tag: string);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getText(): string;
        setText(text: string): void;

        getHtml(): string;
        setHtml(html: string): void;

        getSubstitutionTag(): string;
        setSubstitutionTag(substitutionTag: string): void;

        toJSON(): {
            enable: boolean;
            text: string;
            html: string;
            substitution_tag: string;
        };
    }

    export class Ganalytics {
        constructor(enable: boolean, utm_source: string, utm_medium: string, utm_term: string, utm_content: string, utm_campaign: string);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getUtmSource(): string;
        setUtmSource(source: string): void;

        getUrmMedium(): string;
        setUrmMedium(medium: string): void;

        getUrmTerm(): string;
        setUrmTerm(term: string): void;

        getContent(): string;
        setContent(content: string): void;

        getUtmCampaign(): string;
        setUtmCampaign(campaign: string): void;

        toJSON(): {
            enable: boolean;
            utm_source: string;
            utm_medium: string;
            utm_term: string;
            utm_content: string;
            utm_campaign: string;
        };
    }

    export class TrackingSettings {
        getClickTracking(): ClickTracking;
        setClickTracking(value: ClickTracking): void;

        getOpenTracking(): OpenTracking;
        setOpenTracking(value: OpenTracking): void;

        getSubscriptionTracking(): SubscriptionTracking;
        setSubscriptionTracking(value: SubscriptionTracking): void;

        getGanalytics(): Ganalytics;
        setGanalytics(value: Ganalytics): void;

        toJSON(): {
            click_tracking: any;
            open_tracking: any;
            subscription_tracking: any;
            ganalytics: any;
        };
    }

    export class Bcc {
        constructor(enable: boolean, email: string);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getEmail(): Email;
        setEmail(value: Email): void;

        toJSON(): {
            enable: boolean;
            email: any;
        };
    }

    export class BypassListManagement {
        constructor(enable: boolean);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        toJSON(): {
            enable: boolean;
        };
    }

    export class Footer {
        constructor(enable: boolean, text: string, html: string);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getText(): string;
        setText(text: string): void;

        getHtml(): string;
        setHtml(html: string): void;

        toJSON(): {
            enable: boolean;
            text: string;
            html: string;
        };
    }

    export class SandBoxMode {
        constructor(enable: boolean);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        toJSON(): {
            enable: boolean;
        };
    }

    export class SpamCheck {
        constructor(enable: boolean, threshold: number, post_to_url: string);

        getEnable(): boolean;
        setEnable(enabled: boolean): void;

        getThreshold(): number;
        setThreshold(threshold: number): void;

        getPosttoUrl(): string;
        setPosttoUrl(post_to_url: string): void;

        toJSON(): {
            enable: boolean;
            threshold: number;
            post_to_url: string;
        };
    }

    export class MailSettings {
        getBcc(): Bcc;
        setBcc(bcc: Bcc): void;

        getBypassListManagement(): BypassListManagement;
        setBypassListManagement(bypassListManagement: BypassListManagement): void;

        getFooter(): Footer;
        setFooter(footer: Footer): void;

        getSandBoxMode(): SandBoxMode;
        setSandBoxMode(sandBoxMode: SandBoxMode): void;

        getSpamCheck(): SpamCheck;
        setSpamCheck(spamCheck: SpamCheck): void;

        toJSON(): {
            bcc: any;
            bypass_list_management: any;
            footer: any;
            sandbox_mode: any;
            spam_check: any;
        };
    }

    export class Attachment {
        getContent(): string;
        setContent(content: string): void;

        getType(): string;
        setType(type: string): void;

        getFilename(): string;
        setFilename(filename: string): void;

        getDisposition(): string;
        setDisposition(disposition: string): void;

        getContentId(): string;
        setContentId(contentId: string): void;

        toJSON(): {
            content: string;
            type: string;
            filename: string;
            disposition: string;
            content_id: string;
        };
    }

    export class Asm {
        constructor(group_id: number, groups_to_display: number[]);

        group_id: number;
        groups_to_display: number[];
    }

    export class Category {
        constructor(name: string);

        category: string;
    }

    export class CustomArgs {
        constructor(key: string, value: string);

        key: string;
        value: string;
    }

    export class Substitution {
        constructor(key: string, value: string);

        key: string;
        value: string;
    }

    export class Section {
        constructor(key: string, value: string);

        key: string;
        value: string;
    }

    export class Header {
        constructor(key: string, value: string);

        key: string;
        value: string;
    }

    export class Personalization {
        addTo(email: Email): void;
        getTos(): Email[];

        addCc(email: Email): void;
        getCcs(): Email[];

        addBcc(email: Email): void;
        getBccs(): Email[];

        getSubject(): string;
        setSubject(subject: string): void;

        addHeader(header: Header): void;
        getHeaders(): Header[];

        addSubstitution(substitution: Substitution): void;
        getSubstitutions(): {[key: string]: string};

        addCustomArg(substitution: CustomArgs): void;
        getCustomArgs(): CustomArgs[];

        setSendAt(sendAt: number): void;
        getSendAt(): number;

        toJSON(): {
            to: any;
            cc: any;
            bcc: any;
            subject: string;
            headers: any;
            substitutions: any;
            custom_args: any;
            send_at: number;
        };
    }
}

declare namespace SendGrid.Rest {
    export const emptyRequest: Request;

    interface Request {
        host?: string;
        method: "GET" | "PATCH" | "POST" | "PUT" | "DELETE";
        path: string;
        headers?: {
            [header: string]: string|number;
        };
        body?: string | {};
        queryParams?: {
            [param: string]: string;
        };
        test?: boolean;
        port?: string|number;
    }

    interface Response {
        statusCode: number;
        body: string;
        headers: string;
    }
}

declare namespace SendGrid {
    export interface SendGridConstructor {
        (apiKey: string, host?: string, globalHeaders?: { [header: string]: string; }): SendGrid;
        constructor(apiKey: string, host?: string, globalHeaders?: { [header: string]: string; }): SendGrid;

        mail: SendGrid.Helpers.Mail.Helper;
    }

    export class SendGrid {
        constructor(apiKey: string, host?: string, globalHeaders?: { [header: string]: string; });

        emptyRequest(data?: SendGrid.Rest.Request): SendGrid.Rest.Request;

        API(request: SendGrid.Rest.Request, callback: (err: SendGrid.Helpers.Error.SendGridError, response: SendGrid.Rest.Response) => void): void;
        API(request: SendGrid.Rest.Request): Promise<SendGrid.Rest.Response>;
    }
}

declare const sendGrid: SendGrid.SendGridConstructor;
export = sendGrid;
