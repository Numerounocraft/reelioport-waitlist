const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdUBSBT6LEQWtApCaJTMuPoTmAlMKgb01_uZJEtmQweHU9VHA/formResponse";

const GOOGLE_FORM_ENTRIES = {
  name: "entry.2025925963",
  email: "entry.927112235",
} as const;

/**
 * Submits to the "Reelioport Waitlist" Google Form's response endpoint.
 *
 * Uses a hidden iframe + real <form> POST (not fetch). Google's
 * formResponse endpoint actively rejects cross-origin fetch/XHR submissions
 * from third-party sites — confirmed via testing, it returns 503 for a
 * fetch(..., {mode: "no-cors"}) POST from this app's origin, but 200 for the
 * exact same fields sent as a genuine <form> POST navigation (which is what
 * happens when a real Google Form is embedded/submitted anywhere). So this
 * builds a throwaway form targeting a hidden iframe, submits it, and cleans
 * both up shortly after — there's no response to read either way (cross-
 * origin navigation into an iframe is opaque to us), so callers should just
 * proceed optimistically once this returns.
 */
export function submitToWaitlistForm(fields: { name?: string; email: string }) {
  if (typeof document === "undefined") return;

  const targetName = `waitlist-form-target-${Date.now()}`;
  const iframe = document.createElement("iframe");
  iframe.name = targetName;
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.action = GOOGLE_FORM_ACTION;
  form.method = "POST";
  form.target = targetName;
  form.style.display = "none";

  const appendField = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };
  if (fields.name) appendField(GOOGLE_FORM_ENTRIES.name, fields.name);
  appendField(GOOGLE_FORM_ENTRIES.email, fields.email);

  document.body.appendChild(form);
  form.submit();

  window.setTimeout(() => {
    form.remove();
    iframe.remove();
  }, 2000);
}
