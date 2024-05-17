UPDATE Sprints
SET starting_task_count = (
    SELECT COUNT(id)
    FROM Tasks
    WHERE Tasks.sprint_id = Sprints.id
);


UPDATE Sprints
SET ending_task_count = (
    SELECT COUNT(id)
    FROM Tasks
    WHERE Tasks.sprint_id = Sprints.id
    AND Tasks.status = 'closed'
)
WHERE start_time < current_date;

