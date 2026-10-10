# 58. Следующий этап разработки

После завершения оставшихся бизнес-решений проект должен проходить следующие этапы:

```text
PRODUCT SPECIFICATION
        ↓
Business Rules
        ↓
Domain Model
        ↓
Scheduling Algorithm
        ↓
Architecture
        ↓
Database Design
        ↓
API Contracts
        ↓
Frontend Architecture
        ↓
Implementation Tasks
        ↓
Backend / Frontend implementation
        ↓
Testing
        ↓
Integration
        ↓
Security review
        ↓
Release
```

Coding-agent не должен самостоятельно менять бизнес-правила продукта без согласования с владельцем проекта.

Если реализация требует решения, которого нет в спецификации, агент должен остановиться и запросить решение, а не самостоятельно выбирать бизнес-правило.

## Дополнительные решения из процесса разработки

### Роли

- Пользователь/owner — business rules и architecture decisions.
- Architect/planning agent — варианты архитектуры и decomposition после approval.
- Backend agent — Java/Spring implementation.
- Frontend agent — React implementation.
- Reviewer agent — проверка только новых изменений и соответствия spec.

### Git

Каждая задача — отдельная ветка.
Только owner может merge в `main`.

### Правило ambiguity

Если код требует решения, которого нет в документации:

```text
STOP
→ сформулировать OPEN QUESTION
→ получить решение owner
→ обновить docs
→ продолжить
```

Агент не должен выдумывать business rule.

### Где использовать разговорный AI

Высокоуровневую продуктовую и бизнес-логику удобно сначала обсуждать в отдельном AI-диалоге. После утверждения решений Architect agent переводит их в architecture/tasks. Coding agents реализуют уже approved tasks.

## OPEN QUESTIONS

- Где хранить общие agent rules: один `AGENTS.md` или несколько.
- Кто автоматически обновляет spec после решения вопроса.
- Какие CI checks обязательны.
- Нужен ли reviewer как required check.

## IDEAS

- `AGENT_CONTEXT.md` с таблицей «тип задачи → какие документы читать».
- Rule: agent пишет `Assumptions`, но business-impacting assumption оформляет как `OPEN QUESTION`.
- Reviewer получает diff относительно base branch.
- Для Scheduling Engine держать отдельный набор golden scenarios.
