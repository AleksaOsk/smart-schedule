# 53. Основные модули Backend

Предварительное разделение:

```text
auth
user
task
schedule
generation
conflict
admin
notification
```

Scheduling Engine желательно изолировать от HTTP/API слоя, чтобы бизнес-логику генерации можно было тестировать независимо от контроллеров.

---

---

# 54. Основные модули Frontend

Предварительно:

```text
auth
profile
tasks
schedule
generation
conflicts
common
```

Frontend отвечает за:

* отображение интерфейса;
* ввод данных;
* валидацию пользовательского ввода;
* получение текущего состояния генерации;
* отображение состояния генерации;
* отображение конфликтов;
* получение решения пользователя;
* отображение готового расписания;
* отображение ошибок.

Основная бизнес-логика формирования расписания находится на Backend.

---

---

# 55. API

API необходимо спроектировать после определения окончательной модели данных.

Предварительные группы endpoints:

```text
/auth
/users
/tasks
/work-schedule
/generations
/conflicts
/schedules
/profile
/admin
```

Примеры концептуальных операций:

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout

GET    /tasks
POST   /tasks
PUT    /tasks/{id}
DELETE /tasks/{id}

GET    /profile
PUT    /profile

GET    /work-schedule
PUT    /work-schedule

POST   /generations
GET    /generations/current
POST   /generations/{id}/resolve-conflict
POST   /generations/{id}/cancel
POST   /generations/{id}/restart

GET    /schedules/latest

DELETE /account

DELETE /admin/users/{id}
```

### Важное требование

Frontend должен иметь возможность запросить текущее состояние активной генерации.

Например:

```text
GET /generations/current
```

Ответ должен позволять frontend понять:

```text
генерации нет
```

или:

```text
GENERATING
```

или:

```text
WAITING_FOR_USER
+
данные текущего конфликта
```

или:

```text
COMPLETED
```

---

## Дополнительные правила API

- Frontend не является источником истины по generation state.
- Backend проверяет ownership всех ресурсов.
- `resolve-conflict` валидирует и task, и выбранную дату/offset.
- Нельзя применить одно решение дважды.
- Активная generation ограничена одним экземпляром на пользователя.

## OPEN QUESTIONS

- Auth endpoints остаются в backend или auth полностью в Supabase?
- Sync или async generation.
- Polling vs SSE/WebSocket.
- Точный request/response conflict.
- Единый error format.
- HTTP statuses для `WAITING_FOR_USER`.
- Concurrency control.

## IDEAS

- Stateful Generation resource.
- Для MVP — polling `GET /generations/current`.
- Application commands `StartGeneration`, `ResolveConflict`, `CancelGeneration`, `RestartGeneration`.
- Idempotency-Key.
