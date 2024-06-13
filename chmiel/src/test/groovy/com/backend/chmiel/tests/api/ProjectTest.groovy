package com.backend.chmiel.tests.api


import com.backend.chmiel.dao.ProjectRepository
import com.backend.chmiel.dao.UserRepository
import com.backend.chmiel.entity.Project
import com.backend.chmiel.entity.User
import org.springframework.boot.test.context.SpringBootContextLoader
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification
import org.springframework.beans.factory.annotation.Autowired

//@WebAppConfiguration
@ContextConfiguration(loader = SpringBootContextLoader.class,classes = [])
@SpringBootTest("0") // use random port for testing
class ProjectTest extends Specification {


    @Autowired
    private ProjectRepository projectRepository
    @Autowired
    private UserRepository userRepository

    def "create a new project"() {
        given:
            Project project = new Project(projectName: "Test Book", projectOwner: 1)
            User user = new User(firstName: 'test', lastName: 'test', email: 'a@a.com', password: 'test')
            userRepository.save(user)
            project.setProjectOwner(user.id)

        when:
            projectRepository.save(project)

        then:
            project.id!= null

        cleanup:
            projectRepository.delete(project)
            userRepository.delete(user)
    }

    def "test find all projects"() {
        given:

            Integer projectsCount = projectRepository.findAll().size()

        when:
            Project project1 = new Project(projectName: "Test Project")
            Project project2 = new Project(projectName: "Test Project")
            projectRepository.save(project1)
            projectRepository.save(project2)
            List<Project> projects = projectRepository.findAll()

        then:
            projects.size()  == projectsCount + 2
            projects.stream().anyMatch {o -> project1.getId() == o.getId()}
            projects.stream().anyMatch {o -> project2.getId() == o.getId()}
        cleanup:
            projectRepository.delete(project1)
            projectRepository.delete(project2)
    }

    def "test find project by id"() {
        given:
            Project project = new Project(projectName: "Test Project")
            projectRepository.save(project)

        when:
            Optional<Project> optionalProject = projectRepository.findById(project.id)

        then:
            optionalProject.isPresent()
            optionalProject.get().projectName == "Test Project"
        cleanup:
            projectRepository.delete(project)
    }

    def "test update project"() {
        given:
            Project project = new Project(projectName: "Test Project")
            projectRepository.save(project)

        when:
            project.projectName = "Updated Name"
            projectRepository.save(project)

        then:
            projectRepository.findById(project.id).get().projectName == "Updated Name"
        cleanup:
            projectRepository.delete(project)
    }

    def "test delete project"() {
        given:
         Project project = new Project(projectName: "Test Project")
           projectRepository.save(project)

        when:
           projectRepository.deleteById(project.id)

        then:
           !projectRepository.findById(project.id).isPresent()
    }
}