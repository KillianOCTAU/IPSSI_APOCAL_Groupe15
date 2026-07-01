import csv
import io
import json
import zipfile
from datetime import datetime, timezone

from django.contrib.auth.models import User

from quizzes.models import Quiz

from .models import get_or_create_profile


def build_export_bundle(user: User) -> dict:
    profile = get_or_create_profile(user)
    quizzes = Quiz.objects.filter(user=user).prefetch_related("questions")

    return {
        "meta": {
            "export_version": "1.0",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "legal_basis": "RGPD Art. 15 — droit d'accès",
            "user_id": user.pk,
        },
        "account": {
            "id": user.pk,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "date_joined": user.date_joined.isoformat() if user.date_joined else None,
            "email_verified": profile.email_verified,
        },
        "uploaded_texts": [
            {
                "id": quiz.pk,
                "title": quiz.title,
                "source_text": quiz.source_text,
                "uploaded_at": quiz.created_at.isoformat(),
            }
            for quiz in quizzes
        ],
        "quizzes": [
            {
                "id": quiz.pk,
                "title": quiz.title,
                "score": quiz.score,
                "created_at": quiz.created_at.isoformat(),
                "questions": [
                    {
                        "index": q.index,
                        "prompt": q.prompt,
                        "options": q.options,
                        "correct_index": q.correct_index,
                        "selected_index": q.selected_index,
                    }
                    for q in quiz.questions.all()
                ],
            }
            for quiz in quizzes
        ],
        "reports": [],
        "logs": [],
    }


def build_reponses_csv(bundle: dict) -> str:
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(
        [
            "quiz_id",
            "quiz_title",
            "quiz_score",
            "question_index",
            "prompt",
            "option_a",
            "option_b",
            "option_c",
            "option_d",
            "correct_index",
            "selected_index",
            "answered_correctly",
        ]
    )

    for quiz in bundle["quizzes"]:
        for question in quiz["questions"]:
            options = list(question.get("options") or [])
            while len(options) < 4:
                options.append("")
            selected = question.get("selected_index")
            correct = question.get("correct_index")
            answered_correctly = ""
            if selected is not None and correct is not None:
                answered_correctly = selected == correct

            writer.writerow(
                [
                    quiz["id"],
                    quiz["title"],
                    quiz["score"],
                    question["index"],
                    question["prompt"],
                    options[0],
                    options[1],
                    options[2],
                    options[3],
                    correct,
                    selected if selected is not None else "",
                    answered_correctly,
                ]
            )

    return output.getvalue()


def build_audit_payload(audit_entry) -> dict:
    return {
        "user_id": audit_entry.user_id,
        "user_email": audit_entry.user_email,
        "request_type": audit_entry.request_type,
        "status": audit_entry.status,
        "requested_at": audit_entry.requested_at.isoformat(),
        "responded_at": (
            audit_entry.responded_at.isoformat() if audit_entry.responded_at else None
        ),
        "export_hash": audit_entry.export_hash,
        "legal_basis": "RGPD Art. 15 — droit d'accès",
    }


def build_export_zip(bundle: dict, audit_payload: dict) -> bytes:
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as archive:
        archive.writestr(
            "quiz.json",
            json.dumps(bundle, indent=2, ensure_ascii=False),
        )
        archive.writestr("reponses.csv", build_reponses_csv(bundle))
        archive.writestr(
            "audit.json",
            json.dumps(audit_payload, indent=2, ensure_ascii=False),
        )
    return buffer.getvalue()


def get_client_ip(request) -> str | None:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")
