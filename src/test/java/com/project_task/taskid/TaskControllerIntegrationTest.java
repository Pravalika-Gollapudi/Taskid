package com.project_task.taskid;

import java.time.LocalDate;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.project_task.taskid.entity.Task;
import com.project_task.taskid.repository.TaskRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    public void setup() {
        taskRepository.deleteAll();
    }

    @Test
    public void testGetAllTasks() throws Exception {
        Task task1 = new Task();
        task1.setTitle("Task 1");
        task1.setDescription("Description 1");
        task1.setStatus("TO DO");
        task1.setDueDate(LocalDate.of(2023, 8, 1));
        task1.setPriority("HIGH");

        Task task2 = new Task();
        task2.setTitle("Task 2");
        task2.setDescription("Description 2");
        task2.setStatus("IN PROGRESS");
        task2.setDueDate(LocalDate.of(2023, 8, 15));
        task2.setPriority("MEDIUM");

        taskRepository.saveAll(Arrays.asList(task1, task2));

        mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is("Task 1")))
                .andExpect(jsonPath("$[1].title", is("Task 2")));
    }

    @Test
    public void testCreateTask() throws Exception {
        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Task 1\", \"description\": \"Description 1\", \"status\": \"TO DO\", \"dueDate\": \"2023-08-01\", \"priority\": \"HIGH\"}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.title", is("Task 1")));
    }

    @Test
    public void testGetTaskById() throws Exception {
        Task task = new Task();
        task.setTitle("Task 1");
        task.setDescription("Description 1");
        task.setStatus("TO DO");
        task.setDueDate(LocalDate.of(2023, 8, 1));
        task.setPriority("HIGH");

        Task savedTask = taskRepository.save(task);

        mockMvc.perform(get("/tasks/" + savedTask.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.title", is("Task 1")));
    }

    @Test
    public void testUpdateTask() throws Exception {
        Task task = new Task();
        task.setTitle("Task 1");
        task.setDescription("Description 1");
        task.setStatus("TO DO");
        task.setDueDate(LocalDate.of(2023, 8, 1));
        task.setPriority("HIGH");

        Task savedTask = taskRepository.save(task);

        mockMvc.perform(put("/tasks/" + savedTask.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Updated Task 1\", \"description\": \"Updated Description 1\", \"status\": \"IN PROGRESS\", \"dueDate\": \"2023-08-15\", \"priority\": \"MEDIUM\"}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.title", is("Updated Task 1")));
    }

    @Test
    public void testDeleteTask() throws Exception {
        Task task = new Task();
        task.setTitle("Task 1");
        task.setDescription("Description 1");
        task.setStatus("TO DO");
        task.setDueDate(LocalDate.of(2023, 8, 1));
        task.setPriority("HIGH");

        Task savedTask = taskRepository.save(task);

        mockMvc.perform(delete("/tasks/" + savedTask.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/tasks/" + savedTask.getId()))
                .andExpect(status().isNotFound());
    }
}
