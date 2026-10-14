// Opens the site-visit dialog mounted by HomeClientExtras. Pages without the dialog
// fall back to the contact page.
export const OPEN_VISIT = "pinaakini:open-visit";

declare global {
  interface Window {
    __pinaakiniVisit?: boolean;
  }
}

export function openVisit(project?: string) {
  if (!window.__pinaakiniVisit) {
    window.location.href = "/contact";
    return;
  }
  window.dispatchEvent(new CustomEvent(OPEN_VISIT, { detail: { project } }));
}
