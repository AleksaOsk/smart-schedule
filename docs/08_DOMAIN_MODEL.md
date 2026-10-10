# 52. Основные сущности системы

Предварительно предполагаются следующие сущности:

```text
User

Task

WorkSchedule

WorkDay

WorkingInterval

Generation

GeneratedSchedule

ScheduledTask

Conflict

ConflictResolution
```

Дополнительные сущности могут потребоваться после детального проектирования модели генерации.

---

## Расширенная предварительная модель

```text
User
Task

WorkSchedule
WorkDay
WorkingInterval

Generation
GenerationTaskSnapshot

DayPlan
ScheduledTask

Conflict
ConflictResolution

GeneratedSchedule
```

### Важные отношения

```text
User
 ├── Tasks
 ├── WorkSchedule
 ├── Generations
 └── latest GeneratedSchedule

Generation
 ├── input snapshot
 ├── temporary DayPlans
 ├── Conflicts
 └── ScheduledTasks
```

`ScheduledTask.targetDate` — дата, которую дала recurrence.
`ScheduledTask.scheduledDate` — дата, на которую реально поставили задачу.
`placementSource` может быть `AUTOMATIC` или `USER_DECISION`.

## OPEN QUESTIONS

- Какие сущности являются aggregate roots.
- Snapshot как JSON или отдельные таблицы.
- `DayPlan` только in-memory или persistent.
- Как хранить DAY/NIGHT capacity.
- Каким будет timezone.
- Какая стратегия locking.

## IDEAS

- Value objects `Duration`, `DateRange`, `TimeRange`.
- Immutable input snapshot.
- Отдельный `DayPlan` даже если он не станет JPA entity.
