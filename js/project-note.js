function fieldValue(form, name) {
  return String(new FormData(form).get(name) || "").trim();
}

function buildNote(form) {
  const category = fieldValue(form, "category");
  const details = fieldValue(form, "details");
  if (!category || !details) return null;

  const lines = [
    "WOODLAND GRAIN PROJECT NOTE",
    "",
    `Name: ${fieldValue(form, "name") || "Not added"}`,
    `Reply to: ${fieldValue(form, "email") || "Not added"}`,
    `Project direction: ${category}`,
    "",
    "What I am trying to make:",
    details,
    "",
    `Size / quantity: ${fieldValue(form, "scale") || "Not sure yet"}`,
    `Material thoughts: ${fieldValue(form, "material") || "Open to suggestions"}`,
    `Timing: ${fieldValue(form, "timing") || "Flexible / not added"}`,
    `Budget notes: ${fieldValue(form, "budget") || "Not added"}`,
  ];

  return lines.join("\n");
}

async function copyNote(note) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(note);
    return;
  }
  const text = document.createElement("textarea");
  text.value = note;
  text.setAttribute("readonly", "");
  text.style.position = "fixed";
  text.style.opacity = "0";
  document.body.append(text);
  text.select();
  document.execCommand("copy");
  text.remove();
}

export function initProjectNote() {
  const form = document.querySelector("[data-project-note]");
  if (!form) return;

  const status = form.querySelector("[data-note-status]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = buildNote(form);

    if (!note) {
      status.textContent =
        "Add a project direction and a short description first.";
      status.dataset.state = "error";
      form
        .querySelector("[name='category']:invalid, [name='details']:invalid")
        ?.focus();
      return;
    }

    try {
      await copyNote(note);
      status.textContent =
        "Copied. Paste this note wherever you want to keep or send it.";
      status.dataset.state = "success";
    } catch {
      status.textContent =
        "Clipboard access was blocked. Select the preview below and copy it manually.";
      status.dataset.state = "error";
      const preview = form.querySelector("[data-note-preview]");
      preview.value = note;
      preview.hidden = false;
      preview.focus();
      preview.select();
    }
  });

  form.addEventListener("reset", () => {
    status.textContent = "Nothing is sent or stored by this page.";
    status.dataset.state = "idle";
    const preview = form.querySelector("[data-note-preview]");
    preview.hidden = true;
    preview.value = "";
  });
}
