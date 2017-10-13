import * as helpers from "@naturalcycles/sendgrid-helpers";
new helpers.classes.Attachment({
    content: "",
    filename: "test.txt",
    type: "text/plain"
});

new helpers.classes.EmailAddress("someone@example.org");
new helpers.classes.EmailAddress({ name: "Some One", email: "someone@example.org" });

new helpers.classes.Personalization({
    to: "someone@example.org",
    subject: "Hello Some One"
});

new helpers.classes.Mail({
    to: "someone@example.org",
    from: "someone@example.org",
    subject: "Hello Some One",
    text: "This is a test message.",
    html: "<p>This is a test message.</p>"
});