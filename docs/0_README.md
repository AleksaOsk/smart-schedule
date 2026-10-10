# SmartSchedule — documentation index

Эта папка разбивает исходный монолитный Product Specification на небольшие документы.

- `00_PRODUCT_SPECIFICATION.md` — master-документ.
- `01_PRODUCT_AND_FLOWS.md` — продукт и пользовательские сценарии.
- `02_FRONTEND.md` — UI/UX.
- `03_AUTH_PROFILE_ACCOUNT.md` — auth/profile/admin/account.
- `04_TASKS_RECURRENCE.md` — задачи и recurrence.
- `05_WORK_SCHEDULE.md` — рабочий календарь и DAY/NIGHT.
- `06_SCHEDULING_RULES.md` — Scheduling Engine.
- `07_GENERATION_CONFLICTS.md` — state machine и конфликты.
- `08_DOMAIN_MODEL.md` — domain model.
- `09_API_BACKEND.md` — Backend/API.
- `10_STORAGE_EMAIL_SECURITY.md` — storage/email/security.
- `11_TESTING.md` — тесты.
- `12_AI_AGENT_WORKFLOW.md` — процесс работы AI coding agents.

Каждый логический документ содержит секции `OPEN QUESTIONS` и `IDEAS`.

`FIXED` = принятое решение.
`OPEN QUESTION` = решение не принято.
`IDEAS` = предложение, которое не становится требованием без approval.

Источник: исходный `00_PRODUCT_SPECIFICATION.md` + последующие уточнения по проекту.


## OPEN QUESTIONS

- Нужно ли считать `0_README` частью обязательного agent context или только навигацией?
- Нужна ли отдельная папка `archive/` для старых версий спецификации?

## IDEAS

- Добавить `CHANGELOG.md`, чтобы было видно, какие business rules были изменены между версиями.
- Нумеровать версии Product Specification (`v0.1`, `v0.2`, ...) после крупных решений.
