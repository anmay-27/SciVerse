/** Shared browser utilities for every SciVerse page. */
(function () {
  "use strict";

  const THEME_KEY = "sciverse:theme";
  const PROGRESS_PREFIX = "sciverse:progress:";
  const validThemes = new Set(["light", "dark"]);
  const root = document.documentElement;

  function safeStorageGet(key) {
    try { return window.localStorage.getItem(key); }
    catch (error) { console.warn("SciVerse could not read local storage.", error); return null; }
  }

  function safeStorageSet(key, value) {
    try { window.localStorage.setItem(key, value); return true; }
    catch (error) { console.warn("SciVerse could not save to local storage.", error); return false; }
  }

  function safeStorageRemove(key) {
    try { window.localStorage.removeItem(key); return true; }
    catch (error) { console.warn("SciVerse could not clear local storage.", error); return false; }
  }

  function systemTheme() {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateThemeControls(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.dataset.currentTheme = theme;
    });
  }

  function applyTheme(theme, persist = false) {
    const resolvedTheme = validThemes.has(theme) ? theme : systemTheme();
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    updateThemeControls(resolvedTheme);
    if (persist) safeStorageSet(THEME_KEY, resolvedTheme);
    document.dispatchEvent(new CustomEvent("sciverse:themechange", { detail: { theme: resolvedTheme } }));
    return resolvedTheme;
  }

  function getTheme() { return root.dataset.theme || systemTheme(); }
  function toggleTheme() { return applyTheme(getTheme() === "dark" ? "light" : "dark", true); }

  function initializeTheme() {
    const savedTheme = safeStorageGet(THEME_KEY);
    applyTheme(validThemes.has(savedTheme) ? savedTheme : systemTheme());
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => updateThemeControls(getTheme()), { once: true });
    }
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-theme-toggle]")) toggleTheme();
    });
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    mediaQuery?.addEventListener?.("change", (event) => {
      if (!validThemes.has(safeStorageGet(THEME_KEY))) applyTheme(event.matches ? "dark" : "light");
    });
  }

  function stopSpeaking() {
    if (!("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    return true;
  }

  function speakText(text) {
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance === "undefined") {
      console.warn("Text-to-speech is not supported by this browser.");
      return false;
    }
    const narration = String(text ?? "").trim();
    if (!narration) return false;
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = document.documentElement.lang || navigator.language || "en-US";
    window.speechSynthesis.speak(utterance);
    return true;
  }

  function validProgressKey(key) { return typeof key === "string" && key.trim().length > 0; }

  function saveProgress(key, value) {
    if (!validProgressKey(key)) { console.warn("Progress keys must be non-empty strings."); return false; }
    try {
      const serializedValue = JSON.stringify(value);
      return safeStorageSet(PROGRESS_PREFIX + key.trim(), serializedValue ?? "null");
    }
    catch (error) { console.warn("Progress value could not be serialized.", error); return false; }
  }

  function getProgress(key) {
    if (!validProgressKey(key)) return null;
    const storedValue = safeStorageGet(PROGRESS_PREFIX + key.trim());
    if (storedValue === null) return null;
    try { return JSON.parse(storedValue); }
    catch (error) { console.warn("Stored progress is invalid.", error); return null; }
  }

  function clearProgress(key) {
    if (!validProgressKey(key)) return false;
    return safeStorageRemove(PROGRESS_PREFIX + key.trim());
  }

  function initializeLessonTools() {
    document.addEventListener("click", (event) => {
      const narrationButton = event.target.closest?.("[data-narration]");
      if (narrationButton) speakText(narrationButton.dataset.narration);
    });

    document.querySelectorAll("[data-quiz]").forEach((quiz) => {
      quiz.addEventListener("change", (event) => {
        const answer = event.target.closest?.("input[type='radio']");
        if (!answer) return;
        const question = answer.closest(".quiz-question");
        const feedback = question?.querySelector(".quiz-feedback");
        question?.querySelectorAll(".quiz-option").forEach((option) => option.classList.remove("is-correct", "is-wrong"));
        const selectedLabel = answer.closest(".quiz-option");
        const isCorrect = answer.value === question?.dataset.answer;
        selectedLabel?.classList.add(isCorrect ? "is-correct" : "is-wrong");
        if (feedback) {
          feedback.textContent = isCorrect ? "Correct — well reasoned." : `Not quite. ${question.dataset.explanation || "Try another answer."}`;
          feedback.className = `quiz-feedback ${isCorrect ? "is-success" : "is-error"}`;
        }
      });
    });
  }

  window.SciVerse = Object.freeze({ applyTheme, getTheme, toggleTheme, speakText, stopSpeaking, saveProgress, getProgress, clearProgress });
  // Named globals keep calls simple on future lesson pages.
  window.speakText = speakText;
  window.stopSpeaking = stopSpeaking;
  window.saveProgress = saveProgress;
  window.getProgress = getProgress;
  window.clearProgress = clearProgress;

  initializeTheme();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeLessonTools, { once: true });
  else initializeLessonTools();
})();
