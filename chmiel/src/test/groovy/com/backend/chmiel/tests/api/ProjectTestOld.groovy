//package com.backend.chmiel.tests.api
//
//import com.backend.chmiel.dao.ProjectRepository
//import com.backend.chmiel.dao.UserRepository
//import com.backend.chmiel.dto.Project
//import com.backend.chmiel.dto.User
//import com.backend.chmiel.payload.PostProjectRequest
//import com.backend.chmiel.payload.PutProjectRequest
//import com.backend.chmiel.payload.PutProjectUserRequest
//import com.backend.chmiel.service.ProjectServiceImpl
//import jakarta.persistence.EntityManager
//import jakarta.persistence.EntityNotFoundException
//import spock.lang.Specification
//
//class ProjectTest extends Specification {
//
//    ProjectRepository projectRepository = Mock()
//    UserRepository userRepository = Mock()
//    EntityManager em = Mock()
//
//    ProjectServiceImpl projectService = new ProjectServiceImpl(projectRepository, userRepository)
//
//    def "findAll should return all projects"() {
//        given:
//        def projects = [new Project(id: 1, projectName: "Project 1"), new Project(id: 2, projectName: "Project 2")]
//        projectRepository.findAll() >> projects
//
//        when:
//        def result = projectService.findAll()
//
//        then:
//        result == projects
//        projectRepository.findAll()
//    }
//
//    def "findById should return the project when found"() {
//        given:
//        def project = new Project(id: 1, projectName: "Project 1")
//        projectRepository.findById(1) >> Optional.of(project)
//
//        when:
//        def result = projectService.findById(1)
//
//        then:
//        result == project
//        projectRepository.findById(1)
//    }
//
//    def "findById should throw an exception when not found"() {
//        given:
//        projectRepository.findById(1) >> Optional.empty()
//
//        when:
//        projectService.findById(1)
//
//        then:
//        thrown(EntityNotFoundException)
//    }
//
//    def "removeById should return the number of removed projects"() {
//        given:
//        Project project = new Project(projectName: "Project 1")
//        Project createdProject = projectRepository.save(project)
//
//        when:
//        def result = projectRepository.removeProjectById(createdProject.id)
//
//        then:
//        result == createdProject.id
//    }
//
//    def "createProject should save and return the new project"() {
//        given:
//        def postProjectRequest = new PostProjectRequest(projectOwner: 1, name: "New Project")
//        def user = new User(id: 1)
//        def project = new Project(id: 1, projectName: "New Project", projectOwner: 1, users: [user] as Set)
//        userRepository.findById(1) >> Optional.of(user)
//        projectRepository.save(_) >> { Project p -> p.id = 1; return p }
//
//        when:
//        def result = projectService.createProject(postProjectRequest)
//
//        then:
//        result.id == 1
//        result.projectName == "New Project"
//
//    }
//
//    def "editName should update and return the project"() {
//        given:
//        def putProjectRequest = new PutProjectRequest(id: 1, name: "Updated Project")
//        def project = new Project(id: 1, projectName: "Old Project")
//        projectRepository.findById(1) >> Optional.of(project)
//        projectRepository.save(_) >> { Project p -> p.projectName = "Updated Project"; return p }
//
//        when:
//        def result = projectService.editName(putProjectRequest)
//
//        then:
//        result.projectName == "Updated Project"
//    }
//
//    def "addUser should correctly add user to project"() {
//        given:
//        def putProjectUserRequest = new PutProjectUserRequest(userId: 1, projectID: 1)
//        def user = new User(id: 1)
//        def project = new Project(id: 1, users: [] as Set)
//        userRepository.findById(1) >> Optional.of(user)
//        projectRepository.findById(1) >> Optional.of(project)
//        projectRepository.save(_) >> { Project p -> return p }
//
//        when:
//        def result = projectService.addUser(putProjectUserRequest)
//
//        then:
//        result == "Correctly added user to project"
//    }
//
//    def "addUser should return error message if user or project not found"() {
//        given:
//        def putProjectUserRequest = new PutProjectUserRequest(userId: 1, projectID: 1)
//        userRepository.findById(1) >> Optional.empty()
//        projectRepository.findById(1) >> Optional.empty()
//
//        when:
//        def result = projectService.addUser(putProjectUserRequest)
//
//        then:
//        result == "Either project or user was not found."
//    }
//
//    def "getAllByUserId should return projects for a specific user"() {
//        given:
//        def userId = 1
//        def projects = [new Project(id: 1, projectName: "Project 1"), new Project(id: 2, projectName: "Project 2")]
//        projectRepository.getAllByUserId(userId) >> projects
//
//        when:
//        def result = projectService.getAllByUserId(userId)
//
//        then:
//        result == projects
//        projectRepository.getAllByUserId(userId)
//    }
//}
