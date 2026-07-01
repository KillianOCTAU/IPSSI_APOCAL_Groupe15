"""

OllamaLLMClient — request call to local service.
Everything runs locally, so there is no need to worry about token limits, context size, or pricing.

"""

import requests
from django.conf import settings

from .base import LLMClient, LLMError
from .quiz_prompt import build_messages, generate_quiz_with_retry


class OllamaLLMClient(LLMClient):
    """Client HTTP minimal pour Ollama (/api/generate)."""

    def __init__(
        self, *, model: str | None = None, host: str | None = None, timeout: int | None = None
    ) -> None:
        # Eventual Overrides (config admin en base, Lot 8) otherwise valeur with .env.
        self.host = (host or settings.OLLAMA_HOST).rstrip("/")
        self.model = model or settings.OLLAMA_MODEL

        # Dealing with latence time
        self.timeout = timeout or settings.OLLAMA_TIMEOUT

    def generate_quiz(self, source_text: str, title: str) -> list[dict]:
        messages = build_messages(source_text, title)
        return generate_quiz_with_retry(lambda _attempt: self._call_ollama_chat(messages))

    def _call_ollama_chat(self, messages: list[dict]) -> str:
        try:
            response = requests.post(
                f"{self.host}/api/chat",
                json={
                    "model": self.model,
                    "messages": messages,
                    "stream": False,
                    "options": {"temperature": 0.4},
                    "format": "json",
                },
                timeout=self.timeout,
            )
            response.raise_for_status()
        except requests.RequestException as exc:
            raise LLMError(f"Ollama injoignable : {exc}") from exc

        data = response.json()
        raw = data.get("message", {}).get("content", "")
        if not raw:
            raise LLMError("Ollama a renvoyé une réponse vide.")
        return raw
